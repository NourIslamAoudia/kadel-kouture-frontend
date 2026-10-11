import type { OrderDictionary } from "./fr";

/** Textos del pedido — español (idioma por defecto). A revisar por un hablante nativo. */
const pieces = (n: number) => `${n} ${n > 1 ? "prendas" : "prenda"}`;

export const es: OrderDictionary = {
  lang: "es",
  price: (amount: number) => `${amount}\u00A0€`,

  nav: {
    back: "Volver",
    language: "Idioma",
    next: "Continuar",
    addPiece: "Añadir la prenda",
    savePiece: "Guardar la prenda",
    toMeasures: "Ir a las medidas",
    send: "Enviar la solicitud",
    sending: "Enviando…",
    total: "Total estimado",
    pieces,
  },

  garments: {
    pantalon: "Pantalón",
    veste: "Chaqueta",
    robe: "Vestido",
    chemise: "Camisa",
    manteau: "Abrigo",
    autre: "Otra",
  },

  works: {
    retouche: { label: "Arreglo", description: "Bajos, ajustes, costuras" },
    reparation: {
      label: "Reparación",
      description: "Agujeros, cremalleras, botones",
    },
    personnalisation: {
      label: "Personalización",
      description: "Bordados, estampados, logotipos",
    },
    upcycling: { label: "Upcycling", description: "Transformación creativa" },
  },

  garment: {
    eyebrow: (n: number) => `Prenda n.º ${n}`,
    title: "¿Qué quieres *transformar*?",
    subtitle: "Elige la prenda que quieres confeccionar o ajustar.",
    from: "desde",
    otherLabel: "Indica la prenda",
    otherPlaceholder: "Ej.: mono, bufanda…",
  },

  work: {
    eyebrow: (n: number) => `Servicio · Prenda n.º ${n}`,
    title: "¿Qué tipo de *trabajo*?",
    subtitle: (garmentPrice: string) =>
      `Elige el servicio. El precio de la prenda es la suma del producto (${garmentPrice}) y del servicio.`,
    pieceTotal: "Total prenda:",
    product: "Producto",
    detailLabel: "Detalle para esta prenda (opcional)",
    detailPlaceholder: "Ej.: acortar 4 cm, cambiar la cremallera…",
  },

  items: {
    eyebrow: "Resumen de las prendas",
    title: (n: number) => `Tus *pedidos* (${n})`,
    subtitle: "Revisa tus prendas o añade otras antes de pasar a las medidas.",
    product: "Producto:",
    edit: "Modificar",
    remove: "Eliminar",
    add: "Añadir otra prenda",
    total: (n: number) => `Total estimado (${pieces(n)})`,
    note: "Precio transparente según la tarifa del taller",
  },

  method: {
    eyebrow: "Medidas",
    title: "¿Cómo quieres *tomar tus medidas*?",
    subtitle: "Elige el método más práctico para ti.",
    manual: { label: "Manual", description: "Introducir mis medidas" },
    photo: { label: "Foto 3D", description: "Detección automática" },
  },

  measures: {
    eyebrow: "Medidas manuales",
    title: "Tus *medidas*",
    info: "Indica tus medidas en centímetros. Si no las conoces, elige mejor la opción de foto.",
    fields: {
      chest: "Pecho",
      waist: "Cintura",
      hips: "Cadera",
      height: "Altura",
      shoulders: "Hombros",
      sleeve: "Manga",
    },
  },

  photo: {
    eyebrow: "Foto 3D",
    title: "Tus medidas, *automáticamente*",
    subtitle:
      "Añade una foto de frente y una de perfil: el motor calcula tus medidas.",
    height: "Altura (cm)",
    model: "Modelo",
    models: { neutral: "Neutro", female: "Mujer", male: "Hombre" },
    heightError: "La altura debe estar entre 100 y 230 cm.",
    computeError: "Error al calcular las medidas.",
    processingTitle: "Analizando…",
    processingText: "El motor está calculando tus medidas.",
  },

  upload: {
    label: "Fotos necesarias",
    title: "Dos vistas de tu silueta",
    text: "Añade una foto de frente y una de perfil. Se envían juntas al motor de medidas.",
    examplesTitle: "Ejemplos de fotos",
    examplesText: "Tu postura debe parecerse a este ejemplo",
    exampleFemale: "Ejemplo modelo mujer",
    exampleMale: "Ejemplo modelo hombre",
    guidanceStrong: "Importante para un mejor resultado",
    guidance:
      "haz una foto de frente y una de perfil, con el cuerpo entero visible. Lleva ropa ajustada, pegada al cuerpo, y no ropa ancha.",
    front: {
      title: "Vista de frente",
      description: "Pies juntos, brazos ligeramente separados",
    },
    side: {
      title: "Vista de perfil",
      description: "Gira 90°, postura natural",
    },
    ready: "Lista",
    preview: (title: string) => `Vista previa: ${title}`,
    replace: "Sustituir",
    removePhoto: (title: string) => `Eliminar: ${title}`,
    drop: "Arrastra o elige una imagen",
    formats: "JPG, PNG o WebP",
    back: "Volver",
    start: "Iniciar el escaneo",
    missing: "Añade las dos fotos",
  },

  sheet: {
    label: "Ficha del taller",
    title: "Medidas esenciales",
    copy: "Copiar",
    copied: "Copiado",
    unavailable: "No disponible",
    footnote: (ref: string) =>
      `Resultados filtrados del modelo 3D · Referencia ${ref}`,
  },

  client: {
    eyebrow: "Tus datos",
    title: "Para *contactarte*",
    subtitle: "Estos datos solo se usan para el seguimiento de tu pedido.",
    fullName: "Nombre completo",
    fullNamePlaceholder: "María García",
    phone: "Teléfono",
    phonePlaceholder: "+34 6xx xxx xxx",
    email: "Email",
    emailPlaceholder: "tu@email.com",
    comment: "Comentario libre (opcional)",
    commentPlaceholder: "Indica cualquier detalle útil para el taller…",
  },

  zone: {
    eyebrow: "Logística",
    title: "Tu zona *en Barcelona*",
    subtitle: "Elige tu barrio y el punto de entrega más práctico.",
    pickZone: "Elige tu zona",
    dropOff: "Puntos de entrega",
  },

  errors: {
    garment: "Elige un tipo de prenda.",
    garmentOther: "Indica el tipo de prenda.",
    work: "Elige el tipo de trabajo.",
    items: "Añade al menos una prenda a tu pedido.",
    method: "Elige un método de medida.",
    photo: "Añade las dos fotos e inicia el análisis.",
    measures: "Revisa tus medidas: los valores deben ser realistas y en cm.",
    fullName: "Escribe tu nombre completo.",
    phone: "Escribe un número de teléfono válido.",
    email: "Escribe una dirección de email válida.",
    zone: "Elige una zona y un punto de entrega.",
    generic: "Se ha producido un error. Inténtalo de nuevo en un momento.",
  },

  done: {
    title: "¡Solicitud *confirmada*!",
    text: (count: string, total: string) =>
      `Tu pedido de ${count} por un total estimado de ${total} se ha registrado. Te contactaremos muy pronto para cerrar los detalles.`,
  },
};
