import type { CatalogueGarment, ServiceCategory, ServiceId } from "@/common/services";

/**
 * Textes de la landing page (français).
 * Ton : tutoiement, phrases courtes, chaleureux et direct (section 4).
 * Les mots entre *astérisques* passent en italique d'accent.
 * Typographie française : espace insécable (U+00A0) avant ? : % € et dans « ».
 * Les autres langues (es, en, ca) reprendront exactement cette forme.
 */
export const fr = {
  locale: "fr",

  meta: {
    title: "Kadel Kouture — Réparation et retouche de vêtements à Barcelone",
    description:
      "Répare, ajuste ou personnalise tes vêtements avec des couturiers de Barcelone. Tu commandes en ligne, tu déposes en point relais, livraison aller-retour incluse.",
  },

  skipLink: "Aller au contenu",

  nav: {
    label: "Navigation principale",
    menu: "Menu",
    home: "Kadel Kouture, accueil",
    how: "Comment ça marche",
    workshops: "Nos ateliers",
    join: "Devenir atelier partenaire",
    brands: "Marques",
    order: "Commander",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },

  announcement: {
    label: "Tarif fondateur",
    text: "−{discount} % sur ta première réparation, réservé aux {limit} premières commandes.",
    short: "−{discount} % sur ta première réparation.",
    remaining: "Plus que {count} places",
    soldOut: "Livraison aller-retour en point relais incluse.",
    cta: "Commander",
  },

  hero: {
    eyebrow: "Réparation · Retouche · Personnalisation",
    title: ["Tes vêtements", "préférés", "méritent une", "*deuxième vie.*"],
    subtitle:
      "Réparation, retouche et personnalisation par des couturiers de Barcelone. Tu déposes près de chez toi, on s'occupe du reste.",
    cta: "Commander",
    secondary: "Voir comment ça marche",
    coordinates: "Barcelona — 41°23′N 2°10′E",
    scroll: "Défile",
    art: {
      alt: "Illustration : une chemise rayée suspendue dans une arche en terre cuite. Un bouton manque, une aiguille et son fil s'apprêtent à le recoudre.",
      number: "N° 001",
      title: "La chemise préférée",
      detail: "Coton rayé, un bouton perdu.",
      verdict: "Réparable.",
    },
  },

  problem: {
    index: "01",
    label: "Le placard",
    story:
      "Ce jean que tu adores, avec la poche décousue. Cette robe chinée un peu trop longue. Tu te dis que tu passeras chez la retoucheuse. Et elle est toujours au fond du placard.",
    aside: "On dirait que ce jean, tu l'aimes trop pour le jeter.",
    replace: "Le remplacer coûterait",
    replacePrice: "80 €",
    repair: "Le réparer, à partir de",
    repairPrice: "12 €",
  },

  how: {
    index: "02",
    label: "Le geste",
    title: ["Cinq étapes.", "*Aucun rendez-vous.*"],
    intro:
      "Tu te dis sûrement que ta retoucheuse fait pareil. Sauf qu'ici, pas d'horaires de boutique : tu déposes ton colis dans un point relais près de chez toi, quand ça t'arrange.",
    steps: [
      {
        title: "Choisis ta prestation",
        text: "Réparer, ajuster, personnaliser ou transformer : dis-nous ce que ton vêtement attend.",
        alt: "Illustration : une étiquette de vêtement sur fond moutarde.",
      },
      {
        title: "Choisis ton atelier",
        text: "Des couturiers de Barcelone, vérifiés et notés par les clients.",
        alt: "Illustration : une machine à coudre dans une arche.",
      },
      {
        title: "Scanne tes mensurations",
        text: "Deux photos avec ton téléphone, et l'atelier a tes mesures.",
        alt: "Illustration : un téléphone qui mesure une silhouette.",
      },
      {
        title: "Dépose ton colis en point relais",
        text: "Casier InPost, Correos, SEUR ou GLS : le point le plus proche de chez toi.",
        alt: "Illustration : un casier de point relais ouvert avec un colis.",
      },
      {
        title: "Récupère ton vêtement transformé",
        text: "Il revient dans ton point relais. Le transporteur te prévient dès qu'il est arrivé.",
        alt: "Illustration : une robe sur un cintre devant un soleil.",
      },
    ],
    outro: {
      title: ["On commence", "par *laquelle* ?"],
      cta: "Commander",
    },
  },

  services: {
    index: "03",
    label: "Le catalogue",
    title: ["Quelle pièce", "on *sauve* aujourd'hui ?"],
    pick: "Choisis ton vêtement",
    garments: {
      pantalon: "Pantalon",
      robe: "Robe",
      veste: "Veste",
      jean: "Jean",
      autre: "Autre",
    } satisfies Record<CatalogueGarment, string>,
    anchor: {
      pantalon: "Un pantalon neuf",
      robe: "Une robe neuve",
      veste: "Une veste neuve",
      jean: "Un jean neuf",
      autre: "Un haut neuf",
    } satisfies Record<CatalogueGarment, string>,
    repairFrom: "Le réparer, dès",
    artAlt: {
      pantalon: "Illustration : un pantalon bleu canard sur un cintre.",
      robe: "Illustration : une robe moutarde sur fond vert profond.",
      veste: "Illustration : une veste camel sur fond bleu ciel.",
      jean: "Illustration : un jean brut sur un cintre.",
      autre: "Illustration : une chemise rayée rouge et crème.",
    } satisfies Record<CatalogueGarment, string>,
    categories: {
      reparation: "Réparation",
      ajustement: "Ajustement",
      personnalisation: "Personnalisation",
      upcycling: "Upcycling",
    } satisfies Record<ServiceCategory, string>,
    items: {
      reprise: "Reprise d'un trou ou d'une couture",
      boutons: "Remplacement de boutons ou pressions",
      fermeture: "Remplacement de fermeture éclair",
      ourlet: "Ourlet pantalon ou jean",
      cintrer: "Cintrer une chemise ou un haut",
      reprendre: "Reprendre une robe ou une veste",
      broderie: "Broderie, initiales, motif",
      teinture: "Changement de couleur, teinture",
      transformation: "Transformation d'une pièce",
    } satisfies Record<ServiceId, string>,
    from: "dès",
    creativeTag: "Création",
    order: "Commander : {label}",
    notes: {
      delivery: "Prix « à partir de », livraison aller-retour en point relais incluse.",
      bundle: "Ajoute une 2e pièce : la livraison est déjà payée.",
      minimum: "Commande minimum : {amount} €.",
      quote:
        "L'atelier confirme le prix final à réception. S'il dépasse le prix affiché de plus de {percent} %, tu annules et tu récupères ton vêtement gratuitement.",
    },
    creative: {
      title: ["Et si on allait", "*plus loin ?*"],
      personalise: {
        title: "Personnalise",
        text: "Tes initiales sur un col, un motif brodé dans le dos, une couleur qui change tout.",
        cta: "Personnaliser une pièce",
        alt: "Illustration : le dos d'une veste en jean brodé d'un soleil moutarde et rouge.",
      },
      transform: {
        title: "Transforme",
        text: "La pièce que tu ne portes plus devient celle que tu ne quittes plus.",
        cta: "Transformer une pièce",
        alt: "Illustration : une veste refaite en patchwork de tissus colorés.",
      },
    },
  },

  beforeAfter: {
    index: "04",
    label: "Les preuves",
    title: ["Avant,", "*après.*"],
    intro: "Glisse le fil pour comparer.",
    before: "Avant",
    after: "Après",
    slider: "Comparer avant et après : {title}",
    items: [
      {
        kind: "ourlet",
        title: "Ourlet de jean",
        detail: "Ajustement",
        description:
          "Avant : un jean trop long qui fait des plis sur la chaussure. Après : un ourlet net, à la bonne longueur.",
      },
      {
        kind: "robe",
        title: "Robe cintrée",
        detail: "Ajustement",
        description: "Avant : une robe droite et trop large. Après : la taille est marquée, la robe tombe juste.",
      },
      {
        kind: "veste",
        title: "Veste personnalisée",
        detail: "Personnalisation",
        description: "Avant : une veste en jean unie. Après : un soleil brodé dans le dos et une frise de petites croix.",
      },
    ] as const,
  },

  workshops: {
    index: "05",
    label: "Les mains",
    title: ["Des couturiers", "qu'on a *choisis.*"],
    text: "Chaque atelier du réseau est vérifié avant de recevoir sa première commande. Ensuite, ce sont tes avis qui parlent.",
    criteria: [
      "Identité et numéro fiscal vérifiés",
      "Réalisations examinées une par une",
      "Charte qualité Kadel Kouture signée",
      "Une note des clients après chaque commande",
    ],
    saved: "{count} vêtements sauvés",
    savedCaption: "et ce n'est qu'un début",
    join: "Tu es couturier ? Rejoins le réseau",
    artAlt:
      "Illustration : un atelier de couture, une machine sur une table en bois devant une fenêtre en arche, des bobines et un mètre ruban.",
    marquee: [
      "Ourlets",
      "Reprises",
      "Fermetures éclair",
      "Boutons",
      "Broderie",
      "Teinture",
      "Upcycling",
      "Retouches",
    ],
  },

  story: {
    index: "06",
    label: "L'origine",
    title: ["Le Mali, Paris,", "Barcelone.", "*Un même fil.*"],
    paragraphs: [
      "Kadel Kouture, c'est l'histoire de Kadja : des racines au Mali, une vie à Barcelone, et la conviction qu'un vêtement aimé ne se jette pas.",
      "Il se répare, il s'ajuste, il se transforme. Renew, don't replace : trois mots pour une communauté qui préfère faire durer ce qu'elle aime.",
    ],
    signature: "Kadja",
    signatureRole: "à l'origine de Kadel Kouture",
    posters: {
      mali: { alt: "Affiche : MALI, motifs bogolan crème sur fond brun.", caption: "Mali — bogolan" },
      paris: { alt: "Affiche : PARIS, la tour Eiffel sous un ciel bleu.", caption: "Paris" },
      barcelona: {
        alt: "Affiche : BARCELONA, les tours de la Sagrada Família sur fond moutarde.",
        caption: "Barcelone",
      },
    },
  },

  guarantee: {
    index: "07",
    label: "La promesse",
    title: ["Pas satisfait du résultat ?", "On reprend la retouche *gratuitement.*"],
    seal: "Renew, don't replace · Garantie retouche · ",
    sealCenter: "Garantie",
    pillars: [
      {
        icon: "lock",
        title: "Paiement sécurisé",
        text: "Paiement par Stripe et récapitulatif complet avant de payer. Aucun frais caché.",
      },
      {
        icon: "route",
        title: "Suivi à chaque étape",
        text: "Un lien de suivi, du dépôt jusqu'au retour dans ton point relais.",
      },
      {
        icon: "shield",
        title: "Vêtement assuré",
        text: "Pendant le transport et à l'atelier.",
      },
    ] as const,
    fine: "La retouche est reprise gratuitement si le résultat ne correspond pas aux consignes et aux mensurations transmises.",
  },

  faq: {
    index: "08",
    label: "Les questions",
    title: ["Tes questions,", "*nos réponses.*"],
    items: [
      {
        q: "Où est-ce que je dépose mon colis ?",
        a: "Dans le point relais de ton choix : casier InPost, bureau Correos, commerce SEUR ou GLS. Tu le choisis sur une carte au moment de commander, près de chez toi ou de ton travail. Les casiers s'ouvrent avec un QR code, sans dépendre des horaires d'un commerce.",
      },
      {
        q: "Comment j'emballe mon vêtement ?",
        a: "Un sac ou un carton bien fermé suffit. Tu reçois par email ton étiquette (ou ton QR code) et les consignes d'emballage.",
      },
      {
        q: "Quelles matières acceptez-vous ?",
        a: "Coton, denim, lin, laine, soie, synthétiques… Pour le cuir ou une pièce très délicate, précise-le dans ta commande avec des photos : l'atelier confirme avant de commencer.",
      },
      {
        q: "Comment marche le scan de mes mensurations ?",
        a: "Tu prends deux photos avec ton téléphone, de face et de profil, et on calcule tes mensurations. Le scan est demandé pour un ajustement ou une personnalisation, facultatif pour une réparation simple. Tu peux aussi saisir tes mesures à la main. Tes photos et tes mesures ne sont utilisées qu'avec ton accord, pour ta commande.",
      },
      {
        q: "Comment je suis mon colis ?",
        a: "Tu reçois un lien de suivi par email. Le transporteur te prévient à chaque étape : dépôt, arrivée à l'atelier, retour dans ton point relais.",
      },
      {
        q: "Et si mon vêtement est abîmé ?",
        a: "Ton vêtement est assuré pendant le transport et à l'atelier. Et si le résultat ne correspond pas à tes consignes, on reprend la retouche gratuitement.",
      },
      {
        q: "Et si le prix final est plus élevé ?",
        a: "Le prix affiché est indicatif : l'atelier le confirme à réception de ton vêtement. S'il dépasse le prix affiché de plus de 15 %, tu peux annuler et récupérer ton vêtement gratuitement.",
      },
      {
        q: "Combien de temps je reste sans mon vêtement ?",
        a: "Le délai indicatif s'affiche avant de payer, selon la prestation et l'atelier choisis. Ensuite, tu suis ton colis à chaque étape.",
      },
    ],
  },

  finalCta: {
    title: ["Ton vêtement mérite", "mieux que le", "*fond du placard.*"],
    founder: "Tarif fondateur : −{discount} % sur ta première commande.",
    remaining: "places restantes sur {limit}",
    soldOut: "Le tarif fondateur est terminé. Merci aux premiers à nous avoir fait confiance.",
    cta: "Commander",
  },

  lead: {
    title: "Tu hésites encore ?",
    text: "Reçois gratuitement le guide « 5 réparations qui sauvent ton dressing ».",
    channelLabel: "Recevoir le guide par",
    email: "Email",
    whatsapp: "WhatsApp",
    emailLabel: "Ton email",
    whatsappLabel: "Ton numéro WhatsApp",
    emailPlaceholder: "ton@email.com",
    whatsappPlaceholder: "+34 600 000 000",
    consent:
      "J'accepte de recevoir ce guide et quelques conseils de Kadel Kouture. Désinscription en un clic.",
    submit: "Recevoir le guide",
    sending: "Envoi…",
    success: "C'est noté ! Ton guide arrive bientôt.",
    error: "Oups, ça n'a pas marché. Réessaie dans un instant.",
    invalidEmail: "Vérifie ton adresse email.",
    invalidPhone: "Vérifie ton numéro (avec l'indicatif, ex. +34).",
    consentRequired: "Coche la case pour recevoir le guide.",
  },

  join: {
    label: "Le réseau",
    title: ["Tu es couturier", "ou atelier à", "*Barcelone ?*"],
    text: "Rejoins le réseau Kadel Kouture. Tu reçois des commandes avec photos, mensurations et consignes claires, et le colis arrive directement à ton atelier.",
    cta: "Rejoindre le réseau",
    artAlt: "Illustration : une machine à coudre dans une arche.",
  },

  brands: {
    label: "Marques",
    title: ["Tu es", "une *marque ?*"],
    text: "Offre la réparation à tes clients sans rien construire. Dis-nous ce que tu imagines, on revient vers toi.",
    fields: {
      name: "Ton nom",
      brand: "Ta marque",
      email: "Email professionnel",
      need: "Ton besoin",
    },
    needPlaceholder: "Ex. : proposer la réparation de nos jeans à nos clients en Espagne",
    submit: "Envoyer",
    sending: "Envoi…",
    success: "Merci ! On revient vers toi rapidement.",
    error: "Oups, ça n'a pas marché. Réessaie dans un instant.",
    invalid: "Vérifie les champs : tous sont nécessaires.",
  },

  footer: {
    tagline: "Renew, don't replace.",
    columns: [
      {
        title: "Le service",
        links: [
          { label: "Comment ça marche", href: "#comment-ca-marche" },
          { label: "Prestations et prix", href: "#prestations" },
          { label: "Nos ateliers", href: "#ateliers" },
          { label: "Questions fréquentes", href: "#faq" },
        ],
      },
      {
        title: "Rejoindre",
        links: [
          { label: "Devenir atelier partenaire", href: "/devenir-atelier" },
          { label: "Espace marques", href: "#marques" },
        ],
      },
      {
        title: "Informations",
        links: [
          { label: "Mentions légales", href: "/mentions-legales" },
          { label: "Conditions générales de vente", href: "/cgv" },
          { label: "Politique de confidentialité", href: "/confidentialite" },
        ],
      },
    ],
    cities: "Mali · Paris · Barcelone",
    rights: "Tous droits réservés.",
  },

  sticky: {
    cta: "Commander",
    note: "Livraison en point relais incluse",
  },

  joinPage: {
    meta: {
      title: "Devenir atelier partenaire — Kadel Kouture",
      description:
        "Couturier ou atelier à Barcelone ? Rejoins le réseau Kadel Kouture et reçois des commandes avec photos, mensurations et consignes claires.",
    },
    label: "Ateliers partenaires",
    title: ["Le réseau", "*s'agrandit.*"],
    text: "Le formulaire d'inscription des ateliers ouvre très bientôt. Laisse ton email ou ton WhatsApp : on te prévient dès qu'il est en ligne.",
    leadTitle: "Être prévenu",
    leadText: "Un seul message, le jour de l'ouverture.",
    leadSubmit: "Me prévenir",
    leadConsent: "J'accepte d'être contacté par Kadel Kouture au sujet du réseau d'ateliers.",
    back: "Retour à l'accueil",
  },
};

export type LandingCopy = typeof fr;
