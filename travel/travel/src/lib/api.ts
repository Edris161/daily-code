const API_URL = "http://localhost:8000/api";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("access")
    : null;

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
}
