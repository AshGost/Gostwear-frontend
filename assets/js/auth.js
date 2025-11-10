const BACKEND_AUTH = window.location.hostname.includes("localhost")
  ? "http://localhost:5000/api"
  : "https://gostwear-backend.onrender.com/api";

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) return alert("Please fill in all fields.");

  try {
    const res = await fetch(`${BACKEND_AUTH}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("✅ Login successful!");
      window.location.href = "index.html";
    } else {
      alert(data.error || "Login failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Server error, please try again.");
  }
}

async function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) return alert("Please fill in all fields.");

  try {
    const res = await fetch(`${BACKEND_AUTH}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      alert("✅ Registration successful! Please login.");
      window.location.href = "login.html";
    } else {
      alert(data.error || "Registration failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Server error, please try again.");
  }
}
