import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useUser } from "@/services/AuthContext";

export default function LoginScreen() {
  const user = useUser();
  console.log("user", user)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [Name, setName] = useState<string>("");
  return (
    <>
      {user?.current ? (
        <>
          <Text className="flex-1 text-black">{user?.current?.email?.toString()}</Text>
          <Button
            title="Logout"
            onPress={() => { user?.logout() }} />
        </>
      )
        :
        (
          <View style={styles.container}>
            <Text style={styles.header}>Login or Register</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={Name}
              onChangeText={setName}
              secureTextEntry
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                onPress={() => user?.login(email, password)}
              />
              <Button
                title="Register"
                onPress={() => { console.log("click"); user?.register(email, password, Name) }}
              />
            </View>
          </View>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
