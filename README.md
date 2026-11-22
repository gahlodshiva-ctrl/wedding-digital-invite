# 💍 Luxury Interactive Digital Wedding Invitation

A digital wedding invitation web experience featuring an interactive 3D envelope with a wax seal, synchronized romantic music playback, photo cards popping into view, live countdown timer, and an embedded Google Map with direct turn-by-turn navigation for wedding guests.

---

## ✨ Features

- 💌 **Interactive 3D Envelope & Wax Seal**:
  - Realistic gold-embossed wax seal that cracks with sparkle particles upon tap.
  - 3D envelope flap opening animation with letter slide-out.
  - Satisfies modern mobile browser autoplay restrictions (audio starts smoothly on tap!).
- 🎵 **Romantic Background Music & Audio Controller**:
  - Automatically fades in romantic piano/acoustic track (`assets/audio/music.mp3`) when the envelope is tapped.
  - Web Audio harmonic chime effect plays instantly upon seal breaking.
  - Floating glassmorphic audio player bar with rotating vinyl disk, track title, animated soundwave equalizer, and play/pause controls.
- 📸 **Popping Photo Memories ("Our Story")**:
  - Polaroid memory cards pop outward around the envelope upon opening.
  - Responsive Polaroid photo gallery with tilted tape aesthetics, romantic captions, and bouncy pop-in physics.
  - Built-in photo lightbox modal to zoom and view memories full-screen.
- 🗺️ **Location & Google Map Integration**:
  - Interactive embedded Google Map iframe for the celebration venue.
  - One-click **"Open in Google Maps"** button for GPS navigation on iPhone/Android.
  - **"Copy Address"** button with toast notification.
  - Detailed venue info: Pavilion, Valet Parking, airport transit details.
- ⏳ **Live Countdown Timer & Calendar Sync**:
  - Real-time Days : Hours : Minutes : Seconds countdown to the wedding ceremony.
  - **"Add to Google Calendar"** one-click link.
  - **"Download Apple iCal (.ics)"** export for iPhone/Mac/Outlook.
- 🌸 **Falling Rose Petals & Golden Confetti Engine**:
  - Pure HTML5 Canvas particle system with organic falling petals and golden shimmer.
  - Dynamic confetti explosion on envelope opening and RSVP submission.
- 💌 **RSVP Form & Live Blessings Wall**:
  - Attendance toggle, party size, dietary preferences, and guestbook messages.
  - Saves locally to `localStorage` and appends to the live wishes wall with confetti celebration.
- 🎨 **Dress Code & Color Palette Guide**:
  - Visual color swatches (Champagne Gold, Blush Rose, Sage Green, etc.).
- 📱 **Mobile & Social-Share Ready**:
  - 100% responsive across smartphones, tablets, and desktops.
  - OpenGraph meta tags configured for WhatsApp, iMessage, and Instagram link previews.

---

## 🚀 Quick Start / How to Run Locally

You can run a simple local web server in the project directory:

### Option 1: Python HTTP Server (Built into Mac)
```bash
cd /Users/shivagahlold/.gemini/antigravity/scratch/wedding-digital-invite
python3 -m http.server 8000
```
Open your browser and visit: **`http://localhost:8000`**

### Option 2: Node.js (npx serve)
```bash
npx serve /Users/shivagahlold/.gemini/antigravity/scratch/wedding-digital-invite
```

---

## 🛠️ How to Customize

All wedding details are centrally organized in **`config.js`**! You don't need to dig through HTML/CSS to change names or dates.

Open `config.js` and customize:

```javascript
window.WEDDING_CONFIG = {
  // 1. Couple Names & Monogram
  couple: {
    groom: "Alexander",
    bride: "Sophia",
    monogram: "S & A",
    hashtag: "#SophiaAndAlexForever"
  },

  // 2. Wedding Date (Used for Countdown & Calendar sync)
  date: {
    displayDate: "Saturday, October 24, 2026",
    isoDateTime: "2026-10-24T16:00:00"
  },

  // 3. Venue & Google Maps Link
  location: {
    venueName: "The Rosewood Manor & Gardens",
    addressLine1: "742 Evergreen Botanical Gardens, High Street",
    addressLine2: "Beverly Hills, CA 90210",
    fullAddress: "742 Evergreen Botanical Gardens, High Street, Beverly Hills, CA 90210",
    
    // Paste any Google Maps embed link or place search
    mapsEmbedUrl: "https://www.google.com/maps/embed?...",
    mapsDirectLink: "https://maps.google.com/?q=Your+Venue+Name"
  },

  // 4. Music Track
  audio: {
    musicSrc: "assets/audio/music.mp3",
    title: "Gymnopédie No. 1 - Romantic Piano"
  },

  // 5. Photos & Captions
  photos: [
    {
      src: "assets/images/couple-1.jpg",
      caption: "Where our journey began ✨",
      date: "Spring 2022"
    },
    ...
  ]
};
```

### Adding Your Own Photos:
Drop your photos into `assets/images/` and update the paths in `config.js`.

### Adding Your Own Song:
Drop your `.mp3` file into `assets/audio/` and update `musicSrc` in `config.js`.

---

## 🌐 Free 1-Click Hosting & Sharing With Guests

You can host this website online for free so guests can open it anywhere via WhatsApp, SMS, or QR code:

1. **GitHub Pages (Free)**:
   - Push this repository to GitHub.
   - Go to **Settings** > **Pages** > Select `main` branch > Click **Save**.
   - Your invite is live at `https://<username>.github.io/<repo-name>`.
2. **Vercel / Netlify (Free)**:
   - Drag and drop the `wedding-digital-invite` folder directly into [Netlify Drop](https://app.netlify.com/drop) or [Vercel](https://vercel.com).
   - Instant custom link with free SSL certificate!
