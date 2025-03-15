import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import { Link } from 'expo-router'

const SavedMovieCard = (
    {
        user_id,
        movie_id,
        poster_url,
        title,
      }: SavedMovie
) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
          <TouchableOpacity className="w-[30%]">
            <Image
              source={{ uri: poster_url }}
              className="w-32 mt-10 h-48 rounded-lg"
              resizeMode="cover"
            />
            <Text
              className="text-sm font-bold mt-2 text-light-200"
              numberOfLines={2}
            >
              {title}
            </Text>
          </TouchableOpacity>
        </Link>
  )
}

export default SavedMovieCard

const styles = StyleSheet.create({})