import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApiUrl } from "./query-client";

const TOKEN_KEY = "@culturehub:token";

export async function authFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = getApiUrl();
  const url = new URL(endpoint, baseUrl);

  const token = await AsyncStorage.getItem(TOKEN_KEY);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url.toString(), {
    ...options,
    headers,
  });
}
