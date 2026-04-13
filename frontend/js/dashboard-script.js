// File: js/dashboard-script.js

// ✅ Check for JWT token
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login-page.html";
}

// ✅ Logout button
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login-page.html";
  });
}


// ✅ Load dashboard info
async function loadDashboard() {
  try {
    console.log("Loading dashboard...");
    console.log("Token:", token);

    // 🔹 1. User info
    const resUser = await fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!resUser.ok) throw new Error("Failed to fetch user");

    const user = await resUser.json();

    document.getElementById("subStatus").innerText =
      user.subscription || "Inactive";

    document.getElementById("selectedCharity").innerText =
      user.charity || "None";


    // 🔹 2. Last 5 scores
    const resScores = await fetch("http://localhost:5000/api/score", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!resScores.ok) throw new Error("Failed to fetch scores");

    const scores = await resScores.json();

    const scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = "";

    scores.forEach((s) => {
      const li = document.createElement("li");
      li.innerText = `${s.score} (Date: ${new Date(
        s.date
      ).toLocaleDateString()})`;
      scoreList.appendChild(li);
    });


    // 🔹 3. Draw participation
    const resDraw = await fetch(
      "http://localhost:5000/api/draw/participation",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!resDraw.ok) throw new Error("Failed to fetch draw data");

    const drawData = await resDraw.json();

    const drawStatusEl = document.getElementById("drawStatus");
    const participateBtn = document.getElementById("participateBtn");

    if (drawData.joined) {
      drawStatusEl.innerText = "You have joined this month's draw!";
      if (participateBtn) {
        participateBtn.disabled = true;
        participateBtn.innerText = "Already Participated";
      }
    } else {
      drawStatusEl.innerText =
        "You have not yet participated in the draw.";
      if (participateBtn) participateBtn.disabled = false;
    }

  } catch (err) {
    console.error("Dashboard error:", err);
    alert("Error loading dashboard. Check console.");
  }
}

loadDashboard();


// ✅ Add new score
const scoreForm = document.getElementById("scoreForm");

if (scoreForm) {
  scoreForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newScore = document.getElementById("newScore").value;

    if (!newScore || newScore < 1 || newScore > 45) {
      return alert("Score must be between 1 and 45");
    }

    try {
      const res = await fetch("http://localhost:5000/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score: newScore }),
      });

      if (res.ok) {
        document.getElementById("newScore").value = "";
        loadDashboard(); // refresh
      } else {
        const data = await res.json();
        alert(data.message || "Failed to add score");
      }

    } catch (err) {
      console.error("Score error:", err);
      alert("Server error adding score");
    }
  });
}


// ✅ Participate in draw
const participateBtn = document.getElementById("participateBtn");

if (participateBtn) {
  participateBtn.addEventListener("click", async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/draw/participate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        alert("You have joined this month's draw!");

        participateBtn.disabled = true;
        participateBtn.innerText = "Already Participated";

        document.getElementById("drawStatus").innerText =
          "You have joined this month's draw!";
      } else {
        const data = await res.json();
        alert(data.message || "Failed to participate");
      }

    } catch (err) {
      console.error("Draw error:", err);
      alert("Server error during draw participation");
    }
  });
}