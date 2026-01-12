async function handleLogin(email: string, password: string) {
  const res = await fetch("http://localhost:8000/api/auth/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    window.location.href = "/";
  } else {
    alert("Invalid credentials");
  }
}
