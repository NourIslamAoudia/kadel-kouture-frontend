import type { LandingDictionary } from "./fr";

/** Textos de la landing page — español (idioma por defecto). A revisar por un hablante nativo. */
export const es = {
  meta: {
    title:
      "Kadel Kouture — Arreglos, retoques y personalización de ropa en Barcelona",
    description:
      "Repara, ajusta, personaliza o transforma tu ropa con talleres asociados de Barcelona. Pide online, entrega en un punto de recogida, envío de ida y vuelta incluido.",
    ogLocale: "es_ES",
  },

  skip: "Ir al contenido",

  carousel: { prev: "Anterior", next: "Siguiente" },

  announcement: {
    offer: "Oferta fundador — −{discount} % en tu primer pedido",
    offerShort: "Oferta fundador: −{discount} %",
    limit: "reservada a los {limit} primeros pedidos",
    remaining: "Quedan {count} plazas",
    fallback: "Envío de ida y vuelta en punto de recogida incluido",
    cta: "Pedir",
  },

  nav: {
    label: "Navegación principal",
    home: "Kadel Kouture, inicio",
    how: "Cómo funciona",
    ateliers: "Nuestros talleres",
    brands: "Marcas",
    join: "Hazte taller asociado",
    order: "Pedir",
    menu: "Menú",
    close: "Cerrar",
    language: "Idioma",
  },

  hero: {
    eyebrow: "Taller de arreglos online · Barcelona",
    title: ["Tu ropa favorita", "merece una *segunda vida.*"],
    subtitle:
      "Repara, ajusta, personaliza o transforma tus prendas con talleres asociados de Barcelona. Dejas el paquete cerca de casa y nosotros nos ocupamos del resto.",
    cta: "Pedir",
    secondary: "Cómo funciona",
    videoLabel:
      "Cuatro interiores llenos de luz, cada uno con una obra: un bogolán maliense, París, la Sagrada Família de Barcelona y un mapa de Malí en pan de oro.",
    scenes: ["Bogolán", "París", "Barcelona", "Malí"],
    pause: "Pausar el vídeo",
    play: "Reanudar el vídeo",
    scroll: "Descubrir",
  },

  story: {
    label: "El apego",
    title: ["Hay prendas", "que merecen *quedarse.*"],
    quote:
      "Ese vaquero que te encanta, con el bolsillo descosido. Ese vestido de segunda mano un poco largo. Te dices que pasarás por la modista. Y sigue en el fondo del armario.",
    aside: "Parece que ese vaquero lo quieres demasiado para tirarlo.",
    body: "Una prenda querida guarda la huella de un viaje, de un encuentro, de un hallazgo. Repararla es seguir su historia en lugar de sustituirla.",
    imageAlt:
      "Un interior parisino luminoso: un maniquí de costura junto a una chimenea, bajo un cartel de la torre Eiffel.",
    secondaryAlt: "Un bogolán maliense enmarcado sobre una consola de madera.",
    caption: "París — el taller a plena luz",
  },

  problem: {
    label: "El problema, la solución",
    title: ["Lo que te impide ponértela.", "*Lo que hacemos.*"],
    problemHead: "Lo que frena",
    solutionHead: "Nuestra respuesta",
    rows: [
      {
        problem: "Un enganchón, un botón perdido, una costura que cede.",
        solution:
          "Un arreglo cuidado por un taller verificado, desde {reparation}.",
      },
      {
        problem: "Una prenda que no sienta bien.",
        solution: "Un ajuste hecho según tus medidas, desde {ajustement}.",
      },
      {
        problem: "Un hallazgo de segunda mano que no es del todo de tu talla.",
        solution: "Bajo, entallado, ajuste: la prenda se adapta a tu silueta.",
      },
      {
        problem: "Nunca tienes tiempo de ir a la modista.",
        solution:
          "Sin cita: dejas el paquete en un punto de recogida cerca de casa.",
      },
      {
        problem: "Las ganas de una prenda que nadie más tiene.",
        solution:
          "Personalización desde {personnalisation}, transformación completa desde {upcycling}.",
      },
    ],
    replace: "Sustituirlo costaría",
    repair: "Repararlo, desde",
  },

  how: {
    label: "Cómo funciona",
    title: ["Cinco pasos,", "*ninguna cita.*"],
    intro:
      "Seguro que piensas que tu modista hace lo mismo. Pero aquí no hay horarios de tienda: todo se hace online y tu paquete sale de un punto de recogida cerca de casa.",
    steps: [
      {
        title: "Elige tu servicio",
        text: "Reparar, ajustar, personalizar o transformar. Añade fotos y tus indicaciones.",
      },
      {
        title: "Elige tu taller",
        text: "Talleres de Barcelona verificados, con su especialidad y su precio para tu servicio.",
      },
      {
        title: "Indica tus medidas",
        text: "Dos fotos desde el móvil o las medidas a mano, cuando el servicio lo requiere.",
      },
      {
        title: "Deja tu paquete",
        text: "En el punto de recogida que elijas: InPost, Correos, SEUR o GLS.",
      },
      {
        title: "Recoge tu prenda",
        text: "Vuelve a tu punto de recogida. Sigues cada etapa del trayecto.",
      },
    ],
    note: "El plazo orientativo aparece antes de pagar.",
    cta: "Pedir",
  },

  services: {
    label: "Servicios y precios",
    title: ["El oficio,", "al *precio justo.*"],
    intro:
      "Precios «desde», envío de ida y vuelta en punto de recogida incluido. Sin costes sorpresa al pagar.",
    pick: "Tu prenda",
    garments: {
      pantalon: "Pantalón",
      robe: "Vestido",
      veste: "Chaqueta",
      jean: "Vaquero",
      autre: "Otra",
    },
    anchor: {
      pantalon: "Un pantalón nuevo",
      robe: "Un vestido nuevo",
      veste: "Una chaqueta nueva",
      jean: "Un vaquero nuevo",
      autre: "Una prenda nueva",
    },
    repairFrom: "Repararlo, desde",
    repairGroup: "Reparar y ajustar",
    categories: {
      reparation: "Arreglo",
      ajustement: "Ajuste",
      personnalisation: "Personalización",
      upcycling: "Upcycling",
    },
    items: {
      reprise: "Zurcido de un agujero o una costura",
      boutons: "Cambio de botones o automáticos",
      fermeture: "Cambio de cremallera",
      ourlet: "Bajo de pantalón o vaquero",
      cintrer: "Entallar una camisa o una prenda superior",
      reprendre: "Ajustar un vestido o una chaqueta",
      broderie: "Bordado, iniciales, motivo",
      teinture: "Cambio de color, tinte",
      transformation: "Transformación de una prenda",
    },
    from: "desde",
    order: "Pedir: {label}",
    create: {
      label: "Crear",
      title: ["Personalizar,", "*transformar.*"],
      text: "Un bordado, un color, un corte nuevo: la prenda pasa a ser tuya, y de nadie más.",
      imageAlt:
        "Detalle de un bogolán maliense: motivos geométricos trazados a mano.",
    },
    notes: {
      bundle: "Añade una segunda prenda: el envío ya está pagado.",
      minimum: "Pedido mínimo: {amount}.",
      quote:
        "El taller confirma el precio final al recibir la prenda. Si supera el precio mostrado en más de un {percent} %, cancelas y recuperas tu prenda sin coste.",
    },
  },

  transformations: {
    label: "Antes, después",
    title: ["La misma prenda.", "*Otra historia.*"],
    intro: "Tres ejemplos de transformaciones confiadas a los talleres.",
    before: "Antes",
    after: "Después",
    items: [
      {
        title: "Bajo de vaquero",
        category: "Ajuste",
        before: "Demasiado largo, se arruga sobre el zapato.",
        after: "Un bajo limpio, a la medida justa.",
      },
      {
        title: "Vestido entallado",
        category: "Ajuste",
        before: "Recto y demasiado ancho.",
        after: "La cintura marcada, el vestido cae perfecto.",
      },
      {
        title: "Chaqueta personalizada",
        category: "Personalización",
        before: "Una chaqueta vaquera lisa.",
        after: "Un motivo bordado en la espalda.",
      },
    ],
    disclaimer:
      "Dibujos ilustrativos. Las fotos de los trabajos de los talleres se publicarán con el permiso de sus propietarios.",
  },

  ateliers: {
    label: "Nuestros talleres",
    title: ["Manos expertas,", "*elegidas una a una.*"],
    text: "Costura, arreglos, bordado: cada taller de la red se verifica antes de recibir su primer pedido. Después, hablan tus valoraciones.",
    criteria: [
      {
        title: "Identidad verificada",
        text: "NIF o CIF y datos de contacto comprobados.",
      },
      {
        title: "Oficio demostrado",
        text: "Trabajos revisados uno a uno antes de la validación.",
      },
      {
        title: "Carta de calidad firmada",
        text: "Compromisos comunes sobre el cuidado, los plazos y la comunicación.",
      },
      {
        title: "Valorado por los clientes",
        text: "Una nota y una opinión después de cada pedido.",
      },
    ],
    note: "La red se abre: cada taller nuevo lleva la mención «Taller nuevo» hasta sus primeras valoraciones.",
    illustrationAlt: "Dibujo a línea de una máquina de coser.",
  },

  founder: {
    label: "El origen",
    title: ["De Malí a Barcelona,", "*un mismo hilo.*"],
    paragraphs: [
      "Kadel Kouture es la historia de Kadja: raíces en Malí, una vida en Barcelona y la convicción de que una prenda querida no se tira.",
      "Se repara, se ajusta, se transforma. Renew, don't replace: tres palabras para una comunidad que prefiere hacer durar lo que quiere.",
    ],
    signature: "Kadja",
    role: "En el origen de Kadel Kouture",
    motto: "Renew, don't replace.",
    imageAlt:
      "Un mapa de Malí en pan de oro sobre fondo negro, colgado en un interior claro.",
    secondaryAlt:
      "Un bogolán maliense enmarcado en un salón bañado por el sol.",
    secondaryCaption: "Bogolán — Malí",
  },

  guarantee: {
    label: "Nuestros compromisos",
    title: ["Confiar una prenda querida", "*exige confianza.*"],
    items: [
      {
        title: "Arreglo rehecho sin coste",
        text: "Si el resultado no corresponde a las indicaciones y medidas enviadas.",
      },
      {
        title: "Prenda protegida",
        text: "Asegurada durante el transporte y en el taller, según las condiciones confirmadas por nuestra aseguradora.",
      },
      {
        title: "Cancelación gratuita",
        text: "Si el precio final confirmado por el taller supera en más de un {percent} % el precio mostrado.",
      },
    ],
    extras: [
      "Pago seguro",
      "Resumen completo antes de pagar",
      "Seguimiento del paquete en cada etapa",
    ],
  },

  faq: {
    label: "Preguntas frecuentes",
    title: ["Todo lo que", "*te preguntas.*"],
    items: [
      {
        q: "¿Cómo funcionan los puntos de recogida?",
        a: "Al hacer el pedido eliges en un mapa el punto más cercano: taquilla InPost, oficina de Correos, comercio SEUR o GLS. Dejas allí tu paquete con la etiqueta o el código QR que recibes por email, y tu prenda terminada vuelve a ese mismo punto.",
      },
      {
        q: "¿Cómo embalo mi prenda?",
        a: "Basta con una bolsa o una caja bien cerrada. Las instrucciones de embalaje llegan por email, junto con tu etiqueta.",
      },
      {
        q: "¿Qué materiales aceptáis?",
        a: "Los materiales del día a día: algodón, denim, lino, lana, seda, sintéticos. Para el cuero o una prenda muy delicada, indícalo con fotos: el taller lo confirma antes de empezar.",
      },
      {
        q: "¿Cómo envío mis medidas?",
        a: "Con dos fotos desde el móvil, de frente y de perfil, o escribiendo tus medidas a mano. Se piden para un ajuste o una personalización, son opcionales para un arreglo sencillo y solo se usan con tu consentimiento, para tu pedido.",
      },
      {
        q: "¿Cómo sigo mi paquete?",
        a: "Recibes un enlace de seguimiento por email. El transportista te avisa en cada etapa: entrega, llegada al taller y vuelta a tu punto de recogida.",
      },
      {
        q: "¿Y si mi prenda sufre daños?",
        a: "Tu prenda está asegurada durante el transporte y en el taller, según las condiciones de nuestra aseguradora. Si el resultado no corresponde a tus indicaciones y medidas, el arreglo se rehace sin coste.",
      },
      {
        q: "¿Puedo cancelar o pedir un reembolso?",
        a: "El precio mostrado es orientativo: el taller lo confirma al recibir tu prenda. Si supera el precio mostrado en más de un 15 %, puedes cancelar sin coste y recuperar tu prenda. Los demás casos se detallan en nuestras condiciones generales de venta.",
      },
    ],
  },

  final: {
    title: ["Tu prenda merece algo mejor", "que el *fondo del armario.*"],
    offer: "Oferta fundador: −{discount} % en tu primer pedido.",
    remaining: "Quedan {count} plazas de {limit}.",
    cta: "Pedir",
    imageAlt:
      "Un interior luminoso en Barcelona, bajo un cartel de la Sagrada Família.",
  },

  lead: {
    title: "¿Todavía lo estás pensando?",
    text: "Recibe gratis nuestra guía «5 arreglos que salvan tu armario».",
    channelLabel: "Recibir la guía por",
    email: "Email",
    whatsapp: "WhatsApp",
    emailLabel: "Tu email",
    whatsappLabel: "Tu número de WhatsApp",
    emailPlaceholder: "tu@email.com",
    whatsappPlaceholder: "+34 600 000 000",
    consent:
      "Acepto recibir esta guía y algunos consejos de Kadel Kouture. Puedo darme de baja con un clic.",
    submit: "Recibir la guía",
    sending: "Enviando…",
    success: "Hecho. Tu guía llegará pronto.",
    error: "Vaya, no ha funcionado. Inténtalo de nuevo en un momento.",
    invalidEmail: "Revisa tu dirección de email.",
    invalidPhone: "Revisa tu número, con el prefijo (p. ej. +34).",
    consentRequired: "Marca la casilla para recibir la guía.",
  },

  join: {
    label: "Talleres asociados",
    title: ["¿Tienes un taller", "en *Barcelona?*"],
    text: "Únete a la red Kadel Kouture y recibe pedidos de clientes que quieren hacer durar su ropa.",
    benefits: [
      "Pedidos claros: fotos, medidas e indicaciones del cliente.",
      "El paquete llega directamente a tu taller.",
      "Tu especialidad, destacada ante los clientes.",
    ],
    cta: "Unirme a la red",
  },

  brands: {
    label: "Marcas",
    title: ["Ofrece la reparación", "a tus *clientes.*"],
    text: "¿Tienes una marca? Ofrece un servicio de reparación a tus clientes sin construir nada: la red de talleres y la logística en puntos de recogida ya están ahí.",
    fields: {
      name: "Tu nombre",
      brand: "Tu marca",
      email: "Email profesional",
      need: "Tu necesidad",
    },
    needPlaceholder:
      "Ej.: ofrecer la reparación de nuestros vaqueros a clientes en España",
    submit: "Enviar",
    sending: "Enviando…",
    success: "Gracias. Te respondemos muy pronto.",
    error: "Vaya, no ha funcionado. Inténtalo de nuevo en un momento.",
    invalid: "Revisa los campos: todos son necesarios.",
  },

  footer: {
    tagline: "Renew, don't replace.",
    cities: "Malí · París · Barcelona",
    service: "El servicio",
    join: "Únete",
    legal: "Información",
    language: "Idioma",
    links: {
      how: "Cómo funciona",
      services: "Servicios y precios",
      ateliers: "Nuestros talleres",
      faq: "Preguntas frecuentes",
      joinAtelier: "Hazte taller asociado",
      brands: "Espacio marcas",
      legalNotice: "Aviso legal",
      terms: "Condiciones generales de venta",
      privacy: "Política de privacidad",
    },
    rights: "Todos los derechos reservados.",
  },

  sticky: {
    cta: "Pedir",
    note: "Envío en punto de recogida incluido",
  },
} satisfies LandingDictionary;
