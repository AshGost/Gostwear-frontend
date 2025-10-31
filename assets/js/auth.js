const BACKEND = window.location.hostname.includes("localhost")
  ? "http://localhost:5000/api"
  : "https://gostwear-backend.onrender.com/api";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const userInfo = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      if (!name || !email || !password) return alert("All fields are required!");
      try {
        const res = await fetch(`${BACKEND}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          alert("Registration successful!");
          window.location.href = "login.html";
        } else alert(data.error || "Registration failed");
      } catch (err) {
        alert("Something went wrong. Try again.");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      if (!email || !password) return alert("Both fields are required!");
      try {
        const res = await fetch(`${BACKEND}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Login successful!");
          window.location.href = "index.html";
        } else alert(data.error || "Invalid credentials");
      } catch (err) {
        alert("Something went wrong. Try again.");
      }
    });
  }

  const user = JSON.parse(localStorage.getItem("user"));
  if (user && userInfo) {
    userInfo.textContent = `Welcome, ${user.name || user.email}`;
    userInfo.style.display = "inline-block";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      alert("Logged out successfully!");
      window.location.href = "index.html";
    });
  }
});
