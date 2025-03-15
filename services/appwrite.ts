import { Client, Databases, ID, Query, Account } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);
const database = new Databases(client);
export const account = new Account(client);
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    console.log(result)
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      console.log("hello")
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const gettrendingmovies = async ():Promise<TrendingMovie[] | undefined> =>{
  try{
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  }
  catch(e){
    console.error(e);
    return undefined;
  }
}

export const savemovie = async(movie: MovieDetails,userId:string):Promise<Boolean|undefined>=>{
  try{
    console.log("saved",SAVED_COLLECTION_ID)
    console.log(movie)
    const result = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID, [
      Query.equal("movie_id", movie.id),
    ]);
    if(result.documents.length>0){
      return false
    }
    else{
      await database.createDocument(DATABASE_ID,SAVED_COLLECTION_ID,ID.unique(),{
        userId:userId,
        movie_id:movie.id,
        title:movie.title,
        poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`
      })
      return true
    }
  }
  catch(e){
    console.error("error in saving movies",e);
    return undefined
  }
}

export const getsavedmovies = async(userId:string):Promise<SavedMovie[]|undefined>=>{
  try{
    const result = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID, [
      Query.equal("userId", userId),
      // Query.orderDesc("Updated")
    ]);
    console.log(result)
    return result.documents as unknown as SavedMovie[];
  }
  catch(e){
    console.log("error in getting saved movies",e)
    return undefined
  }
}