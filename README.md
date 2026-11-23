# 💍 Royal Interactive Mobile Wedding Invitation

An interactive, mobile-first wedding invitation web experience designed with rich Indian royalty aesthetics: wine-velvet texture (`#6e1f2f`), champagne gold (`#d4af37`), ivory, and blush.

🌐 **Live Demo (GitHub Pages):** [https://gahlodshiva-ctrl.github.io/wedding-digital-invite/](https://gahlodshiva-ctrl.github.io/wedding-digital-invite/)

---

## ✨ Features & Design Flow

1. **📖 3D Wine-Velvet Book Opening**:
   - Velvet-textured cover with a gold Ganesh ji medallion and corner filigree brackets.
   - Parallax blurred 3D roses floating in the background.
   - Preloader transitions to *"Tap the book to open"*; on tap, the cover swings open in 3D (`rotateY(-160deg)`), petals rain down, and music fades in.

2. **👑 First Page (100dvh Phone Height)**:
   - Centered and framed for mobile screens without awkward cutoffs.
   - Gold Ganesh medallion (`|| श्री गणेशाय नमः ||`), family invitations, and groom & bride names animated letter-by-letter with a soft blur-in effect.
   - Floating scroll-down cue.

3. **📜 "Pull to Reveal" Save the Date**:
   - Golden ceremonial rod with a hanging silk tassel and animated pull cue.
   - Tapping or dragging the tassel unrolls the parchment scroll with a rose-and-gold border and triggers a burst of petals and confetti.
   - Includes a **one-line live countdown** (`Days · Hrs · Min · Sec`) and an **Add to Calendar** button (Google Calendar + Apple .ics export).

4. **🎪 3D Swipeable Wedding Festivities Carousel**:
   - Custom 3D perspective slider where the center card is crisp and neighboring cards are blurred and angled.
   - Touch swipe navigation (left/right) across **Mata Pujan**, **Haldi** *(Yellow)*, **Mehendi** *(Green)*, **Sangeet** *(Purple & Pink)*, and **Baraat & Pheras** *(Red & Gold)*, complete with dress code swatches.

5. **📸 3D Our Story Carousel**:
   - Swipeable photo memories with romantic captions and date tags.
   - Tap any card to open in a full-screen Lightbox modal.

6. **🥂 Grand Reception**:
   - Deep wine velvet card with gold typography, star sparkles, and blooming roses in two corners.

7. **🗺️ Location & Animated Route**:
   - Illustrated map card with an animated dotted route line and bouncing location pin.
   - One-click **"Get Directions"** button (opens Google Maps GPS).
   - **"Copy Address"** button with live toast notification.
   - Embedded Google Maps iframe.

8. **🌸 Parallax Marigold Toran & 3D Corner Roses**:
   - Hanging marigold strings pinned to the top that gently swing on scroll.
   - Corner 3D roses that sway and respond to movement without blocking touch events.
   - Hardware-accelerated 60fps performance on iPhone and Android.

---

## 🚀 How to Run Locally

```bash
cd wedding-digital-invite
python3 -m http.server 8899
```
Open **[http://localhost:8899](http://localhost:8899)** in your mobile or desktop browser.

---

## 🌐 Hosted on GitHub Pages

This repository is deployed with GitHub Pages:
👉 **[https://gahlodshiva-ctrl.github.io/wedding-digital-invite/](https://gahlodshiva-ctrl.github.io/wedding-digital-invite/)**
