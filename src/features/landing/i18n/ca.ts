import type { LandingDictionary } from "./fr";

/** Textos de la landing page — català. A revisar per un parlant nadiu. */
export const ca = {
  meta: {
    title:
      "Kadel Kouture — Arranjaments, retocs i personalització de roba a Barcelona",
    description:
      "Repara, ajusta, personalitza o transforma la teva roba amb tallers associats de Barcelona. Comanda en línia, lliurament en un punt de recollida, enviament d'anada i tornada inclòs.",
    ogLocale: "ca_ES",
  },

  skip: "Ves al contingut",

  announcement: {
    offer: "Oferta fundador — −{discount} % a la teva primera comanda",
    offerShort: "Oferta fundador: −{discount} %",
    limit: "reservada a les {limit} primeres comandes",
    remaining: "Queden {count} places",
    fallback: "Enviament d'anada i tornada en punt de recollida inclòs",
    cta: "Demanar",
  },

  nav: {
    label: "Navegació principal",
    home: "Kadel Kouture, inici",
    how: "Com funciona",
    ateliers: "Els nostres tallers",
    brands: "Marques",
    join: "Fes-te taller associat",
    order: "Demanar",
    menu: "Menú",
    close: "Tancar",
    language: "Idioma",
  },

  hero: {
    eyebrow: "Taller d'arranjaments en línia · Barcelona",
    title: ["La teva roba preferida", "mereix una *segona vida.*"],
    subtitle:
      "Repara, ajusta, personalitza o transforma les teves peces amb tallers associats de Barcelona. Deixes el paquet a prop de casa i nosaltres ens encarreguem de la resta.",
    cta: "Demanar",
    secondary: "Com funciona",
    videoLabel:
      "Quatre interiors plens de llum, cadascun amb una obra: un bogolan malià, París, la Sagrada Família de Barcelona i un mapa de Mali en pa d'or.",
    scenes: ["Bogolan", "París", "Barcelona", "Mali"],
    pause: "Posar el vídeo en pausa",
    play: "Reprendre el vídeo",
    scroll: "Descobrir",
  },

  story: {
    label: "L'afecte",
    title: ["Hi ha peces", "que val la pena *conservar.*"],
    quote:
      "Aquells texans que t'encanten, amb la butxaca descosida. Aquell vestit de segona mà una mica massa llarg. Et dius que passaràs per la modista. I continuen al fons de l'armari.",
    aside: "Sembla que aquests texans te'ls estimes massa per llençar-los.",
    body: "Una peça estimada guarda el rastre d'un viatge, d'una trobada, d'una troballa. Reparar-la és continuar la seva història en lloc de substituir-la.",
    imageAlt:
      "Un interior parisenc lluminós: un maniquí de costura al costat d'una xemeneia, sota un cartell de la torre Eiffel.",
    secondaryAlt: "Un bogolan malià emmarcat sobre una consola de fusta.",
    caption: "París — el taller a plena llum",
  },

  problem: {
    label: "El problema, la solució",
    title: ["El que t'impedeix posar-te-la.", "*El que fem.*"],
    problemHead: "El que frena",
    solutionHead: "La nostra resposta",
    rows: [
      {
        problem: "Una estrebada, un botó perdut, una costura que cedeix.",
        solution:
          "Un arranjament acurat d'un taller verificat, des de {reparation}.",
      },
      {
        problem: "Una peça que no queda bé.",
        solution: "Un ajust fet segons les teves mides, des de {ajustement}.",
      },
      {
        problem: "Una troballa de segona mà que no és ben bé de la teva talla.",
        solution: "Baix, entallat, ajust: la peça s'adapta a la teva silueta.",
      },
      {
        problem: "Mai tens temps d'anar a la modista.",
        solution:
          "Sense cita: deixes el paquet en un punt de recollida a prop de casa.",
      },
      {
        problem: "Les ganes d'una peça que ningú més té.",
        solution:
          "Personalització des de {personnalisation}, transformació completa des de {upcycling}.",
      },
    ],
    replace: "Substituir-la costaria",
    repair: "Reparar-la, des de",
  },

  how: {
    label: "Com funciona",
    title: ["Cinc passos,", "*cap cita.*"],
    intro:
      "Segur que penses que la teva modista fa el mateix. Però aquí no hi ha horaris de botiga: tot es fa en línia i el teu paquet surt d'un punt de recollida a prop de casa.",
    steps: [
      {
        title: "Tria el servei",
        text: "Reparar, ajustar, personalitzar o transformar. Afegeix fotos i les teves indicacions.",
      },
      {
        title: "Tria el taller",
        text: "Tallers de Barcelona verificats, amb la seva especialitat i el seu preu per al teu servei.",
      },
      {
        title: "Indica les teves mides",
        text: "Dues fotos des del mòbil o les mides a mà, quan el servei ho requereix.",
      },
      {
        title: "Deixa el paquet",
        text: "Al punt de recollida que triïs: InPost, Correos, SEUR o GLS.",
      },
      {
        title: "Recull la teva peça",
        text: "Torna al teu punt de recollida. Segueixes cada etapa del trajecte.",
      },
    ],
    note: "El termini orientatiu apareix abans de pagar.",
    cta: "Demanar",
  },

  services: {
    label: "Serveis i preus",
    title: ["L'ofici,", "al *preu just.*"],
    intro:
      "Preus «des de», enviament d'anada i tornada en punt de recollida inclòs. Sense costos sorpresa en pagar.",
    pick: "La teva peça",
    garments: {
      pantalon: "Pantalons",
      robe: "Vestit",
      veste: "Jaqueta",
      jean: "Texans",
      autre: "Altres",
    },
    anchor: {
      pantalon: "Uns pantalons nous",
      robe: "Un vestit nou",
      veste: "Una jaqueta nova",
      jean: "Uns texans nous",
      autre: "Una peça nova",
    },
    repairFrom: "Reparar-la, des de",
    repairGroup: "Reparar i ajustar",
    categories: {
      reparation: "Arranjament",
      ajustement: "Ajust",
      personnalisation: "Personalització",
      upcycling: "Upcycling",
    },
    items: {
      reprise: "Sargit d'un forat o d'una costura",
      boutons: "Canvi de botons o automàtics",
      fermeture: "Canvi de cremallera",
      ourlet: "Baix de pantalons o texans",
      cintrer: "Entallar una camisa o una peça superior",
      reprendre: "Ajustar un vestit o una jaqueta",
      broderie: "Brodat, inicials, motiu",
      teinture: "Canvi de color, tint",
      transformation: "Transformació d'una peça",
    },
    from: "des de",
    order: "Demanar: {label}",
    create: {
      label: "Crear",
      title: ["Personalitzar,", "*transformar.*"],
      text: "Un brodat, un color, un tall nou: la peça passa a ser teva, i de ningú més.",
      imageAlt: "Detall d'un bogolan malià: motius geomètrics traçats a mà.",
    },
    notes: {
      bundle: "Afegeix una segona peça: l'enviament ja està pagat.",
      minimum: "Comanda mínima: {amount}.",
      quote:
        "El taller confirma el preu final quan rep la peça. Si supera el preu mostrat en més d'un {percent} %, cancel·les i recuperes la teva peça sense cost.",
    },
  },

  transformations: {
    label: "Abans, després",
    title: ["La mateixa peça.", "*Una altra història.*"],
    intro: "Tres exemples de transformacions confiades als tallers.",
    before: "Abans",
    after: "Després",
    items: [
      {
        title: "Baix de texans",
        category: "Ajust",
        before: "Massa llargs, s'arrugen sobre la sabata.",
        after: "Un baix net, a la mida justa.",
      },
      {
        title: "Vestit entallat",
        category: "Ajust",
        before: "Recte i massa ample.",
        after: "La cintura marcada, el vestit cau perfecte.",
      },
      {
        title: "Jaqueta personalitzada",
        category: "Personalització",
        before: "Una jaqueta texana llisa.",
        after: "Un motiu brodat a l'esquena.",
      },
    ],
    disclaimer:
      "Dibuixos il·lustratius. Les fotos dels treballs dels tallers es publicaran amb el permís dels seus propietaris.",
  },

  ateliers: {
    label: "Els nostres tallers",
    title: ["Mans expertes,", "*triades una a una.*"],
    text: "Costura, arranjaments, brodat: cada taller de la xarxa es verifica abans de rebre la primera comanda. Després, parlen les teves valoracions.",
    criteria: [
      {
        title: "Identitat verificada",
        text: "NIF o CIF i dades de contacte comprovats.",
      },
      {
        title: "Ofici demostrat",
        text: "Treballs revisats un a un abans de la validació.",
      },
      {
        title: "Carta de qualitat signada",
        text: "Compromisos comuns sobre la cura, els terminis i la comunicació.",
      },
      {
        title: "Valorat pels clients",
        text: "Una nota i una opinió després de cada comanda.",
      },
    ],
    note: "La xarxa s'obre: cada taller nou porta la menció «Taller nou» fins a les primeres valoracions.",
    illustrationAlt: "Dibuix de línia d'una màquina de cosir.",
  },

  founder: {
    label: "L'origen",
    title: ["De Mali a Barcelona,", "*un mateix fil.*"],
    paragraphs: [
      "Kadel Kouture és la història de Kadja: arrels a Mali, una vida a Barcelona i la convicció que una peça estimada no es llença.",
      "Es repara, s'ajusta, es transforma. Renew, don't replace: tres paraules per a una comunitat que prefereix fer durar el que estima.",
    ],
    signature: "Kadja",
    role: "A l'origen de Kadel Kouture",
    motto: "Renew, don't replace.",
    imageAlt:
      "Un mapa de Mali en pa d'or sobre fons negre, penjat en un interior clar.",
    secondaryAlt: "Un bogolan malià emmarcat en una sala banyada pel sol.",
    secondaryCaption: "Bogolan — Mali",
  },

  guarantee: {
    label: "Els nostres compromisos",
    title: ["Confiar una peça estimada", "*demana confiança.*"],
    items: [
      {
        title: "Arranjament refet sense cost",
        text: "Si el resultat no correspon a les indicacions i mides enviades.",
      },
      {
        title: "Peça protegida",
        text: "Assegurada durant el transport i al taller, segons les condicions confirmades per la nostra asseguradora.",
      },
      {
        title: "Cancel·lació gratuïta",
        text: "Si el preu final confirmat pel taller supera en més d'un {percent} % el preu mostrat.",
      },
    ],
    extras: [
      "Pagament segur",
      "Resum complet abans de pagar",
      "Seguiment del paquet a cada etapa",
    ],
  },

  faq: {
    label: "Preguntes freqüents",
    title: ["Tot el que", "*et preguntes.*"],
    items: [
      {
        q: "Com funcionen els punts de recollida?",
        a: "En fer la comanda tries en un mapa el punt més proper: taquilla InPost, oficina de Correos, botiga SEUR o GLS. Hi deixes el paquet amb l'etiqueta o el codi QR que reps per correu electrònic, i la teva peça acabada torna a aquest mateix punt.",
      },
      {
        q: "Com embalo la meva peça?",
        a: "N'hi ha prou amb una bossa o una capsa ben tancada. Les instruccions d'embalatge arriben per correu electrònic, amb la teva etiqueta.",
      },
      {
        q: "Quins materials accepteu?",
        a: "Els materials del dia a dia: cotó, denim, lli, llana, seda, sintètics. Per al cuir o una peça molt delicada, indica-ho amb fotos: el taller ho confirma abans de començar.",
      },
      {
        q: "Com envio les meves mides?",
        a: "Amb dues fotos des del mòbil, de cara i de perfil, o escrivint les mides a mà. Es demanen per a un ajust o una personalització, són opcionals per a un arranjament senzill i només s'utilitzen amb el teu consentiment, per a la teva comanda.",
      },
      {
        q: "Com segueixo el meu paquet?",
        a: "Reps un enllaç de seguiment per correu electrònic. El transportista t'avisa a cada etapa: lliurament, arribada al taller i retorn al teu punt de recollida.",
      },
      {
        q: "I si la meva peça pateix danys?",
        a: "La teva peça està assegurada durant el transport i al taller, segons les condicions de la nostra asseguradora. Si el resultat no correspon a les teves indicacions i mides, l'arranjament es refà sense cost.",
      },
      {
        q: "Puc cancel·lar o demanar un reemborsament?",
        a: "El preu mostrat és orientatiu: el taller el confirma quan rep la teva peça. Si supera el preu mostrat en més d'un 15 %, pots cancel·lar sense cost i recuperar la teva peça. Els altres casos es detallen a les nostres condicions generals de venda.",
      },
    ],
  },

  final: {
    title: [
      "La teva peça mereix alguna cosa millor",
      "que el *fons de l'armari.*",
    ],
    offer: "Oferta fundador: −{discount} % a la teva primera comanda.",
    remaining: "Queden {count} places de {limit}.",
    cta: "Demanar",
    imageAlt:
      "Un interior lluminós a Barcelona, sota un cartell de la Sagrada Família.",
  },

  lead: {
    title: "Encara t'ho estàs pensant?",
    text: "Rep gratis la nostra guia «5 arranjaments que salven el teu armari».",
    channelLabel: "Rebre la guia per",
    email: "Correu",
    whatsapp: "WhatsApp",
    emailLabel: "El teu correu electrònic",
    whatsappLabel: "El teu número de WhatsApp",
    emailPlaceholder: "tu@correu.com",
    whatsappPlaceholder: "+34 600 000 000",
    consent:
      "Accepto rebre aquesta guia i alguns consells de Kadel Kouture. Em puc donar de baixa amb un clic.",
    submit: "Rebre la guia",
    sending: "Enviant…",
    success: "Fet. La teva guia arribarà aviat.",
    error: "Vaja, no ha funcionat. Torna-ho a provar d'aquí a un moment.",
    invalidEmail: "Revisa la teva adreça de correu.",
    invalidPhone: "Revisa el teu número, amb el prefix (p. ex. +34).",
    consentRequired: "Marca la casella per rebre la guia.",
  },

  join: {
    label: "Tallers associats",
    title: ["Tens un taller", "a *Barcelona?*"],
    text: "Uneix-te a la xarxa Kadel Kouture i rep comandes de clients que volen fer durar la seva roba.",
    benefits: [
      "Comandes clares: fotos, mides i indicacions del client.",
      "El paquet arriba directament al teu taller.",
      "La teva especialitat, destacada davant dels clients.",
    ],
    cta: "Unir-me a la xarxa",
  },

  brands: {
    label: "Marques",
    title: ["Ofereix la reparació", "als teus *clients.*"],
    text: "Tens una marca? Ofereix un servei de reparació als teus clients sense construir res: la xarxa de tallers i la logística en punts de recollida ja hi són.",
    fields: {
      name: "El teu nom",
      brand: "La teva marca",
      email: "Correu professional",
      need: "La teva necessitat",
    },
    needPlaceholder:
      "Ex.: oferir la reparació dels nostres texans a clients a Espanya",
    submit: "Enviar",
    sending: "Enviant…",
    success: "Gràcies. Et responem ben aviat.",
    error: "Vaja, no ha funcionat. Torna-ho a provar d'aquí a un moment.",
    invalid: "Revisa els camps: tots són necessaris.",
  },

  footer: {
    tagline: "Renew, don't replace.",
    cities: "Mali · París · Barcelona",
    service: "El servei",
    join: "Uneix-te",
    legal: "Informació",
    language: "Idioma",
    links: {
      how: "Com funciona",
      services: "Serveis i preus",
      ateliers: "Els nostres tallers",
      faq: "Preguntes freqüents",
      joinAtelier: "Fes-te taller associat",
      brands: "Espai marques",
      legalNotice: "Avís legal",
      terms: "Condicions generals de venda",
      privacy: "Política de privacitat",
    },
    rights: "Tots els drets reservats.",
  },

  sticky: {
    cta: "Demanar",
    note: "Enviament en punt de recollida inclòs",
  },
} satisfies LandingDictionary;
