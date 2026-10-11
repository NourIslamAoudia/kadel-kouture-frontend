import type { GarmentType, WorkType } from "../types";

/**
 * Textes du parcours de commande — français (langue de référence).
 * Les mots entre *astérisques* passent en italique d'accent.
 * Les autres langues (es, en, ca) reprennent exactement cette forme.
 */
const pieces = (n: number) => `${n} ${n > 1 ? "pièces" : "pièce"}`;

export const fr = {
  lang: "fr",
  price: (amount: number) => `${amount}\u00A0€`,

  nav: {
    back: "Retour",
    language: "Langue",
    next: "Continuer",
    addPiece: "Ajouter la pièce",
    savePiece: "Enregistrer la pièce",
    toMeasures: "Passer aux mesures",
    send: "Envoyer la demande",
    sending: "Envoi en cours…",
    total: "Total estimé",
    pieces,
  },

  garments: {
    pantalon: "Pantalon",
    veste: "Veste",
    robe: "Robe",
    chemise: "Chemise",
    manteau: "Manteau",
    autre: "Autre",
  } satisfies Record<GarmentType, string>,

  works: {
    retouche: {
      label: "Retouche",
      description: "Ourlets, ajustements, coutures",
    },
    reparation: {
      label: "Réparation",
      description: "Trous, fermetures éclair, boutons",
    },
    personnalisation: {
      label: "Personnalisation",
      description: "Broderies, impressions, logos",
    },
    upcycling: { label: "Upcycling", description: "Transformation créative" },
  } satisfies Record<WorkType, { label: string; description: string }>,

  garment: {
    eyebrow: (n: number) => `Pièce n° ${n}`,
    title: "Que souhaitez-vous *transformer* ?",
    subtitle: "Choisissez le produit à confectionner ou ajuster.",
    from: "dès",
    otherLabel: "Précisez le vêtement",
    otherPlaceholder: "Ex. : combinaison, écharpe…",
  },

  work: {
    eyebrow: (n: number) => `Prestation · Pièce n° ${n}`,
    title: "Quel type de *travail* ?",
    subtitle: (garmentPrice: string) =>
      `Sélectionnez la prestation souhaitée. Le tarif de la pièce est l'addition du produit (${garmentPrice}) et du service.`,
    pieceTotal: "Total pièce\u00A0:",
    product: "Produit",
    detailLabel: "Détail pour cette pièce (optionnel)",
    detailPlaceholder: "Ex. : raccourcir de 4 cm, changer la fermeture…",
  },

  items: {
    eyebrow: "Récapitulatif des pièces",
    title: (n: number) => `Vos *commandes* (${n})`,
    subtitle:
      "Vérifiez vos pièces ou ajoutez-en d'autres avant de passer aux mesures.",
    product: "Produit\u00A0:",
    edit: "Modifier",
    remove: "Supprimer",
    add: "Ajouter un autre vêtement",
    total: (n: number) => `Total estimé (${pieces(n)})`,
    note: "Tarif transparent selon la grille d'atelier",
  },

  method: {
    eyebrow: "Mesures",
    title: "Comment souhaitez-vous *être mesuré* ?",
    subtitle: "Choisissez la méthode la plus pratique pour vous.",
    manual: { label: "Manuel", description: "Introduire mes mesures" },
    photo: { label: "Photo 3D", description: "Détection automatique" },
  },

  measures: {
    eyebrow: "Mesures manuelles",
    title: "Vos *mensurations*",
    info: "Indiquez vos mesures en centimètres. Si vous ne les connaissez pas, choisissez plutôt l'option photo.",
    fields: {
      chest: "Poitrine",
      waist: "Taille",
      hips: "Hanches",
      height: "Hauteur",
      shoulders: "Épaules",
      sleeve: "Manche",
    },
  },

  photo: {
    eyebrow: "Photo 3D",
    title: "Vos mesures, *automatiquement*",
    subtitle:
      "Ajoutez une photo de face et une photo de profil : le moteur calcule vos mesures.",
    height: "Taille (cm)",
    model: "Modèle",
    models: { neutral: "Neutre", female: "Femme", male: "Homme" },
    heightError: "La taille doit être comprise entre 100 et 230 cm.",
    computeError: "Erreur lors du calcul des mesures.",
    processingTitle: "Analyse en cours…",
    processingText: "Le moteur calcule vos mesures.",
  },

  upload: {
    label: "Photos requises",
    title: "Deux vues de votre silhouette",
    text: "Ajoutez une photo de face et une photo de profil. Elles sont envoyées ensemble au moteur de mesure.",
    examplesTitle: "Exemples de photos attendues",
    examplesText: "Votre pose doit ressembler à cet exemple",
    exampleFemale: "Exemple modèle femme",
    exampleMale: "Exemple modèle homme",
    guidanceStrong: "Important pour un meilleur résultat",
    guidance:
      "prenez une photo de face et une photo de profil, avec le corps entier visible. Portez des vêtements ajustés, près du corps, et non des vêtements larges.",
    front: {
      title: "Vue de face",
      description: "Pieds joints, bras légèrement écartés",
    },
    side: {
      title: "Vue de profil",
      description: "Tournez-vous à 90°, posture naturelle",
    },
    ready: "Prêt",
    preview: (title: string) => `Aperçu : ${title}`,
    replace: "Remplacer",
    removePhoto: (title: string) => `Supprimer : ${title}`,
    drop: "Déposer ou choisir une image",
    formats: "JPG, PNG ou WebP",
    back: "Retour",
    start: "Lancer le scan",
    missing: "Ajoutez les deux photos",
  },

  sheet: {
    label: "Fiche atelier",
    title: "Mesures essentielles",
    copy: "Copier",
    copied: "Copié",
    unavailable: "Non disponible",
    footnote: (ref: string) =>
      `Résultats filtrés du modèle 3D · Référence ${ref}`,
  },

  client: {
    eyebrow: "Vos coordonnées",
    title: "Pour vous *recontacter*",
    subtitle: "Ces informations servent uniquement au suivi de votre commande.",
    fullName: "Nom complet",
    fullNamePlaceholder: "Maria García",
    phone: "Téléphone",
    phonePlaceholder: "+34 6xx xxx xxx",
    email: "Email",
    emailPlaceholder: "vous@email.com",
    comment: "Commentaire libre (optionnel)",
    commentPlaceholder: "Précisez tout détail utile pour l'atelier…",
  },

  zone: {
    eyebrow: "Logistique",
    title: "Votre *point relais*",
    subtitle:
      "Déposez votre vêtement près de chez vous : cherchez par adresse ou code postal, ou utilisez votre position.",
    searchLabel: "Adresse ou code postal",
    searchPlaceholder: "Ex. : 75004, Paris",
    search: "Rechercher",
    useLocation: "Utiliser ma position",
    locating: "Localisation…",
    tooShort: "Saisissez au moins 3 caractères.",
    dropOff: "Points relais",
    selected: "Point choisi",
    yourPosition: "Vous",
    yourAddress: "Votre adresse",
    mapHint:
      "Cherchez une adresse ou utilisez votre position pour voir les points relais autour de vous.",
    loading: "Recherche des points relais…",
    error: "Impossible de charger les points relais.",
    retry: "Réessayer",
    notFound: "Adresse introuvable. Vérifiez-la ou utilisez votre position.",
    empty:
      "Aucun point relais trouvé près de cette adresse. Le service est disponible en France.",
    geoDenied: "Autorisez la localisation dans votre navigateur ou saisissez une adresse.",
    geoUnavailable: "Votre position est indisponible pour le moment. Saisissez une adresse.",
    geoTimeout: "La localisation a pris trop de temps. Réessayez ou saisissez une adresse.",
    geoUnsupported: "La localisation n'est pas disponible sur cet appareil. Saisissez une adresse.",
    locker: "Consigne",
    openToday: (hours: string) => `Aujourd'hui · ${hours}`,
    closedToday: "Fermé aujourd'hui",
    /** 340 m, 1,2 km… */
    distance: (meters: number) =>
      meters < 1000
        ? `${Math.round(meters / 10) * 10}\u00A0m`
        : `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 }).format(meters / 1000)}\u00A0km`,
  },

  errors: {
    garment: "Choisissez un type de vêtement.",
    garmentOther: "Précisez le type de vêtement.",
    work: "Choisissez le type de travail.",
    items: "Ajoutez au moins une pièce à votre commande.",
    method: "Choisissez une méthode de mesure.",
    photo: "Ajoutez les deux photos et lancez l'analyse.",
    measures:
      "Vérifiez vos mesures : les valeurs doivent être réalistes et en cm.",
    fullName: "Saisissez votre nom complet.",
    phone: "Saisissez un numéro de téléphone valide.",
    email: "Saisissez une adresse email valide.",
    zone: "Choisissez un point relais.",
    generic: "Une erreur est survenue. Réessayez dans un instant.",
  },

  done: {
    title: "Demande *confirmée* !",
    text: (count: string, total: string) =>
      `Votre commande de ${count} pour un total estimé de ${total} a bien été enregistrée. Nous vous recontacterons rapidement pour finaliser les détails.`,
  },
};

export type OrderDictionary = typeof fr;
