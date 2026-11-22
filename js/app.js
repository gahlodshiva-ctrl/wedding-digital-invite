/**
 * Main Application Logic
 * Orchestrates Envelope Opening, Dynamic Photo Popping, Map Integration, RSVP & Lightbox
 */

document.addEventListener("DOMContentLoaded", () => {
  const config = window.WEDDING_CONFIG || {};

  // DOM Elements
  const envelopeScreen = document.getElementById("envelope-screen");
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const waxSeal = document.getElementById("wax-seal");
  const tapPrompt = document.getElementById("tap-prompt");

  let isEnvelopeOpened = false;

  // 1. Populate Dynamic Data from Config
  populateWeddingData(config);

  // 2. Setup Envelope Tap Events
  const triggerEnvelopeOpen = (e) => {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // Center coordinates of tap for particle burst
    const rect = envelopeWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Trigger visual opening states
    envelopeWrapper.classList.add("opening");

    // Play golden chime and background music
    if (window.weddingAudio) {
      window.weddingAudio.startBackgroundMusic();
    }

    // Trigger celebratory sparkles & petals burst
    if (window.petalsEngine) {
      window.petalsEngine.burst(centerX, centerY, 55);
    }

    // Trigger preview polaroids popping around envelope
    showEnvelopePopPolaroids();

    // After animation sequence, reveal main invitation website
    setTimeout(() => {
      envelopeScreen.classList.add("opened");
      document.body.style.overflow = "auto";

      // Trigger hero entrance and gallery popping
      triggerScrollPopIns();
    }, 1800);
  };

  if (envelopeWrapper) {
    envelopeWrapper.addEventListener("click", triggerEnvelopeOpen);
  }
  if (waxSeal) {
    waxSeal.addEventListener("click", triggerEnvelopeOpen);
  }
  if (tapPrompt) {
    tapPrompt.addEventListener("click", triggerEnvelopeOpen);
  }

  // 3. Popping Polaroids Preview Generation
  function showEnvelopePopPolaroids() {
    const photos = config.photos || [];
    const container = document.getElementById("envelope-pop-photos");
    if (!container) return;

    container.innerHTML = "";
    const previewCount = Math.min(photos.length, 4);

    for (let i = 0; i < previewCount; i++) {
      const p = photos[i];
      const div = document.createElement("div");
      div.className = `pop-polaroid-preview polaroid-pop-${i + 1}`;
      div.innerHTML = `
        <img src="${p.src}" alt="${p.caption || 'Memory'}" loading="lazy" />
        <div class="caption-text">${p.caption || 'Love'}</div>
      `;
      container.appendChild(div);
    }
  }

  // 4. Populate Wedding Details into DOM
  function populateWeddingData(cfg) {
    const couple = cfg.couple || {};
    const date = cfg.date || {};
    const loc = cfg.location || {};

    // Couples names & monograms
    setText(".hero-bride-name", couple.bride || "Sophia");
    setText(".hero-groom-name", couple.groom || "Alexander");
    setText(".letter-monogram", couple.monogram || "S & A");
    setText(".wax-seal-inner", couple.monogram || "S & A");
    setText(".footer-monogram", couple.monogram || "S & A");
    setText(".footer-hashtag", couple.hashtag || "#ForeverTogether");

    // Dates
    setText(".hero-date-text", date.displayDate || "Saturday, October 24, 2026");
    setText(".letter-date", date.displayDate || "October 24, 2026");

    // Location details
    setText(".venue-name", loc.venueName || "The Rosewood Manor");
    setText(".venue-address-1", loc.addressLine1 || "");
    setText(".venue-address-2", loc.addressLine2 || "");
    setText(".venue-landmark", loc.landmark || "Grand Hall & Waterfront Lawn");
    setText(".venue-parking", loc.parkingInfo || "Complimentary Valet Parking available.");

    // Google Maps Iframe & Direct Link
    const mapIframe = document.getElementById("google-maps-iframe");
    if (mapIframe && loc.mapsEmbedUrl) {
      mapIframe.src = loc.mapsEmbedUrl;
    }

    const mapDirectBtn = document.getElementById("btn-open-maps");
    if (mapDirectBtn && loc.mapsDirectLink) {
      mapDirectBtn.href = loc.mapsDirectLink;
      mapDirectBtn.target = "_blank";
    }

    // Build Photo Memories Gallery
    buildPhotoGallery(cfg.photos || []);

    // Build Schedule / Itinerary
    buildSchedule(cfg.schedule || []);

    // Build Dress Code Swatches
    buildDressCode(cfg.dressCode || {});

    // Initial Wishes List
    renderWishes();
  }

  function setText(selector, text) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = text;
    });
  }

  // 5. Build Photo Memories Gallery with Popping Cards
  function buildPhotoGallery(photos) {
    const gallery = document.getElementById("polaroid-gallery");
    if (!gallery) return;
    gallery.innerHTML = "";

    photos.forEach((photo, idx) => {
      const card = document.createElement("div");
      card.className = "polaroid-card pop-in";
      card.style.setProperty("--rot", photo.rotation || `${(idx % 2 === 0 ? -1 : 1) * 3}deg`);
      card.innerHTML = `
        <div class="polaroid-img-wrapper">
          <img src="${photo.src}" alt="${photo.caption}" loading="lazy" />
        </div>
        <div class="polaroid-caption">${photo.caption}</div>
        <div class="polaroid-date">${photo.date}</div>
      `;

      // Click to open in full Lightbox
      card.addEventListener("click", () => {
        openLightbox(photo.src, photo.caption);
      });

      gallery.appendChild(card);
    });
  }

  // 6. Build Schedule Timeline
  function buildSchedule(items) {
    const timeline = document.getElementById("itinerary-timeline");
    if (!timeline) return;
    timeline.innerHTML = "";

    items.forEach((item) => {
      const el = document.createElement("div");
      el.className = "timeline-item";
      el.innerHTML = `
        <div class="timeline-dot">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="timeline-content">
          <div class="timeline-time">${item.time}</div>
          <h4 class="timeline-title">${item.title}</h4>
          <p class="timeline-desc">${item.desc}</p>
        </div>
      `;
      timeline.appendChild(el);
    });
  }

  // 7. Build Dress Code Palette
  function buildDressCode(dc) {
    const container = document.getElementById("palette-swatches");
    if (!container || !dc.palette) return;
    container.innerHTML = "";

    dc.palette.forEach((p) => {
      const item = document.createElement("div");
      item.className = "palette-swatch-item";
      item.innerHTML = `
        <div class="palette-circle" style="background-color: ${p.hex};" title="${p.name}"></div>
        <span class="palette-name">${p.name}</span>
      `;
      container.appendChild(item);
    });
  }

  // 8. Scroll Observer for Popping Photo Cards
  function triggerScrollPopIns() {
    const popElements = document.querySelectorAll(".pop-in");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("popped");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    popElements.forEach((el) => observer.observe(el));
  }

  // 9. Lightbox Photo Viewer
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src, caption) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || "";
    lightbox.classList.add("active");
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
      }
    });
  }

  // 10. Copy Address with Toast Notification
  const copyBtn = document.getElementById("btn-copy-address");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const address = config.location?.fullAddress || "";
      navigator.clipboard.writeText(address).then(() => {
        showToast("Address copied to clipboard! 📋");
      }).catch(() => {
        showToast("Address: " + address);
      });
    });
  }

  function showToast(message) {
    const toast = document.getElementById("toast-notice");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  // 11. RSVP Form & Live Wishes Wall
  const rsvpForm = document.getElementById("wedding-rsvp-form");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("guest-name").value.trim();
      const attending = document.querySelector('input[name="attendance"]:checked')?.value || "attending";
      const count = document.getElementById("guest-count").value;
      const message = document.getElementById("guest-message").value.trim();

      if (!name) return;

      const newWish = {
        name,
        attending: attending === "attending",
        count,
        message: message || (attending === "attending" ? "Can't wait to celebrate with you both! ❤️" : "Sending you all our love!"),
        date: "Just now"
      };

      // Save to local storage
      const savedWishes = JSON.parse(localStorage.getItem("wedding_wishes") || "[]");
      savedWishes.unshift(newWish);
      localStorage.setItem("wedding_wishes", JSON.stringify(savedWishes));

      // Celebrate with confetti
      if (window.petalsEngine) {
        window.petalsEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 70);
      }

      showToast(`Thank you, ${name}! Your RSVP has been received. 🎉`);
      rsvpForm.reset();
      renderWishes();
    });
  }

  function renderWishes() {
    const list = document.getElementById("wishes-list");
    if (!list) return;

    const defaultWishes = [
      { name: "Eleanor & James", message: "Wishing you a lifetime of laughter, joy, and endless adventures together! ✨", date: "Yesterday" },
      { name: "Marcus Sterling", message: "So honored to be there to celebrate with you guys! Let the party begin! 🥂", date: "2 days ago" },
      { name: "Aunt Claire & Uncle Tom", message: "Congratulations to the most beautiful couple. May God bless your marriage. ❤️", date: "3 days ago" }
    ];

    const savedWishes = JSON.parse(localStorage.getItem("wedding_wishes") || "[]");
    const allWishes = [...savedWishes, ...defaultWishes];

    list.innerHTML = "";
    allWishes.forEach((w) => {
      const item = document.createElement("div");
      item.className = "wish-item";
      item.innerHTML = `
        <div class="wish-header">
          <span class="wish-author">${w.name}</span>
          <span class="wish-time">${w.date}</span>
        </div>
        <p class="wish-message">“${w.message}”</p>
      `;
      list.appendChild(item);
    });
  }

  // 12. Replay Envelope Opening Feature
  const replayBtn = document.getElementById("btn-replay-envelope");
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      envelopeScreen.classList.remove("opened");
      envelopeWrapper.classList.remove("opening");
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "instant" });
      isEnvelopeOpened = false;
    });
  }
});
