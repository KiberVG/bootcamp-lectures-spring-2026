// ── State, things we want to save and change throughout the life of the app
let cookies = 0;
let totalBaked = 0;
let clickPower = 1;
let username = "";

let backendLink = "http://localhost:8000";

// Keeping track of our upgrades all in one place
const upgrades = {
  cursor: { cost: 10, power: 1, bought: false },
  grandma: { cost: 50, power: 5, bought: false },
  farm: { cost: 200, power: 20, bought: false },
};

// Keeping track of our milestones in one place to be organized
const milestones = {
  "m-10": { goal: 10, unlocked: false },
  "m-100": { goal: 100, unlocked: false },
  "m-1000": { goal: 1000, unlocked: false },
};

// ── Click
function clickCookie() {
  // These variables update, but do not necessarily update the screen
  cookies += clickPower;
  totalBaked += clickPower;
  // We need to write functions to update the screen, and see if we achieved the milestone
  updateDisplay();
  checkMilestones();
}

// ── Upgrades
function buyUpgrade(id) {
  const upg = upgrades[id];

  // If we already bought it or don't have enough money, do nothing
  if (upg.bought || cookies < upg.cost) return;

  // Do the appropriate changes
  cookies -= upg.cost;
  clickPower += upg.power;
  upg.bought = true;

  // Disable the button to make it clear you cannot buy again
  document.getElementById("btn-" + id).disabled = true;

  // Update the screen (it doesn't update by itself just cause you changed some variables in memory)
  updateDisplay();
}

// This helps us update the screen by disabling cookies if we don't have enough money
function updateUpgradeButtons() {
  for (const id in upgrades) {
    const upg = upgrades[id];
    const btn = document.getElementById("btn-" + id);
    if (!upg.bought) { // don't change if we already bought it (should always be disabled)
      btn.disabled = cookies < upg.cost;
    }
  }
}

// ── Milestones 
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

  sendUsernameBackend();

}

// ── Display ────────────────────────────────────────────────────────────────
function updateDisplay() {
  document.getElementById("cookie-count").textContent = "Cookies: " + cookies;
  document.getElementById("click-power-display").textContent =
    "+" + clickPower + " per click";
  updateUpgradeButtons();
}

// async function getUsernameBackend() {
//     let data = await fetch(backendLink + "/username", );
//     let datajson = await data.json();

//     let username = datajson['username']
//     console.log(username)
// }

async function sendUsernameBackend() {
    await fetch(backendLink + "/username/" + username, { method: 'POST'});

}

// ── Init

// Anything outside of functions will just run when the website loads. 
// So be careful about what you leave outside of functions, we want this here because we want to set everything to zero
updateDisplay();

// getUsernameBackend()