// Signup
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const charity = document.getElementById("charity").value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, charity }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        window.location.href = "login-page.html";
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (err) {
      console.error("Signup error:", err);
      alert("Server error during signup");
    }
  });
}


// Login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "user-dashboard.html";
      } else {
        alert(data.message || "Login failed");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Server error during login");
    }
  });
}