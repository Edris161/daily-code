export const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function apiFetch(endpoint: string, options?: any) {
  const { body, headers, ...rest } = options || {};

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Error:", res.status, errorText);
    throw new Error(errorText);
  }

  return res.json();
}
