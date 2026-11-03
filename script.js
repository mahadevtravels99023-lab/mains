const matches = [
  {
    sport: "Cricket",
    event: "India vs England",
    meta: "3rd ODI • International",
    score: "Click Below to View Market",
    detail: "",
  },
  {
    sport: "Football",
    event: "Real Madrid vs Barcelona",
    meta: "La Liga • Football",
    score: "Click Below to View Market",
    detail: "",
  },
  {
    sport: "Tennis",
    event: "Wimbledon - Men's Singles",
    meta: "Quarter Final • Tennis",
    score: "Click Below to View Market",
    detail: "",
  },
];

function dashboardMarkup(m) {
  return `<div class="match">
    <div class="event"><span class="live-pill">LIVE</span><div class="teams"><b>${m.event}</b><small>${m.meta}</small></div></div>
    <div class="score"><b>${m.score}</b><small>${m.detail}</small></div>
    <div class="bet"><a href="https://mahadevonline.app" class="button-link"><button data-modal="signup">Bet Now</button></a></div>
  </div>`;
}
function phoneMarkup(m) {
  return `<div class="phone-match"><span><b>${m.event}</b><br><small>${m.sport}</small></span><b>${m.score}</b></div>`;
}
function publicMarkup(m) {
  return `<article class="public-card">
    <div class="top"><div><h3>${m.event}</h3><p>${m.meta}</p></div><span class="live-pill">LIVE</span></div>
    <div class="big-score">${m.score} <small style="font-size:11px;color:#8493a3">${m.detail}</small></div>
    <a href="https://mahadevonline.app" class="button-link"><button data-modal="signup">View Demo Market</button></a>
  </article>`;
}
function renderMatches() {
  document.querySelector("#dashboardMatches").innerHTML = matches
    .map(dashboardMarkup)
    .join("");
  document.querySelector("#phoneMatches").innerHTML = matches
    .map(phoneMarkup)
    .join("");
  document.querySelector("#publicMatches").innerHTML = matches
    .map(publicMarkup)
    .join("");
  wireModalButtons();
}
renderMatches();

const menuBtn = document.querySelector("#menuBtn");
const mobileMenu = document.querySelector("#mobileMenu");
menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("open"));
mobileMenu
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => mobileMenu.classList.remove("open")),
  );

const backdrop = document.querySelector("#modalBackdrop");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const formMessage = document.querySelector("#formMessage");

// function openModal(type) {
//   backdrop.classList.add("open");
//   formMessage.textContent = "";
//   if (type === "signup") {
//     modalTitle.textContent = "Create Account";
//     modalText.textContent =
//       "This front-end is a demonstration. No real-money transactions are enabled.";
//   } else {
//     modalTitle.textContent = "Welcome Back";
//     modalText.textContent =
//       "Demo login interface — no real account is created.";
//   }
// }
// function wireModalButtons() {
//   document.querySelectorAll("[data-modal]").forEach((btn) => {
//     btn.onclick = () => openModal(btn.dataset.modal);
//   });
// }
// wireModalButtons();

document.querySelector("#modalClose").onclick = () =>
  backdrop.classList.remove("open");
backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) backdrop.classList.remove("open");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") backdrop.classList.remove("open");
});

document.querySelector("#demoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  formMessage.textContent =
    "Demo submitted — connect your own backend to enable authentication.";
});

document.querySelector("#refreshBtn").addEventListener("click", function () {
  this.textContent = "↻ Refreshed";
  this.disabled = true;
  setTimeout(() => {
    this.textContent = "↻ Refresh";
    this.disabled = false;
  }, 800);
});
