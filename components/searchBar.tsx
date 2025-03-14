import { View, TextInput, Image } from "react-native";

import { icons } from "@/constants/icons";

const SearchBar = ({onPress,placeholder,OnchangeText,value}:any) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={OnchangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
      />
    </View>
  )
}

export default SearchBar

// const styles = StyleSheet.create({})