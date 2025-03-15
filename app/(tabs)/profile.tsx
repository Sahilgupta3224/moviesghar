import { images } from "@/constants/images";
import React, { useState } from "react";
import { useUser } from "@/services/AuthContext";
import { StyleSheet, Pressable, Text, View, Image, ImageBackground, TouchableOpacity,TextInput } from "react-native";
import { icons } from "@/constants/icons";

const UserProfileView: React.FC = () => {
  const user = useUser();
  console.log("user", user)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [Name, setName] = useState<string>("");
  return (
    <View className="flex-1 items-center py-20 gap-10 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover"/>
      <Image source={icons.logo} className="w-12 h-10 mt-3 mb-5 mx-auto"></Image>
      {user?.current?(
        <>
        <View className="absolute top-40 px-6 py-3 shadow-md items-center">
          <Text className="text-white text-5xl mb-3">Welcome</Text>
          <Text className="text-white text-6xl">{user.current.Name}</Text>
        </View>

    <View className="absolute bottom-40 w-full flex items-center">
      <TouchableOpacity
        onPress={()=>
          {console.log("hm")
          user?.logout()}}
        className="bg-[#3B525F] rounded-lg w-80 h-12 flex items-center justify-center shadow-lg">
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
          </>
      ):(
        <View className="absolute top-40 mt-20 w-3/4 h-3/4 max-w-md gap-4">
        <TextInput
          className="w-full h-12 bg-white text-black px-4 py-2 rounded-md mb-3"
          placeholder="Name"
          value={Name}
          onChangeText={setName}
        />
        <TextInput
          className="w-full h-12 bg-white text-black px-4 py-2 rounded-md mb-3"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full h-12 bg-white text-black px-4 py-2 rounded-md mb-3"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View className="flex items-center">
          <TouchableOpacity
            className="bg-[#3B525F] w-1/2 rounded-md py-3 items-center"
            onPress={() => user?.register(email, password, Name)}
          >
            <Text className="text-white text-lg">Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View className="flex items-center justify-center my-2">
          <Text className="text-white text-lg">OR</Text>
        </View>
        <View className="flex items-center">
          <TouchableOpacity
            className="bg-[#3B525F] w-1/2 rounded-md py-3 items-center"
            onPress={() => user?.login(email, password)}
          >
            <Text className="text-white text-lg">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>)} 
    </View>
  );
};

export default UserProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 300,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    fontSize: 22,
    color: "black",
    fontWeight: "600",
    fontFamily: "Helvetica",
  },
  userInfo: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  text: {
    color: "white",
    textAlign: "center",
    marginVertical: 10,
  },
  body: {
    alignItems: "center",
    paddingVertical: 50,
  },
  rectangle: {
    marginTop: 20,
    width: "80%",
    height: 80,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    paddingLeft: 20,
    elevation: 3,
  },
  headText: {
    fontSize: 16,
    color: "grey",
    fontWeight: "600",
  },
  subjectText: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
    marginTop: 5,
  },
  btn: {
    marginTop: 20,
    backgroundColor: "#3B525F",
    borderRadius: 10,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
});


// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet,Image, Touchable, TouchableOpacity} from "react-native";
// import { useUser } from "@/services/AuthContext";
// import { images } from "@/constants/images";

// export default function LoginScreen() {
//   const user = useUser();
//   console.log("user", user)
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [Name, setName] = useState<string>("");
//   return (
//     <View className='flex-1 bg-primary'>
//       <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover"/>
//       {user?.current ? (
//         <>
//           <Text className="flex-1 text-white">{user?.current?.email?.toString()}</Text>
//           <Text className="flex-1 text-white">{user?.current?.Name?.toString()}</Text>
//           <TouchableOpacity
          
//             onPress={() => { user?.logout()}}>
//               <Text className="flex-1 text-white">Logout</Text>
//               </TouchableOpacity>
//         </>
//       )
//         :
//         (
//           <View style={styles.container}>
//             <Text style={styles.header}>Login or Register</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Name"
//               value={Name}
//               onChangeText={setName}
//               secureTextEntry
//             />
//             <View style={styles.buttonContainer}>
//               <Button
//                 title="Login"
//                 onPress={() => user?.login(email, password)}
//               />
//               <Button
//                 title="Register"
//                 onPress={() => { console.log("click"); user?.register(email, password, Name) }}
//               />
//             </View>
//           </View>
//         )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 8,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
// });
