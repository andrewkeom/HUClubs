import { createContext, useContext, useEffect, useState } from "react";
import { users } from "../data/mockData";
import { loadData, removeData, saveData } from "../lib/storage";

const HU_SESSION = "hu_session";

export const AuthContext = createContext(null);

export default function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const sessionData = await loadData(HU_SESSION, null);

        const savedUser = users.find((u) => {
          return u.id === sessionData;
        });
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(loggedInUser) {
    const userId = loggedInUser.id;
    await saveData(HU_SESSION, userId);
    setUser(loggedInUser);
  }

  async function logout() {
    await removeData(HU_SESSION);
    setUser(null);
  }

  return (
    <AuthContext value={{ user, isLoading, login, logout }}>
      {props.children}
    </AuthContext>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
