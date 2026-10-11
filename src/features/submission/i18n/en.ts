import type { OrderDictionary } from "./fr";

/** Order flow copy — English. To be reviewed by a native speaker. */
const pieces = (n: number) => `${n} ${n > 1 ? "pieces" : "piece"}`;

export const en: OrderDictionary = {
  lang: "en",
  price: (amount: number) => `€${amount}`,

  nav: {
    back: "Back",
    language: "Language",
    next: "Continue",
    addPiece: "Add this piece",
    savePiece: "Save this piece",
    toMeasures: "Go to measurements",
    send: "Send my request",
    sending: "Sending…",
    total: "Estimated total",
    pieces,
  },

  garments: {
    pantalon: "Trousers",
    veste: "Jacket",
    robe: "Dress",
    chemise: "Shirt",
    manteau: "Coat",
    autre: "Other",
  },

  works: {
    retouche: { label: "Alteration", description: "Hems, fittings, seams" },
    reparation: { label: "Repair", description: "Holes, zips, buttons" },
    personnalisation: {
      label: "Customisation",
      description: "Embroidery, prints, logos",
    },
    upcycling: { label: "Upcycling", description: "Creative transformation" },
  },

  garment: {
    eyebrow: (n: number) => `Piece no. ${n}`,
    title: "What would you like to *transform*?",
    subtitle: "Choose the garment to make or alter.",
    from: "from",
    otherLabel: "Specify the garment",
    otherPlaceholder: "E.g. jumpsuit, scarf…",
  },

  work: {
    eyebrow: (n: number) => `Service · Piece no. ${n}`,
    title: "What kind of *work*?",
    subtitle: (garmentPrice: string) =>
      `Choose the service. The piece price is the garment (${garmentPrice}) plus the service.`,
    pieceTotal: "Piece total:",
    product: "Garment",
    detailLabel: "Details for this piece (optional)",
    detailPlaceholder: "E.g. shorten by 4 cm, replace the zip…",
  },

  items: {
    eyebrow: "Your pieces",
    title: (n: number) => `Your *order* (${n})`,
    subtitle: "Check your pieces or add more before moving on to measurements.",
    product: "Garment:",
    edit: "Edit",
    remove: "Remove",
    add: "Add another garment",
    total: (n: number) => `Estimated total (${pieces(n)})`,
    note: "Transparent pricing based on the atelier's rates",
  },

  method: {
    eyebrow: "Measurements",
    title: "How would you like to *be measured*?",
    subtitle: "Choose the most convenient method for you.",
    manual: { label: "Manual", description: "Enter my measurements" },
    photo: { label: "3D photo", description: "Automatic detection" },
  },

  measures: {
    eyebrow: "Manual measurements",
    title: "Your *measurements*",
    info: "Enter your measurements in centimetres. If you don't know them, choose the photo option instead.",
    fields: {
      chest: "Chest",
      waist: "Waist",
      hips: "Hips",
      height: "Height",
      shoulders: "Shoulders",
      sleeve: "Sleeve",
    },
  },

  photo: {
    eyebrow: "3D photo",
    title: "Your measurements, *automatically*",
    subtitle:
      "Add a front photo and a side photo: the engine calculates your measurements.",
    height: "Height (cm)",
    model: "Model",
    models: { neutral: "Neutral", female: "Woman", male: "Man" },
    heightError: "Height must be between 100 and 230 cm.",
    computeError: "Something went wrong while calculating your measurements.",
    processingTitle: "Analysing…",
    processingText: "The engine is calculating your measurements.",
  },

  upload: {
    label: "Required photos",
    title: "Two views of your silhouette",
    text: "Add a front photo and a side photo. They are sent together to the measurement engine.",
    examplesTitle: "Example photos",
    examplesText: "Your pose should look like this example",
    exampleFemale: "Example, woman model",
    exampleMale: "Example, man model",
    guidanceStrong: "For the best result",
    guidance:
      "take a front photo and a side photo with your whole body visible. Wear fitted clothes, close to the body, not loose ones.",
    front: {
      title: "Front view",
      description: "Feet together, arms slightly apart",
    },
    side: { title: "Side view", description: "Turn 90°, natural posture" },
    ready: "Ready",
    preview: (title: string) => `Preview: ${title}`,
    replace: "Replace",
    removePhoto: (title: string) => `Remove: ${title}`,
    drop: "Drop or choose an image",
    formats: "JPG, PNG or WebP",
    back: "Back",
    start: "Start the scan",
    missing: "Add both photos",
  },

  sheet: {
    label: "Atelier sheet",
    title: "Key measurements",
    copy: "Copy",
    copied: "Copied",
    unavailable: "Not available",
    footnote: (ref: string) =>
      `Filtered results from the 3D model · Reference ${ref}`,
  },

  client: {
    eyebrow: "Your details",
    title: "So we can *reach you*",
    subtitle: "These details are only used to follow up on your order.",
    fullName: "Full name",
    fullNamePlaceholder: "Maria García",
    phone: "Phone",
    phonePlaceholder: "+34 6xx xxx xxx",
    email: "Email",
    emailPlaceholder: "you@email.com",
    comment: "Additional comments (optional)",
    commentPlaceholder: "Any details that would help the atelier…",
  },

  zone: {
    eyebrow: "Logistics",
    title: "Your area *in Barcelona*",
    subtitle:
      "Choose your neighbourhood and the most convenient drop-off point.",
    pickZone: "Choose your area",
    dropOff: "Drop-off points",
  },

  errors: {
    garment: "Choose a type of garment.",
    garmentOther: "Specify the type of garment.",
    work: "Choose the type of work.",
    items: "Add at least one piece to your order.",
    method: "Choose a measurement method.",
    photo: "Add both photos and start the analysis.",
    measures: "Check your measurements: values must be realistic and in cm.",
    fullName: "Enter your full name.",
    phone: "Enter a valid phone number.",
    email: "Enter a valid email address.",
    zone: "Choose an area and a drop-off point.",
    generic: "Something went wrong. Please try again in a moment.",
  },

  done: {
    title: "Request *confirmed*!",
    text: (count: string, total: string) =>
      `Your order of ${count} for an estimated total of ${total} has been received. We'll be in touch shortly to finalise the details.`,
  },
};
