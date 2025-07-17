// NAVIGATION SCROLL EFFECT
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  header.classList.toggle("scrolled", window.scrollY > 20);
});

// SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// CTA BUTTON TO DASHBOARD
const getStartedBtn = document.getElementById("getStartedBtn");
if (getStartedBtn) {
  getStartedBtn.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });
}

// ANIMATION ON ENTRY
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2,
});

cards.forEach(card => observer.observe(card));

// FUTURE FEATURE PLACEHOLDER
function showComingSoon() {
  alert("🚧 This feature is coming soon!");
}

// SET COMING SOON FOR UNLINKED BUTTONS
document.querySelectorAll(".card-btn").forEach(btn => {
  if (!btn.href || btn.getAttribute("href") === "#") {
    btn.addEventListener("click", showComingSoon);
  }
});

// ✅ BOT TOGGLE LOGIC
const toggle = document.getElementById('botToggle');
const statusText = document.getElementById('botStatusText'); // make sure it matches ID in HTML

async function fetchBotStatus() {
  try {
    const res = await fetch("https://olamykxvbot.onrender.com/api/settings");
    const data = await res.json();
    if (toggle && statusText) {
      toggle.checked = data.botActive;
      statusText.innerHTML = `Status: <strong>${data.botActive ? "ON" : "OFF"}</strong>`;
    }
  } catch (err) {
    statusText.innerHTML = "⚠️ Error fetching bot status";
  }
}

if (toggle) {
  toggle.addEventListener("change", async () => {
    try {
      const res = await fetch("https://olamykxvbot.onrender.com/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ botActive: toggle.checked }),
      });
      const data = await res.json();
      statusText.innerHTML = `Status: <strong>${toggle.checked ? "ON" : "OFF"}</strong>`;
    } catch (err) {
      statusText.innerHTML = "⚠️ Error updating bot status";
    }
  });

  // Get initial toggle state
  fetchBotStatus();
}

// 🧪 CONNECT TO AI REPLY ENDPOINT (Test only, REMOVE in production)
const sendTestPrompt = async () => {
  const response = await fetch("https://olamykxvbot.onrender.com/api/ai-reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: "Hello OLAMYKxBOT" }),
  });

  const data = await response.json();
  console.log("AI Reply:", data.reply);
};

sendTestPrompt(); // comment or delete this in production
