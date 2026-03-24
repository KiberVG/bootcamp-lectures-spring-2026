// ── State ──────────────────────────────────────────────────────────────────
let cookies = 0;
let totalBaked = 0;
let clickPower = 1;
let username = "";

const upgrades = {
  cursor: { cost: 10, power: 1, bought: false },
  grandma: { cost: 50, power: 5, bought: false },
  farm: { cost: 200, power: 20, bought: false },
};

const milestones = {
  "m-10": { goal: 10, unlocked: false },
  "m-100": { goal: 100, unlocked: false },
  "m-1000": { goal: 1000, unlocked: false },
};

// ── Click ──────────────────────────────────────────────────────────────────
function clickCookie() {
  cookies += clickPower;
  totalBaked += clickPower;
  updateDisplay();
  checkMilestones();
}

// ── Upgrades ───────────────────────────────────────────────────────────────
function buyUpgrade(id) {
  const upg = upgrades[id];
  if (upg.bought || cookies < upg.cost) return;

  cookies -= upg.cost;
  clickPower += upg.power;
  upg.bought = true;

  document.getElementById("btn-" + id).disabled = true;
  updateDisplay();
}

function updateUpgradeButtons() {
  for (const id in upgrades) {
    const upg = upgrades[id];
    const btn = document.getElementById("btn-" + id);
    if (!upg.bought) {
      btn.disabled = cookies < upg.cost;
    }
  }
}

// ── Milestones ─────────────────────────────────────────────────────────────
function checkMilestones() {
  for (const id in milestones) {
    const m = milestones[id];
    if (!m.unlocked && totalBaked >= m.goal) {
      m.unlocked = true;
      document.getElementById(id).classList.add("unlocked");
      // TODO: send milestone to backend
      // fetch('/api/milestone', { method: 'POST', body: JSON.stringify({ username, milestone: id }) });
    }
  }
}

// ── Username ───────────────────────────────────────────────────────────────
function saveUsername() {
  const val = document.getElementById("username-input").value.trim();
  if (!val) return;
  username = val;
  document.getElementById("welcome-msg").textContent =
    "Welcome, " + username + "!";
  // TODO: send username to backend
  // fetch('/api/user', { method: 'POST', body: JSON.stringify({ username }) });
}

// ── Display ────────────────────────────────────────────────────────────────
function updateDisplay() {
  document.getElementById("cookie-count").textContent = "Cookies: " + cookies;
  document.getElementById("click-power-display").textContent =
    "+" + clickPower + " per click";
  updateUpgradeButtons();
}

// ── Init ───────────────────────────────────────────────────────────────────
updateDisplay();
