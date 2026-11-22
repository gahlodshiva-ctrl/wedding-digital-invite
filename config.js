/**
 * Digital Wedding Invitation Configuration
 * Easily update the wedding details, couple names, venue, map location, and photos here!
 */
window.WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: "Alexander",
    bride: "Sophia",
    monogram: "S & A",
    fullNameGroom: "Alexander Hayes",
    fullNameBride: "Sophia Montgomery",
    parentsGroom: "Son of Mr. & Mrs. David Hayes",
    parentsBride: "Daughter of Mr. & Mrs. Edward Montgomery",
    hashtag: "#SophiaAndAlexForever"
  },

  // Wedding Date & Time (Used for Countdown & Calendar sync)
  date: {
    displayDate: "Saturday, October 24, 2026",
    displayTime: "4:00 PM onwards",
    isoDateTime: "2026-10-24T16:00:00", // Format: YYYY-MM-DDTHH:MM:SS
    year: "2026",
    monthName: "October",
    day: "24"
  },

  // Location & Google Map Details
  location: {
    venueName: "The Rosewood Manor & Gardens",
    addressLine1: "742 Evergreen Botanical Gardens, High Street",
    addressLine2: "Beverly Hills, CA 90210",
    fullAddress: "742 Evergreen Botanical Gardens, High Street, Beverly Hills, CA 90210",
    landmark: "Grand Hall & Waterfront Lawn Pavilion",
    parkingInfo: "Complimentary Valet Parking available at main gates.",
    
    // Google Maps Embed & Direct Navigation Link
    // You can replace with any place or coordinates
    mapsSearchQuery: "Beverly Hills Hotel & Gardens",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13217.915746369527!2d-118.42082987823907!3d34.08290374661858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379f881f016!2sThe%20Beverly%20Hills%20Hotel!5e0!3m2!1sen!2sus!4v1716500000000!5m2!1sen!2sus",
    mapsDirectLink: "https://maps.google.com/?q=The+Beverly+Hills+Hotel,+Beverly+Hills,+CA"
  },

  // Background Music
  audio: {
    musicSrc: "assets/audio/music.mp3",
    title: "Gymnopédie No. 1 - Romantic Piano",
    autoPlayOnOpen: true,
    defaultVolume: 0.75
  },

  // Popping Photo Memories (Shown when envelope opens & in Gallery)
  photos: [
    {
      src: "assets/images/couple-1.jpg",
      caption: "Where our journey began ✨",
      date: "Spring 2022",
      rotation: "-5deg"
    },
    {
      src: "assets/images/couple-2.jpg",
      caption: "She said YES! 💍 Under the stars",
      date: "Summer 2024",
      rotation: "4deg"
    },
    {
      src: "assets/images/couple-3.jpg",
      caption: "Unfiltered smiles & golden hour",
      date: "Autumn 2025",
      rotation: "-3deg"
    },
    {
      src: "assets/images/couple-4.jpg",
      caption: "Forever starts today 🥂",
      date: "The Big Day",
      rotation: "6deg"
    }
  ],

  // Event Schedule / Itinerary
  schedule: [
    {
      time: "3:30 PM",
      title: "Guest Arrival & Welcome Drinks",
      desc: "Champagne, sparkling mocktails, and classical quartet on the terrace.",
      icon: "glass-cheers"
    },
    {
      time: "4:30 PM",
      title: "The Holy Vows Ceremony",
      desc: "Exchange of rings & wedding vows in the Rose Garden Pavilion.",
      icon: "heart"
    },
    {
      time: "6:00 PM",
      title: "Cocktail Hour & Hors d'Oeuvres",
      desc: "Signature cocktails, acoustic jazz, and sunset photo sessions.",
      icon: "cocktail"
    },
    {
      time: "7:30 PM",
      title: "Grand Reception & Dinner",
      desc: "Gourmet multi-course banquet, toasts, and cake cutting celebration.",
      icon: "utensils"
    },
    {
      time: "9:30 PM",
      title: "First Dance & Late Night Party",
      desc: "Dancing with the live band, dessert stations, and sparkler send-off.",
      icon: "music"
    }
  ],

  // Dress Code
  dressCode: {
    title: "Black Tie Optional / Elegant Pastel",
    description: "We invite you to celebrate in graceful evening wear. Think blush, champagne, sage, navy, and earth tones.",
    palette: [
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Blush Rose", hex: "#E8C5C8" },
      { name: "Sage Green", hex: "#A3B18A" },
      { name: "Soft Cream", hex: "#FDFBF7" },
      { name: "Midnight Navy", hex: "#2B3A42" }
    ]
  },

  // RSVP Configuration
  rsvp: {
    deadline: "September 30, 2026",
    contactEmail: "wedding@sophiaandalex.com",
    contactPhone: "+1 (555) 345-6789"
  }
};
