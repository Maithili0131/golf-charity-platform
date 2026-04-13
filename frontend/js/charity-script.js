// File: js/charity-script.js

const token = localStorage.getItem("token");
if (!token) window.location.href = "/login-page.html";

// Logout button
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login-page.html";
  });
}

// Load charity list
async function loadCharities() {
  try {
    const res = await (fetch("http://localhost:5000/api/charity"), {
      headers: { Authorization: `Bearer ${token}` },
    });
    const charities = await res.json();

    const charityList = document.getElementById("charityList");
    charityList.innerHTML = "";

    charities.forEach((c) => {
      const li = document.createElement("li");
      li.innerText = `${c.name} - ${c.description || "No description"}`;
      charityList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    alert("Error loading charities");
  }
}

loadCharities();