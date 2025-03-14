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
import { updateSearchCount } from "@/services/appwrite";

const search = () => {

  const router = useRouter()
  const [query,setquery] = useState('')
  const { data: movies = [], loading,reset,refetch, error: moviesError } = useFetch(() => fetchmovies({ query: query}),false)
  console.log(query)
  useEffect(()=>{
    const timeoutId=setTimeout(async()=>{
      if(query.trim()){
        await refetch()
      }
      else{
        reset()
      }
    },500)
    return ()=>clearTimeout(timeoutId)
  },[query])

  useEffect(() => {
    if (movies?.length! > 0 && movies?.[0]) {
      console.log("Updated movies:", movies);
      updateSearchCount(query, movies[0]); 
    }
  }, [movies]);

//   useEffect(() => {
//     updateSearchCount("Batman", movie);
// }, []);

  const handleSearch = (text: string) => {
    setquery(text);
  };
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover"/>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
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
            <View className="my-5">
              <SearchBar placeholder="search croww" value={query} OnchangeText={(text:string)=>handleSearch(text)}/>
            </View>
            {loading ? (
              <>
              <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
            </>
            ):moviesError?
            (
            <Text className="text-red-500 px-5 my-3">
              Error: {moviesError.message}
            </Text>)
            :
            query.trim() ?(
              <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{query}</Text>
                </Text>
            )
            :(<Text className=" px-5 my-3">
              
            </Text>)}
          </>
        }
        ListEmptyComponent={
          !loading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {query.trim()
                   ? "No movies found"
                   :"Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
        >
      </FlatList>
    </View>
  )
}

export default search