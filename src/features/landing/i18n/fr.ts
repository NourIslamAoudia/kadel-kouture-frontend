/**
 * Textes de la landing page — français (langue de référence).
 * Ton : tutoiement, phrases courtes, chaleureux et direct (cahier des charges, section 4).
 * Les mots entre *astérisques* passent en italique. {variables} : valeurs injectées.
 * Les autres langues (es, en, ca) reprennent exactement cette forme.
 */
export const fr = {
  meta: {
    title:
      "Kadel Kouture — Réparation, retouche et personnalisation de vêtements à Barcelone",
    description:
      "Répare, ajuste, personnalise ou transforme tes vêtements avec des ateliers partenaires de Barcelone. Commande en ligne, dépôt en point relais, livraison aller-retour incluse.",
    ogLocale: "fr_FR",
  },

  skip: "Aller au contenu",

  carousel: { prev: "Précédent", next: "Suivant" },

  announcement: {
    offer: "Offre fondateur — −{discount} % sur ta première commande",
    offerShort: "Offre fondateur : −{discount} %",
    limit: "réservée aux {limit} premières commandes",
    remaining: "Plus que {count} places",
    fallback: "Livraison aller-retour en point relais incluse",
    cta: "Commander",
  },

  nav: {
    label: "Navigation principale",
    home: "Kadel Kouture, accueil",
    how: "Comment ça marche",
    ateliers: "Nos ateliers",
    brands: "Marques",
    join: "Devenir atelier partenaire",
    order: "Commander",
    menu: "Menu",
    close: "Fermer",
    language: "Langue",
  },

  hero: {
    eyebrow: "Atelier de retouche en ligne · Barcelone",
    title: ["Tes vêtements préférés", "méritent une *deuxième vie.*"],
    subtitle:
      "Répare, ajuste, personnalise ou transforme tes pièces avec des ateliers partenaires de Barcelone. Tu déposes ton colis près de chez toi, on s'occupe du reste.",
    cta: "Commander",
    secondary: "Comment ça marche",
    videoLabel:
      "Quatre intérieurs baignés de lumière, chacun habité par une œuvre : un bogolan malien, Paris, la Sagrada Família de Barcelone et une carte du Mali à la feuille d'or.",
    scenes: ["Bogolan", "Paris", "Barcelone", "Mali"],
    pause: "Mettre la vidéo en pause",
    play: "Relancer la vidéo",
    scroll: "Découvrir",
  },

  story: {
    label: "L'attachement",
    title: ["Certaines pièces", "méritent d'être *gardées.*"],
    quote:
      "Ce jean que tu adores, avec la poche décousue. Cette robe chinée un peu trop longue. Tu te dis que tu passeras chez la retoucheuse. Et elle est toujours au fond du placard.",
    aside: "On dirait que ce jean, tu l'aimes trop pour le jeter.",
    body: "Un vêtement aimé garde la trace d'un voyage, d'une rencontre, d'une trouvaille. Le réparer, c'est continuer son histoire plutôt que la remplacer.",
    imageAlt:
      "Un intérieur parisien lumineux : un mannequin de couture près d'une cheminée, sous une affiche de la tour Eiffel.",
    secondaryAlt: "Un bogolan malien encadré au-dessus d'une console en bois.",
    caption: "Paris — l'atelier dans la lumière",
  },

  problem: {
    label: "Le problème, la solution",
    title: ["Ce qui t'empêche de les porter.", "*Ce que nous faisons.*"],
    problemHead: "Ce qui bloque",
    solutionHead: "Notre réponse",
    rows: [
      {
        problem: "Un accroc, un bouton perdu, une couture qui lâche.",
        solution:
          "Une réparation soignée par un atelier vérifié, à partir de {reparation}.",
      },
      {
        problem: "Une pièce qui ne tombe pas juste.",
        solution:
          "Un ajustement réalisé d'après tes mensurations, à partir de {ajustement}.",
      },
      {
        problem: "Une trouvaille de seconde main, pas tout à fait à ta taille.",
        solution:
          "Ourlet, cintrage, reprise : la pièce s'ajuste à ta silhouette.",
      },
      {
        problem: "Jamais le temps de passer chez la retoucheuse.",
        solution:
          "Aucun rendez-vous : tu déposes ton colis dans un point relais près de chez toi.",
      },
      {
        problem: "L'envie d'une pièce que personne d'autre n'a.",
        solution:
          "Personnalisation à partir de {personnalisation}, transformation complète à partir de {upcycling}.",
      },
    ],
    replace: "Le remplacer coûterait",
    repair: "Le réparer, à partir de",
  },

  how: {
    label: "Comment ça marche",
    title: ["Cinq étapes,", "*aucun rendez-vous.*"],
    intro:
      "Tu te dis sûrement que ta retoucheuse fait pareil. Sauf qu'ici, pas d'horaires de boutique : tout se fait en ligne, et ton colis part d'un point relais près de chez toi.",
    steps: [
      {
        title: "Choisis ta prestation",
        text: "Réparer, ajuster, personnaliser ou transformer. Ajoute des photos et tes consignes.",
      },
      {
        title: "Choisis ton atelier",
        text: "Des ateliers de Barcelone vérifiés, avec leur spécialité et leur prix pour ta prestation.",
      },
      {
        title: "Donne tes mensurations",
        text: "Deux photos depuis ton téléphone ou une saisie à la main, quand la prestation le demande.",
      },
      {
        title: "Dépose ton colis",
        text: "Dans le point relais de ton choix : InPost, Correos, SEUR ou GLS.",
      },
      {
        title: "Récupère ton vêtement",
        text: "Il revient dans ton point relais. Tu suis chaque étape du trajet.",
      },
    ],
    note: "Le délai indicatif s'affiche avant de payer.",
    cta: "Commander",
  },

  services: {
    label: "Prestations et prix",
    title: ["Le savoir-faire,", "au *juste prix.*"],
    intro:
      "Prix « à partir de », livraison aller-retour en point relais incluse. Aucun frais découvert au moment de payer.",
    pick: "Ton vêtement",
    garments: {
      pantalon: "Pantalon",
      robe: "Robe",
      veste: "Veste",
      jean: "Jean",
      autre: "Autre",
    },
    anchor: {
      pantalon: "Un pantalon neuf",
      robe: "Une robe neuve",
      veste: "Une veste neuve",
      jean: "Un jean neuf",
      autre: "Un haut neuf",
    },
    repairFrom: "Le réparer, à partir de",
    repairGroup: "Réparer et ajuster",
    categories: {
      reparation: "Réparation",
      ajustement: "Ajustement",
      personnalisation: "Personnalisation",
      upcycling: "Upcycling",
    },
    items: {
      reprise: "Reprise d'un trou ou d'une couture",
      boutons: "Remplacement de boutons ou pressions",
      fermeture: "Remplacement de fermeture éclair",
      ourlet: "Ourlet de pantalon ou de jean",
      cintrer: "Cintrer une chemise ou un haut",
      reprendre: "Reprendre une robe ou une veste",
      broderie: "Broderie, initiales, motif",
      teinture: "Changement de couleur, teinture",
      transformation: "Transformation d'une pièce",
    },
    from: "à partir de",
    order: "Commander : {label}",
    create: {
      label: "Créer",
      title: ["Personnaliser,", "*transformer.*"],
      text: "Une broderie, une couleur, une coupe nouvelle : la pièce devient la tienne, et celle de personne d'autre.",
      imageAlt:
        "Détail d'un bogolan malien : motifs géométriques tracés à la main.",
    },
    notes: {
      bundle: "Ajoute une deuxième pièce : la livraison est déjà payée.",
      minimum: "Commande minimum : {amount}.",
      quote:
        "L'atelier confirme le prix final à réception. S'il dépasse le prix affiché de plus de {percent} %, tu annules et tu récupères ton vêtement gratuitement.",
    },
  },

  transformations: {
    label: "Avant, après",
    title: ["Le même vêtement.", "*Une autre histoire.*"],
    intro: "Trois exemples de transformations confiées aux ateliers.",
    before: "Avant",
    after: "Après",
    items: [
      {
        title: "Ourlet de jean",
        category: "Ajustement",
        before: "Trop long, il plisse sur la chaussure.",
        after: "Un ourlet net, à la bonne longueur.",
      },
      {
        title: "Robe cintrée",
        category: "Ajustement",
        before: "Droite et trop large.",
        after: "La taille marquée, la robe tombe juste.",
      },
      {
        title: "Veste personnalisée",
        category: "Personnalisation",
        before: "Une veste en jean unie.",
        after: "Un motif brodé dans le dos.",
      },
    ],
    disclaimer:
      "Dessins d'illustration. Les photos de réalisations des ateliers seront publiées avec l'accord de leurs propriétaires.",
  },

  ateliers: {
    label: "Nos ateliers",
    title: ["Des mains expertes,", "*choisies une à une.*"],
    text: "Couturiers, retoucheurs, brodeurs : chaque atelier du réseau est vérifié avant de recevoir sa première commande. Ensuite, ce sont tes avis qui parlent.",
    criteria: [
      {
        title: "Identité vérifiée",
        text: "Numéro fiscal (NIF ou CIF) et coordonnées contrôlés.",
      },
      {
        title: "Savoir-faire prouvé",
        text: "Réalisations examinées une par une avant validation.",
      },
      {
        title: "Charte qualité signée",
        text: "Des engagements communs sur le soin, les délais et la communication.",
      },
      {
        title: "Noté par les clients",
        text: "Une note et un avis après chaque commande.",
      },
    ],
    note: "Le réseau s'ouvre : chaque nouvel atelier porte la mention « Nouvel atelier », jusqu'à ses premiers avis clients.",
    illustrationAlt: "Dessin au trait d'une machine à coudre.",
  },

  founder: {
    label: "L'origine",
    title: ["Du Mali à Barcelone,", "*un même fil.*"],
    paragraphs: [
      "Kadel Kouture, c'est l'histoire de Kadja : des racines au Mali, une vie à Barcelone, et la conviction qu'un vêtement aimé ne se jette pas.",
      "Il se répare, il s'ajuste, il se transforme. Renew, don't replace : trois mots pour une communauté qui préfère faire durer ce qu'elle aime.",
    ],
    signature: "Kadja",
    role: "À l'origine de Kadel Kouture",
    motto: "Renew, don't replace.",
    imageAlt:
      "Une carte du Mali à la feuille d'or sur fond noir, accrochée dans un intérieur clair.",
    secondaryAlt: "Un bogolan malien encadré dans un salon baigné de soleil.",
    secondaryCaption: "Bogolan — Mali",
  },

  guarantee: {
    label: "Nos engagements",
    title: ["Confier un vêtement aimé", "*demande de la confiance.*"],
    items: [
      {
        title: "Retouche reprise gratuitement",
        text: "Si le résultat ne correspond pas aux consignes et aux mensurations transmises.",
      },
      {
        title: "Vêtement protégé",
        text: "Assuré pendant le transport et à l'atelier, selon les conditions confirmées par notre assureur.",
      },
      {
        title: "Annulation gratuite",
        text: "Si le prix final confirmé par l'atelier dépasse de plus de {percent} % le prix affiché.",
      },
    ],
    extras: [
      "Paiement sécurisé",
      "Récapitulatif complet avant de payer",
      "Suivi du colis à chaque étape",
    ],
  },

  faq: {
    label: "Questions fréquentes",
    title: ["Tout ce que", "tu *te demandes.*"],
    items: [
      {
        q: "Comment fonctionnent les points relais ?",
        a: "Au moment de commander, tu choisis sur une carte le point relais le plus proche : casier InPost, bureau Correos, commerce SEUR ou GLS. Tu y déposes ton colis avec l'étiquette ou le QR code reçu par email, et ton vêtement terminé revient dans ce même point relais.",
      },
      {
        q: "Comment emballer mon vêtement ?",
        a: "Un sac ou un carton bien fermé suffit. Les consignes d'emballage arrivent par email, avec ton étiquette.",
      },
      {
        q: "Quelles matières acceptez-vous ?",
        a: "Les matières du quotidien : coton, denim, lin, laine, soie, synthétiques. Pour le cuir ou une pièce très délicate, précise-le avec des photos : l'atelier confirme avant de commencer.",
      },
      {
        q: "Comment transmettre mes mensurations ?",
        a: "Avec deux photos prises depuis ton téléphone, de face et de profil, ou en saisissant tes mesures à la main. Elles sont demandées pour un ajustement ou une personnalisation, facultatives pour une réparation simple, et utilisées uniquement avec ton accord, pour ta commande.",
      },
      {
        q: "Comment suivre mon colis ?",
        a: "Tu reçois un lien de suivi par email. Le transporteur te prévient à chaque étape : dépôt, arrivée à l'atelier, retour dans ton point relais.",
      },
      {
        q: "Et si mon vêtement est abîmé ?",
        a: "Ton vêtement est assuré pendant le transport et à l'atelier, selon les conditions de notre assurance. Si le résultat ne correspond pas à tes consignes et à tes mensurations, la retouche est reprise gratuitement.",
      },
      {
        q: "Puis-je annuler ou être remboursé ?",
        a: "Le prix affiché est indicatif : l'atelier le confirme à réception de ton vêtement. S'il dépasse le prix affiché de plus de 15 %, tu peux annuler gratuitement et récupérer ton vêtement. Les autres cas sont précisés dans nos conditions générales de vente.",
      },
    ],
  },

  final: {
    title: ["Ton vêtement mérite mieux", "que le *fond du placard.*"],
    offer: "Offre fondateur : −{discount} % sur ta première commande.",
    remaining: "Plus que {count} places sur {limit}.",
    cta: "Commander",
    imageAlt:
      "Un intérieur lumineux à Barcelone, sous une affiche de la Sagrada Família.",
  },

  lead: {
    title: "Tu hésites encore ?",
    text: "Reçois gratuitement notre guide « 5 réparations qui sauvent ton dressing ».",
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
    success: "C'est noté. Ton guide arrive bientôt.",
    error: "Oups, ça n'a pas marché. Réessaie dans un instant.",
    invalidEmail: "Vérifie ton adresse email.",
    invalidPhone: "Vérifie ton numéro, avec l'indicatif (ex. +34).",
    consentRequired: "Coche la case pour recevoir le guide.",
  },

  join: {
    label: "Ateliers partenaires",
    title: ["Couturier ou atelier", "à *Barcelone ?*"],
    text: "Rejoins le réseau Kadel Kouture et reçois des commandes de clients qui veulent faire durer leurs vêtements.",
    benefits: [
      "Des commandes claires : photos, mensurations et consignes du client.",
      "Le colis arrive directement à ton atelier.",
      "Ta spécialité mise en avant auprès des clients.",
    ],
    cta: "Rejoindre le réseau",
  },

  brands: {
    label: "Marques",
    title: ["Offre la réparation", "à tes *clients.*"],
    text: "Tu es une marque ? Propose un service de réparation à tes clients sans rien construire : le réseau d'ateliers et la logistique en point relais sont déjà là.",
    fields: {
      name: "Ton nom",
      brand: "Ta marque",
      email: "Email professionnel",
      need: "Ton besoin",
    },
    needPlaceholder:
      "Ex. : proposer la réparation de nos jeans à nos clients en Espagne",
    submit: "Envoyer",
    sending: "Envoi…",
    success: "Merci. Nous revenons vers toi rapidement.",
    error: "Oups, ça n'a pas marché. Réessaie dans un instant.",
    invalid: "Vérifie les champs : tous sont nécessaires.",
  },

  footer: {
    tagline: "Renew, don't replace.",
    cities: "Mali · Paris · Barcelone",
    service: "Le service",
    join: "Rejoindre",
    legal: "Informations",
    language: "Langue",
    links: {
      how: "Comment ça marche",
      services: "Prestations et prix",
      ateliers: "Nos ateliers",
      faq: "Questions fréquentes",
      joinAtelier: "Devenir atelier partenaire",
      brands: "Espace marques",
      legalNotice: "Mentions légales",
      terms: "Conditions générales de vente",
      privacy: "Politique de confidentialité",
    },
    rights: "Tous droits réservés.",
  },

  sticky: {
    cta: "Commander",
    note: "Livraison en point relais incluse",
  },
};

export type LandingDictionary = typeof fr;
