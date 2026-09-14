// Nonaktifkan pemulihan posisi scroll otomatis agar halaman selalu mulai dari paling atas
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

/* =======================================================
   CONFIG — satu-satunya bagian yang perlu di-edit.
   Ganti semua isi di sini sesuai data pernikahan aslinya.
   ======================================================= */
const CONFIG = {
  groom: {
    nickname: "Andri",
    fullName: "Andri Hermawan",
    parents: "Putra dari Bapak Jamaludin & Ibu Nurasia",
    address: "Kumpeh, Jambi",
    initial: "A",
    photo: "assets/groom_white.jpg?v=2"
  },
  bride: {
    nickname: "Andina",
    fullName: "Andina Fazira",
    parents: "Putri dari Bapak Syafrizal & Ibu Yusnidar",
    address: "Mersam, Kembang Paseban RT 19",
    initial: "D",
    photo: "assets/bride_white.jpg?v=2"
  },
  events: [
    {
      type: "Akad Nikah",
      isoDate: "2026-10-02T09:00:00+07:00",
      timeLabel: "09.00 WIB – selesai",
      place: "Kediaman Mempelai Wanita",
      address: "Mersam, Kembang Paseban RT 19",
      mapsQuery: "Kembang Paseban, Mersam, Batang Hari, Jambi"
    },
    {
      type: "Resepsi Pernikahan",
      isoDate: "2026-10-04T08:00:00+07:00",
      timeLabel: "08.00 WIB – selesai",
      place: "Kediaman Mempelai Wanita",
      address: "Mersam, Kembang Paseban RT 19",
      mapsQuery: "Kembang Paseban, Mersam, Batang Hari, Jambi"
    }
  ],
  countdownTarget: "2026-10-02T09:00:00+07:00",
  story: [
    {
      title: "Awal Bertemu",
      text: "Tidak ada yang kebetulan di dunia ini, semua sudah tersusun rapi oleh Sang Maha Kuasa. Kita tidak bisa memilih kepada siapa kita akan jatuh cinta, kami bertemu tanpa disengaja, awalnya kami berfikir untuk dijalani saja dulu. Tapi tidak disangka pertemuan itu membawa kami pada suatu ikatan yang suci ini."
    },
    {
      title: "Pendekatan",
      text: "Katanya cinta dapat tumbuh dengan kebersamaan. Seiring berjalannya waktu kami semakin dekat, saling melengkapi satu sama lain, saling support satu sama lain, dan alam seakan terus berkonspirasi untuk menyatukan kami berdua."
    },
    {
      title: "Lamaran",
      text: "Kehendak-Nya menuntun kami pada sebuah ikatan yang tidak disangka hingga akhirnya membawa kami pada ikatan suci yang dicintai-Nya. Kami melangsungkan lamaran pada tanggal 25 Juni 2026."
    },
    {
      title: "Menikah",
      text: "Percayalah, bukan karena bertemu lalu berjodoh tapi karena berjodohlah maka kami dipertemukan. Kami memutuskan untuk mengikrarkan janji suci pernikahan kami pada tanggal 02 Oktober 2026 dan melangsungkan resepsi pernikahan pada tanggal 04 Oktober 2026. Insya Allah sebagaimana yang pernah dikatakan oleh Sayidina Ali bin Abi Thalib: “Apa yang menjadi takdirmu akan menemukan jalannya untuk menemukanmu”."
    }
  ],
  gallery: [
    "assets/photo_couple_1.jpg?v=w1",
    "assets/photo_couple_2.jpg?v=w1",
    "assets/photo_couple_3.jpg?v=w1",
    "assets/cover_couple.jpg?v=w1"
  ],
  gifts: [
    { bank: "Bank Mandiri", number: "1100016290949", owner: "a.n. ANDRI HERMAWAN" },
    { bank: "DANA (E-Wallet)", number: "085840018015", owner: "a.n. ANDINA FAZIRA" }
  ],
  whatsappNumber: "6285840018015",
  monogramImage: "assets/monogram_ad.png?v=2",
  audio: "assets/background-music.mp3"
};

/* ================= RENDER ================= */
const q = new URLSearchParams(location.search);
const guestName = q.get("to") ? decodeURIComponent(q.get("to")) : "Tamu Undangan";
document.getElementById("gateGuest").textContent = guestName;
if (q.get("to")) {
  const fNameInput = document.getElementById("fName");
  if (fNameInput) fNameInput.value = guestName;
}
document.getElementById("gateNames").innerHTML = CONFIG.groom.nickname + ' <span class="gate-amp">&amp;</span> ' + CONFIG.bride.nickname;

if (CONFIG.monogramImage) {
  document.getElementById("monogram").innerHTML = `<img src="${CONFIG.monogramImage}" alt="Inisial ${CONFIG.groom.nickname} &amp; ${CONFIG.bride.nickname}" class="monogram-img">`;
} else {
  document.getElementById("monogram").innerHTML = `<span class="mono-letter mono-left">${CONFIG.groom.initial}</span><span class="mono-amp">&amp;</span><span class="mono-letter mono-right">${CONFIG.bride.initial}</span>`;
}

document.getElementById("closingNames").innerHTML = CONFIG.groom.nickname + " &amp; " + CONFIG.bride.nickname;
document.title = "Undangan Pernikahan " + CONFIG.groom.nickname + " & " + CONFIG.bride.nickname;

// Render Mempelai (Couple) dengan animasi masuk kiri & kanan
const groomPhotoHtml = CONFIG.groom.photo
  ? `<img src="${CONFIG.groom.photo}" alt="${CONFIG.groom.fullName}">`
  : CONFIG.groom.initial;

const bridePhotoHtml = CONFIG.bride.photo
  ? `<img src="${CONFIG.bride.photo}" alt="${CONFIG.bride.fullName}">`
  : CONFIG.bride.initial;

document.getElementById("coupleGrid").innerHTML = `
  <div class="couple-card reveal-left">
    <div class="couple-photo">${groomPhotoHtml}</div>
    <div class="couple-name">${CONFIG.groom.fullName}</div>
    <div class="couple-parents">${CONFIG.groom.parents}</div>
    <div class="couple-address"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${CONFIG.groom.address}</div>
  </div>
  <div class="couple-and reveal-scale delay-1">&amp;</div>
  <div class="couple-card reveal-right delay-2">
    <div class="couple-photo">${bridePhotoHtml}</div>
    <div class="couple-name">${CONFIG.bride.fullName}</div>
    <div class="couple-parents">${CONFIG.bride.parents}</div>
    <div class="couple-address"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${CONFIG.bride.address}</div>
  </div>
`;

// Render Acara (Events) dengan animasi slide up berurutan
document.getElementById("eventsList").innerHTML = CONFIG.events.map((ev, i) => {
  const d = new Date(ev.isoDate);
  const dateLabel = isNaN(d) ? "" : d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ev.mapsQuery);
  return `
  <div class="event-card reveal delay-${i + 1}">
    <div class="event-type">${ev.type}</div>
    <div class="event-date">${dateLabel}</div>
    <div class="event-time">${ev.timeLabel}</div>
    <div class="event-place">${ev.place}<br>${ev.address}</div>
    <a class="btn-outline" href="${mapsUrl}" target="_blank" rel="noopener">Lihat Lokasi</a>
  </div>`;
}).join("");

// Render Love Story
document.getElementById("storyList").innerHTML = CONFIG.story.map((s, i) => `
  <div class="story-item reveal-left delay-${(i % 3) + 1}">
    <div class="story-title">${s.title}</div>
    <div class="story-text">${s.text}</div>
  </div>
`).join("");

// Render Gallery dengan foto asli kedua mempelai
const galleryItems = (CONFIG.gallery && CONFIG.gallery.length)
  ? CONFIG.gallery
  : ["assets/photo_couple_1.jpg", "assets/photo_couple_2.jpg", "assets/photo_couple_3.jpg", "assets/cover_couple.jpg"];

document.getElementById("galleryGrid").innerHTML = galleryItems.map((imgSrc, i) => `
  <div class="gallery-slot reveal-scale delay-${(i % 4) + 1}">
    <img src="${imgSrc}" alt="Momen Bahagia Andri & Andina ${i + 1}" loading="lazy">
  </div>
`).join("");

// Render Gift Cards
document.getElementById("giftList").innerHTML = CONFIG.gifts.map((g, i) => `
  <div class="gift-card reveal delay-${i + 1}">
    <div>
      <div class="gift-bank">${g.bank}</div>
      <div class="gift-number">${g.number}</div>
      <div class="gift-owner">${g.owner}</div>
    </div>
    <button class="btn-copy" type="button" data-number="${g.number}" data-idx="${i}">Salin</button>
  </div>
`).join("");

// Event listener tombol Salin No. Rekening
document.querySelectorAll(".btn-copy").forEach(btn => {
  btn.addEventListener("click", async () => {
    const num = btn.getAttribute("data-number");
    try {
      await navigator.clipboard.writeText(num);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = num;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    const original = btn.textContent;
    btn.textContent = "Tersalin";
    btn.classList.add("copied");
    setTimeout(() => { btn.textContent = original; btn.classList.remove("copied"); }, 1800);
  });
});

/* ================= SCROLL REVEAL (BIDIREKSIONAL / ATAS & BAWAH) ================= */
let scrollObserver;

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");

  if ("IntersectionObserver" in window) {
    if (scrollObserver) scrollObserver.disconnect();

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          // Ketika elemen keluar dari layar (baik lewat atas atau lewat bawah),
          // reset status agar saat di-scroll kembali (naik/turun), animasinya terpicu ulang!
          const rect = entry.boundingClientRect;
          if (rect.top > window.innerHeight * 0.95 || rect.bottom < -40) {
            entry.target.classList.remove("active");
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px"
    });

    animatedElements.forEach(el => scrollObserver.observe(el));
  } else {
    animatedElements.forEach(el => el.classList.add("active"));
  }
}

// Inisialisasi observer setelah rendering
initScrollAnimations();

/* ================= SCROLL LISTENER (PARALLAX VINE & BREEZE INTERACTION) ================= */
let lastScrollPosition = window.scrollY;

/* ================= DYNAMIC BACKGROUND SWITCH ON SCROLL ================= */
const bgSlides = document.querySelectorAll(".page-bg-slide");
let currentSlideIndex = 0;

function updateDynamicBackground() {
  if (!bgSlides || !bgSlides.length) return;

  const eventsEl = document.getElementById("events");
  const giftEl = document.getElementById("gift");

  if (!eventsEl || !giftEl) return;

  const eventsRect = eventsEl.getBoundingClientRect();
  const giftRect = giftEl.getBoundingClientRect();
  const triggerY = window.innerHeight * 0.6;

  let targetIndex = 0;

  if (giftRect.top <= triggerY) {
    // Bagian bawah: Galeri, Hadiah, RSVP, Penutup -> Foto 3 (Pose Gaun Mewah Berekor)
    targetIndex = 2;
  } else if (eventsRect.top <= triggerY) {
    // Bagian tengah: Acara & Love Story -> Foto 2 (Pose Duduk Elegan di Kursi Rotan)
    targetIndex = 1;
  } else {
    // Bagian atas: Hero, Mempelai, Countdown -> Foto 1 (Pose Berdiri Berdua)
    targetIndex = 0;
  }

  if (targetIndex !== currentSlideIndex) {
    currentSlideIndex = targetIndex;
    bgSlides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }
}

// Inisialisasi background awal
updateDynamicBackground();

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const delta = currentScroll - lastScrollPosition;
  lastScrollPosition = currentScroll;

  // 1. Ganti foto background secara dinamis berdasarkan posisi section
  updateDynamicBackground();

  // 2. Perbarui menu aktif pada Floating Bottom Nav
  updateActiveNav();
}, { passive: true });

/* ================= GATE / COVER (SWIPE UP / GESER KE ATAS & KLIK) ================= */
const gateEl = document.getElementById("gate");
let isGateOpened = false;

function openGate() {
  if (isGateOpened) return;
  isGateOpened = true;

  // Pastikan posisi scroll tepat di paling atas (0, 0)
  window.scrollTo(0, 0);

  // Animasi membuka gerbang cover ke atas
  if (gateEl) {
    gateEl.classList.add("open");
  }

  // Buka kunci scroll pada halaman
  document.body.classList.remove("gate-locked");
  document.documentElement.classList.remove("gate-locked");

  // Tampilkan Floating Bottom Navigation Bar
  const bottomNav = document.getElementById("bottomNav");
  if (bottomNav) {
    bottomNav.classList.add("visible");
  }

  // Putar Musik Latar & Tampilkan Tombol Kontrol Musik
  playBackgroundMusic();

  // Begitu gerbang terbuka, aktifkan animasi elemen di bagian atas (#hero) secara estetik
  setTimeout(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll("#hero .reveal, #hero .reveal-scale, #hero .reveal-left, #hero .reveal-right").forEach(el => {
      el.classList.add("active");
    });
  }, 350);
}

// 1. Klik tombol "Buka Undangan"
const openBtn = document.getElementById("openBtn");
if (openBtn) {
  openBtn.addEventListener("click", () => {
    playBackgroundMusic();
    openGate();
  });
  openBtn.addEventListener("touchstart", () => {
    playBackgroundMusic();
  }, { passive: true });
}

// 2. Gesture Slide / Swipe ke Atas pada Layar Sentuh (HP / Tablet)
let touchStartY = 0;
let touchStartX = 0;

if (gateEl) {
  gateEl.addEventListener("touchstart", (e) => {
    if (isGateOpened) return;
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  gateEl.addEventListener("touchmove", (e) => {
    if (!isGateOpened) {
      // Cegah scrolling tembus ke halaman di belakang
      e.preventDefault();
    }
  }, { passive: false });

  gateEl.addEventListener("touchend", (e) => {
    if (isGateOpened) return;
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const diffY = touchStartY - touchEndY;
    const diffX = Math.abs(touchStartX - touchEndX);

    // Jika pengguna menggeser/swipe ke atas lebih dari 40px
    if (diffY > 40 && diffY > diffX) {
      openGate();
    }
  }, { passive: true });

  // 3. Scroll Wheel Mouse ke bawah saat kursor di Gate
  gateEl.addEventListener("wheel", (e) => {
    if (!isGateOpened) {
      e.preventDefault();
      if (e.deltaY > 15) {
        openGate();
      }
    }
  }, { passive: false });

  // 4. Mouse Drag ke atas di Desktop
  let mouseStartY = 0;
  let isMouseDown = false;

  gateEl.addEventListener("mousedown", (e) => {
    if (isGateOpened) return;
    isMouseDown = true;
    mouseStartY = e.clientY;
  });

  window.addEventListener("mouseup", (e) => {
    if (isGateOpened || !isMouseDown) return;
    isMouseDown = false;
    const diffY = mouseStartY - e.clientY;
    if (diffY > 45) {
      openGate();
    }
  });
}

/* ================= BACKGROUND MUSIC (BGM) ================= */
const bgAudio = document.getElementById("bgAudio");

if (bgAudio) {
  bgAudio.loop = true;
  bgAudio.volume = 1.0;
  bgAudio.muted = false;
  if (!bgAudio.src || bgAudio.src === "" || bgAudio.src.endsWith("/")) {
    bgAudio.src = CONFIG.audio || "assets/background-music.mp3";
  }
}

function playBackgroundMusic() {
  if (!bgAudio) return;
  bgAudio.muted = false;
  bgAudio.volume = 1.0;
  if (!bgAudio.src || bgAudio.src === "" || bgAudio.src.endsWith("/")) {
    bgAudio.src = CONFIG.audio || "assets/background-music.mp3";
  }
  const playPromise = bgAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      console.log("Audio BGM berhasil diputar.");
    }).catch((err) => {
      console.log("Audio autoplay menunggu interaksi pengguna:", err);
    });
  }
}

// Coba putar otomatis sedini mungkin
playBackgroundMusic();

// Fallback: Aktifkan musik pada interaksi/klik/sentuhan pertama pengguna di mana saja
const resumeAudioOnAnyGesture = () => {
  if (bgAudio && bgAudio.paused) {
    playBackgroundMusic();
  }
};

['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown'].forEach(evt => {
  window.addEventListener(evt, resumeAudioOnAnyGesture, { passive: true });
  document.addEventListener(evt, resumeAudioOnAnyGesture, { passive: true });
});

/* ================= COUNTDOWN ================= */
function updateCountdown() {
  const target = new Date(CONFIG.countdownTarget).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById("cdDays").textContent = String(d).padStart(2, "0");
  document.getElementById("cdHours").textContent = String(h).padStart(2, "0");
  document.getElementById("cdMins").textContent = String(m).padStart(2, "0");
  document.getElementById("cdSecs").textContent = String(s).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ================= RSVP + BUKU TAMU & UCAPAN PUBLIK ================= */
const WISH_KEY = "wishes_public";

function formatWishTime(timestamp) {
  if (!timestamp) return "Baru saja";
  const now = Date.now();
  const diffSec = Math.floor((now - timestamp) / 1000);

  if (diffSec < 60) return "Baru saja";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} menit lalu`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} jam lalu`;

  const d = new Date(timestamp);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function getAttendanceBadge(attendance) {
  const att = (attendance || "Hadir").toLowerCase();
  if (att.includes("hadir") && !att.includes("tidak") && !att.includes("belum")) {
    return `<span class="wish-att hadir"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>Hadir</span>`;
  }
  if (att.includes("belum") || att.includes("pasti")) {
    return `<span class="wish-att ragu"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>Belum Pasti</span>`;
  }
  return `<span class="wish-att absen"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>Berhalangan</span>`;
}

function renderWishes(list) {
  const el = document.getElementById("wishesList");
  const countEl = document.getElementById("wishesCount");
  
  if (countEl) {
    countEl.textContent = `${list.length} Doa Terkirim`;
  }

  if (!list || list.length === 0) {
    el.innerHTML = '<div class="wishes-empty reveal active">Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</div>';
    return;
  }

  el.innerHTML = list.slice().reverse().map((w, i) => {
    const initial = (w.name || "T").trim()[0].toUpperCase();
    const timeFormatted = formatWishTime(w.time);
    const badgeHtml = getAttendanceBadge(w.attendance);

    return `
      <div class="wish-item reveal active delay-${(i % 3) + 1}">
        <div class="wish-item-header">
          <div class="wish-avatar">${escapeHtml(initial)}</div>
          <div class="wish-meta">
            <div class="wish-name-row">
              <span class="wish-name">${escapeHtml(w.name)}</span>
              ${badgeHtml}
            </div>
            <div class="wish-time">${escapeHtml(timeFormatted)}</div>
          </div>
        </div>
        <div class="wish-msg">${escapeHtml(w.message)}</div>
      </div>
    `;
  }).join("");
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str || "";
  return d.innerHTML;
}

let wishesCache = [];

async function loadWishes() {
  try {
    const response = await fetch("/api/wishes");
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        wishesCache = data;
        try { localStorage.setItem(WISH_KEY, JSON.stringify(data)); } catch (e) {}
        renderWishes(wishesCache);
        return wishesCache;
      }
    }
  } catch (err) {
    console.warn("Gagal terhubung ke API /api/wishes, menggunakan cache lokal:", err);
  }

  try {
    const local = localStorage.getItem(WISH_KEY);
    wishesCache = local ? JSON.parse(local) : [];
  } catch (e) {
    wishesCache = [];
  }

  renderWishes(wishesCache);
  return wishesCache;
}

loadWishes();

document.getElementById("rsvpForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameEl = document.getElementById("fName");
  const attEl = document.getElementById("fAtt");
  const msgEl = document.getElementById("fMsg");
  const note = document.getElementById("fNote");
  const success = document.getElementById("fSuccess");
  if (success) success.classList.remove("show");

  const name = nameEl.value.trim();
  const message = msgEl.value.trim();
  const attendance = attEl.value;

  if (!name || !message) {
    if (note) note.classList.add("show");
    return;
  }
  if (note) note.classList.remove("show");

  const submitBtn = e.target.querySelector(".btn-submit");
  const originalHtml = submitBtn.innerHTML;
  submitBtn.innerHTML = `
    <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="2" x2="12" y2="6"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      <line x1="2" y1="12" x2="6" y2="12"></line>
      <line x1="18" y1="12" x2="22" y2="12"></line>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
    <span>Mempublikasikan doa…</span>
  `;
  submitBtn.disabled = true;

  const payload = {
    name,
    attendance,
    message,
    time: Date.now()
  };

  let savedSuccessfully = false;

  try {
    const res = await fetch("/api/wishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const resData = await res.json();
      if (resData && resData.wish) {
        wishesCache.push(resData.wish);
        savedSuccessfully = true;
      }
    }
  } catch (err) {
    console.warn("Gagal mengirim ke API, menyimpan secara lokal:", err);
  }

  if (!savedSuccessfully) {
    payload.id = "local_" + Date.now();
    wishesCache.push(payload);
  }

  try {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishesCache));
  } catch (e) {}

  renderWishes(wishesCache);

  if (success) {
    success.textContent = "✨ Terima kasih! Doa dan ucapanmu telah dipublikasikan.";
    success.classList.add("show");
  }

  msgEl.value = "";

  submitBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>Terkirim!</span>
  `;

  setTimeout(() => {
    submitBtn.innerHTML = originalHtml;
    submitBtn.disabled = false;
  }, 1800);
});

/* ================= FLOATING BOTTOM NAVIGATION BAR ================= */
const navItems = document.querySelectorAll(".bottom-nav .nav-item");
const navSections = [
  { id: "#hero", el: document.getElementById("hero") },
  { id: "#couple", el: document.getElementById("couple") },
  { id: "#events", el: document.getElementById("events") },
  { id: "#story", el: document.getElementById("story") },
  { id: "#gift", el: document.getElementById("gift") },
  { id: "#rsvp", el: document.getElementById("rsvp") }
];

let isNavClickScrolling = false;

navItems.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetSelector = btn.getAttribute("data-target");
    const targetEl = document.querySelector(targetSelector);
    if (!targetEl) return;

    isNavClickScrolling = true;
    navItems.forEach(n => n.classList.remove("active"));
    btn.classList.add("active");

    const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 15;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });

    setTimeout(() => {
      isNavClickScrolling = false;
    }, 850);
  });
});

function updateActiveNav() {
  if (isNavClickScrolling || !isGateOpened) return;

  const scrollMiddle = window.scrollY + window.innerHeight * 0.4;
  let currentTarget = "#hero";

  navSections.forEach(({ id, el }) => {
    if (!el) return;
    const top = el.offsetTop;
    if (scrollMiddle >= top) {
      currentTarget = id;
    }
  });

  navItems.forEach(btn => {
    if (btn.getAttribute("data-target") === currentTarget) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}
