const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyKEXI7JGN174s-Orin0ZwbPorPClfYly2vuLw0fd7bOZHoZTao_r7NBCjN9h9esMAP/exec";
let submitClickCount = 0;
const MAX_CLICKS = 3;

// Pill toggle
function togglePill(element) {
  document.querySelectorAll(".pill").forEach((pill) => {
    pill.classList.remove("active");
  });
  element.classList.add("active");
}

// Form submit
function handleSubmit() {
  submitClickCount++;

  const btn = document.getElementById("submitBtnLeadform");
  if (submitClickCount > MAX_CLICKS) {
    btn.disabled = true;
    btn.classList.remove("loading");
    btn.innerText = "Limit Reached";
    showToast(
      "You have reached the maximum submission limit. Please reload the page.",
      "error",
    );
    return;
  }
  btn.classList.add("loading");
  btn.innerText = "Submitting...";
  btn.disabled = true;
  const name = document.getElementById("name").value
    ? document.getElementById("name").value.trim()
    : "";
  const phone = document.getElementById("phone").value.trim();
  const travelDate = document.getElementById("travelDate").value
    ? document.getElementById("travelDate").value
    : "";
  const people = document.getElementById("people").value
    ? document.getElementById("people").value
    : "";
  const specialReq = document.getElementById("specialReq").value
    ? document.getElementById("specialReq").value.trim()
    : "";
  const service = document.querySelector(".pill.active").innerText
    ? document.querySelector(".pill.active").innerText
    : "";

  if (!isValidIndianMobile(phone)) {
    showToast("Please enter a valid 10 digit Indian mobile number.", "error");
    resetButton(btn);
    updatePhoneValidationMessage();
    return;
  }
  const formData = {
    name: name,
    phone: phone,
    travelDate: travelDate,
    people: people,
    service: service,
    specialRequirement: specialReq,
    submittedAt: new Date().toLocaleString(),
    status: "",
  };

  fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(() => {
      showToast("🙏 Thank you! Your request has been submitted.", "success");
      resetButton(btn);
      document
        .querySelectorAll("input, textarea")
        .forEach((el) => (el.value = ""));
      updatePhoneValidationMessage();
    })
    .catch((error) => {
      showToast("Something went wrong. Please try again.", "error");
      resetButton(btn);
      console.error(error);
    });

  console.log("Preparing whatsapp");
  const message = `*Ayodhya Booking Request*

Name     : ${phone}
Service  : ${service}
Date     : ${travelDate}

|| Jai Shri Ram ||`;

  const whatsappNumber = "918858215788"; // CHANGE NUMBER HERE
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
  resetButton(btn);
  window.open(url, "_blank");
  //   setTimeout(() => {
  //     btn.innerHTML = "🙏 Get My Free Quote";
  //     btn.style.background = "";
  //   }, 4000);
}

// Smooth nav highlight on scroll
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 80) {
    nav.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)";
  } else {
    nav.style.boxShadow = "none";
  }
});

// ── SLIDER LOGIC ──
const track = document.getElementById("sliderTrack");
const dotsContainer = document.getElementById("sliderDots");
const prevBtn = document.getElementById("sliderPrev");
const nextBtn = document.getElementById("sliderNext");
const cards = track ? Array.from(track.querySelectorAll(".slide-card")) : [];
let isDragging = false,
  startX = 0,
  scrollStart = 0;

function getCardWidth() {
  return cards[0] ? cards[0].offsetWidth + 20 : 340;
}

function scrollByCard(dir) {
  if (!track) return;
  track.scrollBy({ left: dir * getCardWidth(), behavior: "smooth" });
}

// Wire up arrow buttons with proper event listeners (not onclick)
if (prevBtn) {
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    scrollByCard(-1);
  });
}
if (nextBtn) {
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    scrollByCard(1);
  });
}

// Build dots
cards.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "slider-dot" + (i === 0 ? " active" : "");
  dot.setAttribute("aria-label", "Go to slide " + (i + 1));
  dot.addEventListener("click", () => {
    const card = cards[i];
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft - 20,
      behavior: "smooth",
    });
  });
  dotsContainer.appendChild(dot);
});

// Update active dot on scroll
function updateDots() {
  if (!track) return;
  const scrollPos = track.scrollLeft + track.clientWidth / 2;
  let activeIdx = 0;
  cards.forEach((card, i) => {
    const cardCenter =
      card.offsetLeft - track.offsetLeft + card.offsetWidth / 2;
    if (cardCenter < scrollPos) activeIdx = i;
  });
  dotsContainer.querySelectorAll(".slider-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === activeIdx);
  });
}

if (track) track.addEventListener("scroll", updateDots, { passive: true });

// Mouse drag to scroll (desktop) — only on track itself, not on arrow buttons
if (track) {
  track.addEventListener("mousedown", (e) => {
    // Don't initiate drag if clicking an arrow button
    if (e.target.closest(".slider-arrow")) return;
    isDragging = true;
    startX = e.pageX;
    scrollStart = track.scrollLeft;
    track.style.userSelect = "none";
    track.style.cursor = "grabbing";
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const walk = (e.pageX - startX) * 1.4;
    track.scrollLeft = scrollStart - walk;
  });
  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.userSelect = "";
    track.style.cursor = "grab";
  });
}

// Auto-scroll every 4 seconds
let autoSlide = setInterval(() => {
  if (!isDragging && track) {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 10) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: getCardWidth(), behavior: "smooth" });
    }
  }
}, 4000);

// Pause auto-scroll on user interaction
if (track) {
  track.addEventListener("mouseenter", () => clearInterval(autoSlide));
  track.addEventListener("touchstart", () => clearInterval(autoSlide), {
    passive: true,
  });
}

// Animate cards on scroll

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(
    ".service-card, .dest-card, .why-feature, .testimonial-card, .stat-card",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.className = "toast show " + type;
  toast.innerText = message;

  setTimeout(() => {
    toast.className = "toast";
  }, 4000);
}
function resetButton(btn) {
  btn.classList.remove("loading");
  btn.innerText = "🙏 Get My Free Quote";
  updatePhoneValidationMessage();
}

const phoneInput = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtnLeadform");
const phoneHelp = document.getElementById("phoneHelp");

function isValidIndianMobile(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}

function updatePhoneValidationMessage() {
  phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);

  const phone = phoneInput.value.trim();
  const isValid = isValidIndianMobile(phone);

  submitBtn.disabled = !isValid;

  if (!phone) {
    phoneHelp.innerText = "Please enter a valid 10 digit Indian mobile number.";
    phoneHelp.classList.remove("valid");
  } else if (!isValid) {
    phoneHelp.innerText =
      "Mobile number must be 10 digits and start with 6, 7, 8, or 9.";
    phoneHelp.classList.remove("valid");
  } else {
    phoneHelp.innerText = "Valid mobile number.";
    phoneHelp.classList.add("valid");
  }
}

phoneInput.addEventListener("input", updatePhoneValidationMessage);
updatePhoneValidationMessage();
