import { Text, ScrollView, View, Image, ActivityIndicator, FlatList } from "react-native";
import { Link } from "expo-router";
import '../globals.css'
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/searchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchmovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";
import { getsavedmovies} from "@/services/appwrite";
import { useUser } from "@/services/AuthContext";
import SavedMovieCard from "@/components/SavedMovieCard";

const saved = () => {
  const user = useUser()
  const {data: savedMovies,refetch,loading:savedLoading, error: savedError} = useFetch(()=>getsavedmovies(user?.current?.$id!))
  useEffect(()=>{
    const fun = async()=>{
      await refetch()
    }
    fun()
  },[user])
  console.log("savedmovies",savedMovies)
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover"/>
      <View className="flex-1 mt-5">
      <FlatList
        data={savedMovies}
        renderItem={({ item }) => (
          <SavedMovieCard {...item} />
        )}
        keyExtractor={(item) => item.movie_id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          paddingRight: 5,
          marginBottom: 10,
        }}
        className="mt-2 px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            {savedLoading ? (
              <>
              <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
            </>
            ):savedError?
            (
            <Text className="text-red-500 px-5 my-3">
              Error: {savedError.message}
            </Text>)
            :
            (
              <Text className="text-xl text-white font-bold mt-5">
                  Saved Movies:
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !savedLoading && !savedError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {
                  user?.current
                  ?" No saved movies !"
                  :"You must login first to save movies !"
                  
                }
              </Text>
            </View>
          ) : null
        }
        >
      </FlatList>
      </View>
    </View>
  )
}

export default saved