// File: js/draw-script.js

const token = localStorage.getItem("token");
if (!token) window.location.href = "/login-page.html";

const participateBtn = document.getElementById("participateBtn");
const drawStatusEl = document.getElementById("drawStatus");

// Load draw status
async function loadDrawStatus() {
  try {
    const res = await fetch("/api/draw/participation", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (data.joined) {
      drawStatusEl.innerText = "You have joined this month's draw!";
      if (participateBtn) {
        participateBtn.disabled = true;
        participateBtn.innerText = "Already Participated";
      }
    } else {
      drawStatusEl.innerText = "You have not yet participated in the draw.";
      if (participateBtn) participateBtn.disabled = false;
    }
  } catch (err) {
    console.error(err);
    drawStatusEl.innerText = "Error loading draw status";
  }
}

loadDrawStatus();

// Participate button click
if (participateBtn) {
  participateBtn.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/draw/participate", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (res.ok) {
        alert("You have joined this month's draw!");
        participateBtn.disabled = true;
        participateBtn.innerText = "Already Participated";
        drawStatusEl.innerText = "You have joined this month's draw!";
      } else {
        const data = await res.json();
        alert(data.message || "Failed to participate in draw");
      }
    } catch (err) {
      console.error(err);
      alert("Server error during draw participation");
    }
  });
}