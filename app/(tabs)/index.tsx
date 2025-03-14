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
import { gettrendingmovies } from "@/services/appwrite";

export default function Index(){

  const router = useRouter()

  const {data: trendingMovies, loading:trendingLoading, error: trendingError} = useFetch(gettrendingmovies)

  const { data: movies, loading, error: moviesError } = useFetch(() => fetchmovies({ query: '' }))


  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"></Image>

        {loading || trendingLoading ? (
          <>
            <Text>hello</Text>
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
          </>
        ) : moviesError || trendingError ? (
          <Text className="text-white">Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar onPress={() => { router.push('/search') }} placeholder="dhundh lo" />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  // contentContainerStyle={{
                  //   gap: 26,
                  // }}
                  renderItem={({ item, index }) => (
                    <Text className="text-white">{item.title}</Text>
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}
            <>
              <Text className="text-lg text-white font-bold mt-5">Latest movies</Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )
        }
      </ScrollView>
    </View>
  );
}
