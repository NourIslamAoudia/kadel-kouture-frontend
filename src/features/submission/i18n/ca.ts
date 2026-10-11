import type { OrderDictionary } from "./fr";

/** Textos de la comanda — català. A revisar per un parlant nadiu. */
const pieces = (n: number) => `${n} ${n > 1 ? "peces" : "peça"}`;

export const ca: OrderDictionary = {
  lang: "ca",
  price: (amount: number) => `${amount}\u00A0€`,

  nav: {
    back: "Tornar",
    language: "Idioma",
    next: "Continuar",
    addPiece: "Afegir la peça",
    savePiece: "Desar la peça",
    toMeasures: "Anar a les mides",
    send: "Enviar la sol·licitud",
    sending: "Enviant…",
    total: "Total estimat",
    pieces,
  },

  garments: {
    pantalon: "Pantalons",
    veste: "Jaqueta",
    robe: "Vestit",
    chemise: "Camisa",
    manteau: "Abric",
    autre: "Altres",
  },

  works: {
    retouche: {
      label: "Arranjament",
      description: "Baixos, ajustos, costures",
    },
    reparation: {
      label: "Reparació",
      description: "Forats, cremalleres, botons",
    },
    personnalisation: {
      label: "Personalització",
      description: "Brodats, estampats, logotips",
    },
    upcycling: { label: "Upcycling", description: "Transformació creativa" },
  },

  garment: {
    eyebrow: (n: number) => `Peça núm. ${n}`,
    title: "Què vols *transformar*?",
    subtitle: "Tria la peça que vols confeccionar o ajustar.",
    from: "des de",
    otherLabel: "Indica la peça",
    otherPlaceholder: "Ex.: granota, bufanda…",
  },

  work: {
    eyebrow: (n: number) => `Servei · Peça núm. ${n}`,
    title: "Quin tipus de *feina*?",
    subtitle: (garmentPrice: string) =>
      `Tria el servei. El preu de la peça és la suma del producte (${garmentPrice}) i del servei.`,
    pieceTotal: "Total peça:",
    product: "Producte",
    detailLabel: "Detall per a aquesta peça (opcional)",
    detailPlaceholder: "Ex.: escurçar 4 cm, canviar la cremallera…",
  },

  items: {
    eyebrow: "Resum de les peces",
    title: (n: number) => `Les teves *comandes* (${n})`,
    subtitle:
      "Revisa les teves peces o afegeix-ne d'altres abans de passar a les mides.",
    product: "Producte:",
    edit: "Modificar",
    remove: "Eliminar",
    add: "Afegir una altra peça",
    total: (n: number) => `Total estimat (${pieces(n)})`,
    note: "Preu transparent segons la tarifa del taller",
  },

  method: {
    eyebrow: "Mides",
    title: "Com vols *prendre les teves mides*?",
    subtitle: "Tria el mètode més pràctic per a tu.",
    manual: { label: "Manual", description: "Introduir les meves mides" },
    photo: { label: "Foto 3D", description: "Detecció automàtica" },
  },

  measures: {
    eyebrow: "Mides manuals",
    title: "Les teves *mides*",
    info: "Indica les teves mides en centímetres. Si no les saps, tria millor l'opció de foto.",
    fields: {
      chest: "Pit",
      waist: "Cintura",
      hips: "Maluc",
      height: "Alçada",
      shoulders: "Espatlles",
      sleeve: "Màniga",
    },
  },

  photo: {
    eyebrow: "Foto 3D",
    title: "Les teves mides, *automàticament*",
    subtitle:
      "Afegeix una foto de cara i una de perfil: el motor calcula les teves mides.",
    height: "Alçada (cm)",
    model: "Model",
    models: { neutral: "Neutre", female: "Dona", male: "Home" },
    heightError: "L'alçada ha de ser entre 100 i 230 cm.",
    computeError: "Error en calcular les mides.",
    processingTitle: "Analitzant…",
    processingText: "El motor està calculant les teves mides.",
  },

  upload: {
    label: "Fotos necessàries",
    title: "Dues vistes de la teva silueta",
    text: "Afegeix una foto de cara i una de perfil. S'envien juntes al motor de mides.",
    examplesTitle: "Exemples de fotos",
    examplesText: "La teva postura s'ha d'assemblar a aquest exemple",
    exampleFemale: "Exemple model dona",
    exampleMale: "Exemple model home",
    guidanceStrong: "Important per a un millor resultat",
    guidance:
      "fes una foto de cara i una de perfil, amb tot el cos visible. Porta roba ajustada, cenyida al cos, i no roba ampla.",
    front: {
      title: "Vista de cara",
      description: "Peus junts, braços lleugerament separats",
    },
    side: {
      title: "Vista de perfil",
      description: "Gira't 90°, postura natural",
    },
    ready: "Llesta",
    preview: (title: string) => `Previsualització: ${title}`,
    replace: "Substituir",
    removePhoto: (title: string) => `Eliminar: ${title}`,
    drop: "Arrossega o tria una imatge",
    formats: "JPG, PNG o WebP",
    back: "Tornar",
    start: "Iniciar l'escaneig",
    missing: "Afegeix les dues fotos",
  },

  sheet: {
    label: "Fitxa del taller",
    title: "Mides essencials",
    copy: "Copiar",
    copied: "Copiat",
    unavailable: "No disponible",
    footnote: (ref: string) =>
      `Resultats filtrats del model 3D · Referència ${ref}`,
  },

  client: {
    eyebrow: "Les teves dades",
    title: "Per *contactar-te*",
    subtitle:
      "Aquestes dades només s'utilitzen per al seguiment de la teva comanda.",
    fullName: "Nom complet",
    fullNamePlaceholder: "Maria Garcia",
    phone: "Telèfon",
    phonePlaceholder: "+34 6xx xxx xxx",
    email: "Correu electrònic",
    emailPlaceholder: "tu@correu.com",
    comment: "Comentari lliure (opcional)",
    commentPlaceholder: "Indica qualsevol detall útil per al taller…",
  },

  zone: {
    eyebrow: "Logística",
    title: "La teva zona *a Barcelona*",
    subtitle: "Tria el teu barri i el punt de lliurament més pràctic.",
    pickZone: "Tria la teva zona",
    dropOff: "Punts de lliurament",
  },

  errors: {
    garment: "Tria un tipus de peça.",
    garmentOther: "Indica el tipus de peça.",
    work: "Tria el tipus de feina.",
    items: "Afegeix com a mínim una peça a la comanda.",
    method: "Tria un mètode de mesura.",
    photo: "Afegeix les dues fotos i inicia l'anàlisi.",
    measures:
      "Revisa les teves mides: els valors han de ser realistes i en cm.",
    fullName: "Escriu el teu nom complet.",
    phone: "Escriu un número de telèfon vàlid.",
    email: "Escriu una adreça de correu vàlida.",
    zone: "Tria una zona i un punt de lliurament.",
    generic: "S'ha produït un error. Torna-ho a provar d'aquí a un moment.",
  },

  done: {
    title: "Sol·licitud *confirmada*!",
    text: (count: string, total: string) =>
      `La teva comanda de ${count} per un total estimat de ${total} s'ha registrat. Et contactarem aviat per tancar els detalls.`,
  },
};
