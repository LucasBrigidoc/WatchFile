import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authFetch } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "@culturehub:token";
const USER_KEY = "@culturehub:user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const savedToken = await AsyncStorage.getItem(TOKEN_KEY);
        if (!savedToken) {
          setIsLoading(false);
          return;
        }

        const res = await authFetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
        } else {
          await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
        }
      } catch {
        const savedUser = await AsyncStorage.getItem(USER_KEY);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await authFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      await AsyncStorage.setItem(TOKEN_KEY, data.token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      try {
        const res = await authFetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Erro ao criar conta");
        }

        await AsyncStorage.setItem(TOKEN_KEY, data.token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setUser(data.user);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authFetch("/api/auth/logout", { method: "POST" });
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signUp,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
