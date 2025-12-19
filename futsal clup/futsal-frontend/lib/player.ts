const API_URL = "http://127.0.0.1:8000/api";

export async function getPlayers() {
  const token = localStorage.getItem("access");

  const res = await fetch(`${API_URL}/players/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
