import { ID } from "react-native-appwrite";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { account } from "@/services/appwrite";

interface User {
  $id: string;
  email: string;
  Name:string;
}

interface UserContextType {
  current: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, Name: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    try {
      const loggedIn = await account.createEmailPasswordSession(email, password);
      console.log("loggedin", loggedIn)
      setUser({$id:loggedIn.$id,email:loggedIn.providerUid,Name:loggedIn.name});
      console.log("Welcome back. You are logged in");
    }
    catch (e) {
      console.log(e)
    }
  }

  async function logout() {
    console.log("hhhhh")
    await account.deleteSession("current");
    setUser(null);
    console.log("Logged out");
  }

  async function register(email: string, password: string, Name: string) {
    try {
      const newuser = await account.create(ID.unique(), email, password, Name);
      console.log("km")
      await login(email, password);
      console.log(newuser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      console.log("Logged-in User Data:", loggedIn);
      setUser({$id:loggedIn.$id,email:loggedIn.email,Name:loggedIn.name});
      console.log("Welcome back. You are logged in");
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}