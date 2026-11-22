/**
 * Countdown Timer & Calendar Sync Utilities
 */

class WeddingCountdown {
  constructor() {
    this.daysEl = document.getElementById("cd-days");
    this.hoursEl = document.getElementById("cd-hours");
    this.minsEl = document.getElementById("cd-mins");
    this.secsEl = document.getElementById("cd-secs");
    this.timerInterval = null;

    this.initCountdown();
    this.initCalendarButtons();
  }

  initCountdown() {
    const config = window.WEDDING_CONFIG?.date;
    const targetDateStr = config?.isoDateTime || "2026-10-24T16:00:00";
    this.targetDate = new Date(targetDateStr).getTime();

    this.update();
    this.timerInterval = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance <= 0) {
      if (this.daysEl) this.daysEl.textContent = "00";
      if (this.hoursEl) this.hoursEl.textContent = "00";
      if (this.minsEl) this.minsEl.textContent = "00";
      if (this.secsEl) this.secsEl.textContent = "00";
      const title = document.querySelector(".countdown-title");
      if (title) title.textContent = "Today is the Big Day! 💍";
      clearInterval(this.timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (this.daysEl) this.daysEl.textContent = String(days).padStart(2, "0");
    if (this.hoursEl) this.hoursEl.textContent = String(hours).padStart(2, "0");
    if (this.minsEl) this.minsEl.textContent = String(minutes).padStart(2, "0");
    if (this.secsEl) this.secsEl.textContent = String(seconds).padStart(2, "0");
  }

  initCalendarButtons() {
    const googleBtn = document.getElementById("btn-add-google-cal");
    const icalBtn = document.getElementById("btn-download-ical");

    if (googleBtn) {
      googleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openGoogleCalendar();
      });
    }

    if (icalBtn) {
      icalBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.downloadICal();
      });
    }
  }

  getEventDetails() {
    const couple = window.WEDDING_CONFIG?.couple || {};
    const loc = window.WEDDING_CONFIG?.location || {};
    const title = `${couple.bride || "Sophia"} & ${couple.groom || "Alexander"}'s Wedding Celebration`;
    const details = `Join us in celebrating the wedding of ${couple.fullNameBride || "Sophia"} and ${couple.fullNameGroom || "Alexander"}.\nLocation: ${loc.venueName}\nAddress: ${loc.fullAddress}`;
    
    // Default 2026-10-24 16:00 to 23:00 UTC representation
    const startDate = new Date(window.WEDDING_CONFIG?.date?.isoDateTime || "2026-10-24T16:00:00");
    const endDate = new Date(startDate.getTime() + 7 * 60 * 60 * 1000); // +7 hours

    const formatGoogleDate = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

    return {
      title,
      details,
      location: loc.fullAddress || "Beverly Hills, CA",
      startIso: formatGoogleDate(startDate),
      endIso: formatGoogleDate(endDate)
    };
  }

  openGoogleCalendar() {
    const ev = this.getEventDetails();
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      ev.title
    )}&dates=${ev.startIso}/${ev.endIso}&details=${encodeURIComponent(
      ev.details
    )}&location=${encodeURIComponent(ev.location)}`;
    window.open(url, "_blank");
  }

  downloadICal() {
    const ev = this.getEventDetails();
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Digital Invite//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${ev.title}`,
      `DESCRIPTION:${ev.details.replace(/\n/g, "\\n")}`,
      `LOCATION:${ev.location}`,
      `DTSTART:${ev.startIso}`,
      `DTEND:${ev.endIso}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "wedding-invitation.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.weddingCountdown = new WeddingCountdown();
});
