import type { LandingDictionary } from "./fr";

/** Landing page copy — English. To be reviewed by a native speaker. */
export const en = {
  meta: {
    title:
      "Kadel Kouture — Clothing repair, alterations and customisation in Barcelona",
    description:
      "Repair, alter, customise or transform your clothes with partner ateliers in Barcelona. Order online, drop off at a collection point, return shipping included.",
    ogLocale: "en_GB",
  },

  skip: "Skip to content",

  carousel: { prev: "Previous", next: "Next" },

  announcement: {
    offer: "Founder offer — {discount}% off your first order",
    offerShort: "Founder offer: {discount}% off",
    limit: "for the first {limit} orders",
    remaining: "{count} places left",
    fallback: "Return shipping via collection points included",
    cta: "Order",
  },

  nav: {
    label: "Main navigation",
    home: "Kadel Kouture, home",
    how: "How it works",
    ateliers: "Our ateliers",
    brands: "For fashion brands",
    join: "Become a partner atelier",
    order: "Order",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },

  hero: {
    eyebrow: "Online alterations atelier · Barcelona",
    title: ["Your favourite clothes", "deserve a *second life.*"],
    subtitle:
      "Repair, alter, customise or transform your pieces with partner ateliers in Barcelona. Drop off your parcel near home — we take care of the rest.",
    cta: "Order",
    secondary: "How it works",
    videoLabel:
      "Four sunlit interiors, each home to a work of art: a Malian bogolan, Paris, Barcelona's Sagrada Família and a gold-leaf map of Mali.",
    scenes: ["Bogolan", "Paris", "Barcelona", "Mali"],
    pause: "Pause the video",
    play: "Play the video",
    scroll: "Discover",
  },

  story: {
    label: "Attachment",
    title: ["Some pieces", "are worth *keeping.*"],
    quote:
      "Those jeans you love, with the torn pocket. That thrifted dress, a little too long. You keep telling yourself you'll take them to the tailor. They're still at the back of the wardrobe.",
    aside: "It sounds like you love those jeans too much to throw them away.",
    body: "A beloved garment carries the trace of a journey, an encounter, a lucky find. Repairing it means continuing its story rather than replacing it.",
    imageAlt:
      "A bright Parisian interior: a dressmaker's mannequin beside a fireplace, beneath an Eiffel Tower poster.",
    secondaryAlt: "A framed Malian bogolan above a wooden sideboard.",
    caption: "Paris — the atelier in the light",
  },

  problem: {
    label: "The problem, the solution",
    title: ["What keeps you from wearing them.", "*What we do about it.*"],
    problemHead: "What gets in the way",
    solutionHead: "Our answer",
    rows: [
      {
        problem: "A snag, a lost button, a seam coming apart.",
        solution: "A careful repair by a verified atelier, from {reparation}.",
      },
      {
        problem: "A piece that doesn't fit quite right.",
        solution: "An alteration made to your measurements, from {ajustement}.",
      },
      {
        problem: "A second-hand find that isn't quite your size.",
        solution:
          "Hemming, taking in, reshaping: the piece adapts to your silhouette.",
      },
      {
        problem: "Never any time to visit a tailor.",
        solution:
          "No appointment: drop your parcel at a collection point near home.",
      },
      {
        problem: "The wish for a piece no one else has.",
        solution:
          "Customisation from {personnalisation}, full transformation from {upcycling}.",
      },
    ],
    replace: "Replacing it would cost",
    repair: "Repairing it, from",
  },

  how: {
    label: "How it works",
    title: ["Five steps,", "*no appointment.*"],
    intro:
      "You may think your local tailor does the same. Except here there are no shop hours: everything happens online, and your parcel leaves from a collection point near home.",
    steps: [
      {
        title: "Choose your service",
        text: "Repair, alter, customise or transform. Add photos and your instructions.",
      },
      {
        title: "Select your atelier",
        text: "Verified Barcelona ateliers, with their speciality and their price for your service.",
      },
      {
        title: "Share your measurements",
        text: "Two photos from your phone or manual entry, when the service requires it.",
      },
      {
        title: "Drop off your parcel",
        text: "At the collection point of your choice: InPost, Correos, SEUR or GLS.",
      },
      {
        title: "Collect your garment",
        text: "It comes back to your collection point. You can follow every step of the journey.",
      },
    ],
    note: "The estimated turnaround is shown before you pay.",
    cta: "Order",
  },

  services: {
    label: "Services and prices",
    title: ["Craftsmanship,", "at a *fair price.*"],
    intro:
      "Starting prices, return shipping via collection points included. No surprise fees at checkout.",
    pick: "Your garment",
    garments: {
      pantalon: "Trousers",
      robe: "Dress",
      veste: "Jacket",
      jean: "Jeans",
      autre: "Other",
    },
    anchor: {
      pantalon: "New trousers",
      robe: "A new dress",
      veste: "A new jacket",
      jean: "New jeans",
      autre: "A new top",
    },
    repairFrom: "Repairing it, from",
    repairGroup: "Repair and alter",
    categories: {
      reparation: "Repair",
      ajustement: "Alteration",
      personnalisation: "Customisation",
      upcycling: "Upcycling",
    },
    items: {
      reprise: "Hole or seam repair",
      boutons: "Button or snap replacement",
      fermeture: "Zip replacement",
      ourlet: "Trouser or jeans hemming",
      cintrer: "Taking in a shirt or top",
      reprendre: "Dress or jacket alteration",
      broderie: "Embroidery, initials, motif",
      teinture: "Colour change, dyeing",
      transformation: "Upcycling a piece",
    },
    from: "from",
    order: "Order: {label}",
    create: {
      label: "Create",
      title: ["Customise,", "*transform.*"],
      text: "An embroidery, a colour, a new cut: the piece becomes yours, and no one else's.",
      imageAlt: "Detail of a Malian bogolan: hand-drawn geometric motifs.",
    },
    notes: {
      bundle: "Add a second piece: shipping is already paid.",
      minimum: "Minimum order: {amount}.",
      quote:
        "The atelier confirms the final price on receipt. If it exceeds the displayed price by more than {percent}%, you can cancel and get your garment back free of charge.",
    },
  },

  transformations: {
    label: "Before, after",
    title: ["The same garment.", "*Another story.*"],
    intro: "Three examples of transformations entrusted to the ateliers.",
    before: "Before",
    after: "After",
    items: [
      {
        title: "Jeans hem",
        category: "Alteration",
        before: "Too long, bunching over the shoe.",
        after: "A clean hem, at the right length.",
      },
      {
        title: "Fitted dress",
        category: "Alteration",
        before: "Straight and too wide.",
        after: "A defined waist, a dress that falls just right.",
      },
      {
        title: "Customised jacket",
        category: "Customisation",
        before: "A plain denim jacket.",
        after: "A motif embroidered on the back.",
      },
    ],
    disclaimer:
      "Illustrative drawings. Photos of the ateliers' work will be published with their owners' consent.",
  },

  ateliers: {
    label: "Our ateliers",
    title: ["Expert hands,", "*chosen one by one.*"],
    text: "Dressmaking, alterations, embroidery: every atelier in the network is verified before receiving its first order. After that, your reviews speak.",
    criteria: [
      {
        title: "Verified identity",
        text: "Tax number (NIF or CIF) and contact details checked.",
      },
      {
        title: "Proven craftsmanship",
        text: "Work reviewed piece by piece before approval.",
      },
      {
        title: "Quality charter signed",
        text: "Shared commitments on care, turnaround and communication.",
      },
      {
        title: "Rated by customers",
        text: "A rating and a review after every order.",
      },
    ],
    note: "The network is opening: each new atelier is marked “New atelier” until its first customer reviews.",
    illustrationAlt: "Line drawing of a sewing machine.",
  },

  founder: {
    label: "The origin",
    title: ["From Mali to Barcelona,", "*one single thread.*"],
    paragraphs: [
      "Kadel Kouture is Kadja's story: roots in Mali, a life in Barcelona, and the conviction that a beloved garment should never be thrown away.",
      "It can be repaired, altered, transformed. Renew, don't replace: three words for a community that prefers to make what it loves last.",
    ],
    signature: "Kadja",
    role: "The origin of Kadel Kouture",
    motto: "Renew, don't replace.",
    imageAlt:
      "A gold-leaf map of Mali on a black background, hanging in a bright interior.",
    secondaryAlt: "A framed Malian bogolan in a sunlit living room.",
    secondaryCaption: "Bogolan — Mali",
  },

  guarantee: {
    label: "Our commitments",
    title: ["Entrusting a beloved garment", "*takes trust.*"],
    items: [
      {
        title: "Free rework",
        text: "If the result doesn't match the instructions and measurements you provided.",
      },
      {
        title: "Garment protection",
        text: "Insured in transit and at the atelier, under the terms confirmed by our insurer.",
      },
      {
        title: "Free cancellation",
        text: "If the atelier's confirmed final price exceeds the displayed price by more than {percent}%.",
      },
    ],
    extras: [
      "Secure payment",
      "Full summary before you pay",
      "Parcel tracking at every step",
    ],
  },

  faq: {
    label: "Frequently asked questions",
    title: ["Everything", "*you're wondering.*"],
    items: [
      {
        q: "How do collection points work?",
        a: "When you order, you choose the nearest collection point on a map: an InPost locker, a Correos office, a SEUR or GLS shop. You drop off your parcel there with the label or QR code you receive by email, and your finished garment comes back to the same point.",
      },
      {
        q: "How should I pack my garment?",
        a: "A well-sealed bag or box is enough. Packing instructions arrive by email, together with your label.",
      },
      {
        q: "Which materials do you accept?",
        a: "Everyday materials: cotton, denim, linen, wool, silk, synthetics. For leather or a very delicate piece, mention it with photos: the atelier confirms before starting.",
      },
      {
        q: "How do I provide my measurements?",
        a: "With two photos taken on your phone, front and side, or by entering your measurements manually. They are required for alterations and customisation, optional for a simple repair, and only used with your consent, for your order.",
      },
      {
        q: "How can I track my parcel?",
        a: "You receive a tracking link by email. The carrier notifies you at every step: drop-off, arrival at the atelier, return to your collection point.",
      },
      {
        q: "What if my garment is damaged?",
        a: "Your garment is insured in transit and at the atelier, under the terms of our insurance. If the result doesn't match your instructions and measurements, the work is redone free of charge.",
      },
      {
        q: "Can I cancel or get a refund?",
        a: "The displayed price is an estimate: the atelier confirms it when your garment arrives. If it exceeds the displayed price by more than 15%, you can cancel free of charge and get your garment back. Other cases are covered in our terms and conditions of sale.",
      },
    ],
  },

  final: {
    title: ["Your garment deserves better", "than the *back of the wardrobe.*"],
    offer: "Founder offer: {discount}% off your first order.",
    remaining: "{count} of {limit} places left.",
    cta: "Order",
    imageAlt:
      "A bright interior in Barcelona, beneath a Sagrada Família poster.",
  },

  lead: {
    title: "Not ready yet?",
    text: "Get our free guide, “5 repairs that save your wardrobe”.",
    channelLabel: "Receive the guide by",
    email: "Email",
    whatsapp: "WhatsApp",
    emailLabel: "Your email",
    whatsappLabel: "Your WhatsApp number",
    emailPlaceholder: "you@email.com",
    whatsappPlaceholder: "+34 600 000 000",
    consent:
      "I agree to receive this guide and occasional advice from Kadel Kouture. Unsubscribe in one click.",
    submit: "Get the guide",
    sending: "Sending…",
    success: "Done. Your guide is on its way.",
    error: "Something went wrong. Please try again in a moment.",
    invalidEmail: "Please check your email address.",
    invalidPhone: "Please check your number, with the country code (e.g. +34).",
    consentRequired: "Tick the box to receive the guide.",
  },

  join: {
    label: "Partner ateliers",
    title: ["Do you run an atelier", "in *Barcelona?*"],
    text: "Join the Kadel Kouture network and receive orders from customers who want their clothes to last.",
    benefits: [
      "Clear orders: the customer's photos, measurements and instructions.",
      "Parcels delivered straight to your atelier.",
      "Your speciality highlighted to customers.",
    ],
    cta: "Join the network",
  },

  brands: {
    label: "For fashion brands",
    title: ["Offer repairs", "to your *customers.*"],
    text: "Are you a fashion brand? Offer a repair service to your customers without building anything: the atelier network and collection-point logistics are already in place.",
    fields: {
      name: "Your name",
      brand: "Your brand",
      email: "Work email",
      need: "What you need",
    },
    needPlaceholder: "E.g. offer repairs on our jeans to customers in Spain",
    submit: "Send",
    sending: "Sending…",
    success: "Thank you. We'll get back to you shortly.",
    error: "Something went wrong. Please try again in a moment.",
    invalid: "Please check the fields: all of them are required.",
  },

  footer: {
    tagline: "Renew, don't replace.",
    cities: "Mali · Paris · Barcelona",
    service: "The service",
    join: "Join",
    legal: "Information",
    language: "Language",
    links: {
      how: "How it works",
      services: "Services and prices",
      ateliers: "Our ateliers",
      faq: "FAQ",
      joinAtelier: "Become a partner atelier",
      brands: "For fashion brands",
      legalNotice: "Legal notice",
      terms: "Terms and conditions",
      privacy: "Privacy policy",
    },
    rights: "All rights reserved.",
  },

  sticky: {
    cta: "Order",
    note: "Collection-point shipping included",
  },
} satisfies LandingDictionary;
