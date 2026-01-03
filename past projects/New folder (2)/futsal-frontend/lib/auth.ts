import api from "./api";

export async function refreshToken() {
  const refresh = typeof window !== "undefined" ? localStorage.getItem("refresh") : null;
  if (!refresh) return null;
  try {
    const res = await api.post("/token/refresh/", { refresh });
    localStorage.setItem("access", res.data.access);
    return res.data.access;
  } catch {
    return null;
  }
}

// global response interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const newAccess = await refreshToken();
      if (newAccess) {
        original.headers['Authorization'] = `Bearer ${newAccess}`;
        return api(original);
      }
    }
    return Promise.reject(error);
  }
);
