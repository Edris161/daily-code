const API_URL = "http://127.0.0.1:8000/api";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email, // Django uses username by default
      password,
    }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function getProfile(token: string) {
  const res = await fetch(`${API_URL}/auth/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
