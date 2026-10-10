/**
 * Pages légales — BROUILLONS tirés du cahier des charges V1 (sections 6, 7, 8, 12 et 13).
 * Les informations de la société ne figurent pas dans le cahier des charges :
 * elles sont marquées [À compléter]. Textes à faire relire par un juriste espagnol
 * (section 14) puis à traduire en es, en, ca.
 */

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalDocument {
  slug: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}

const TODO = "[À compléter]";

export const legalNotice: LegalDocument = {
  slug: "mentions-legales",
  title: "Mentions légales",
  intro:
    "Informations sur l'éditeur et l'hébergement du site Kadel Kouture, service de réparation, retouche, personnalisation et upcycling de vêtements à Barcelone.",
  sections: [
    {
      title: "Éditeur du site",
      items: [
        "Nom commercial : Kadel Kouture",
        `Raison sociale et forme juridique : ${TODO}`,
        `Numéro d'identification fiscale (NIF / CIF) : ${TODO}`,
        `Adresse du siège : ${TODO}, Barcelone (Espagne)`,
        `Email de contact : ${TODO}`,
        `Téléphone : ${TODO}`,
        `Directeur·rice de la publication : ${TODO}`,
      ],
    },
    {
      title: "Conception et réalisation",
      paragraphs: [
        "Site conçu et développé par Impartial Group pour Kadel Kouture.",
      ],
    },
    {
      title: "Hébergement",
      paragraphs: [
        `Hébergeur du site : ${TODO} (nom, adresse, contact).`,
        "Les données personnelles, notamment les mensurations et les photos des vêtements, sont hébergées dans l'Union européenne.",
      ],
    },
    {
      title: "Activité",
      paragraphs: [
        "Kadel Kouture met en relation ses clients avec un réseau d'ateliers partenaires de Barcelone pour la réparation, l'ajustement, la personnalisation et l'upcycling de vêtements. Le client commande en ligne, dépose son colis dans un point relais et récupère son vêtement terminé dans ce même réseau de points relais.",
      ],
    },
    {
      title: "Propriété intellectuelle",
      paragraphs: [
        "La marque Kadel Kouture, la devise « Renew, don't replace », les textes, la vidéo d'accueil, les visuels et l'ensemble des éléments du site sont protégés. Toute reproduction sans autorisation écrite de Kadel Kouture est interdite.",
      ],
    },
    {
      title: "Avis et témoignages",
      paragraphs: [
        "Les avis, notes et témoignages publiés sur le site sont réels et publiés avec l'accord de leurs auteurs. Les chiffres affichés (places restantes de l'offre fondateur, vêtements sauvés, avis) proviennent de notre base de données.",
      ],
    },
  ],
};

export const terms: LegalDocument = {
  slug: "cgv",
  title: "Conditions générales de vente",
  intro:
    "Ces conditions s'appliquent à toute commande passée sur le site Kadel Kouture. Elles sont acceptées par le client avant le paiement.",
  sections: [
    {
      title: "1. Le service",
      paragraphs: [
        "Kadel Kouture propose des prestations de réparation, d'ajustement, de personnalisation et d'upcycling de vêtements, réalisées par des ateliers partenaires sélectionnés. Le service fonctionne entièrement en ligne et en points relais : le client ne se déplace jamais chez un couturier.",
      ],
    },
    {
      title: "2. Commande",
      paragraphs: ["La commande se fait en plusieurs étapes :"],
      items: [
        "Choix de la prestation, du type de vêtement et de la matière, avec photos et consignes. Les photos et les consignes constituent les instructions transmises à l'atelier et servent de base à la garantie.",
        "Choix de l'atelier parmi les ateliers validés proposant la prestation.",
        "Transmission des mensurations, lorsque la prestation le demande.",
        "Choix du point relais de dépôt (InPost, Correos, SEUR ou GLS).",
        "Vérification du récapitulatif complet (prestation, atelier, prix, remise éventuelle, livraison incluse), acceptation des présentes conditions et paiement.",
      ],
    },
    {
      title: "3. Prix",
      items: [
        "Les prix sont affichés « à partir de », toutes taxes comprises, livraison aller-retour en point relais incluse. Aucun frais supplémentaire n'est ajouté au moment du paiement.",
        "Le panier minimum est de 15 € par commande.",
        "Le prix affiché est indicatif : l'atelier confirme le prix final à réception du vêtement.",
        "Si le prix final dépasse le prix affiché de plus de 15 %, le client peut annuler sa commande et récupérer son vêtement gratuitement.",
      ],
    },
    {
      title: "4. Offre fondateur",
      paragraphs: [
        "Une remise de 20 % s'applique à la première commande, dans la limite des 300 premières commandes payées. Le nombre de places restantes affiché sur le site est réel. Une fois ce nombre atteint, l'offre prend fin.",
      ],
    },
    {
      title: "5. Paiement",
      paragraphs: [
        "Le paiement s'effectue en ligne par l'intermédiaire de Stripe. La commande est confirmée dès la validation du paiement ; le client reçoit alors un email de confirmation avec son numéro de commande.",
      ],
    },
    {
      title: "6. Dépôt, acheminement et retour",
      items: [
        "Le client dépose son vêtement, emballé dans un sac ou un carton fermé, au point relais choisi, avec l'étiquette ou le QR code reçu par email.",
        "Le transporteur achemine le colis jusqu'à l'atelier. Un lien de suivi permet de suivre chaque étape.",
        "L'atelier réalise la prestation selon les consignes et les mensurations transmises.",
        "Le vêtement terminé est renvoyé au point relais choisi par le client, qui est notifié de sa disponibilité.",
        `Délai de retrait au point relais et conséquences d'un colis non retiré : ${TODO}`,
      ],
    },
    {
      title: "7. Délais",
      paragraphs: [
        "Le délai indicatif de réalisation est affiché avant le paiement, selon la prestation et l'atelier choisis.",
      ],
    },
    {
      title: "8. Garantie satisfaction",
      items: [
        "Si le résultat ne correspond pas aux consignes et aux mensurations transmises, la retouche est reprise gratuitement.",
        `Le vêtement est assuré pendant le transport et à l'atelier, dans la limite d'un plafond de ${TODO} €, selon les conditions de l'assureur.`,
      ],
    },
    {
      title: "9. Annulation et remboursement",
      items: [
        "Annulation gratuite si le prix final confirmé par l'atelier dépasse le prix affiché de plus de 15 %.",
        `Annulation avant le dépôt du colis : ${TODO}`,
        `Droit de rétractation (prestation personnalisée réalisée selon les consignes du client) : ${TODO}`,
        `Délai et mode de remboursement : ${TODO}`,
      ],
    },
    {
      title: "10. Matières acceptées",
      paragraphs: [
        "Les matières courantes (coton, denim, lin, laine, soie, synthétiques) sont acceptées. Pour le cuir ou une pièce très délicate, le client le précise avec des photos ; l'atelier confirme avant de commencer.",
      ],
    },
    {
      title: "11. Réclamations et droit applicable",
      paragraphs: [
        `Contact du service client : ${TODO}`,
        `Droit applicable, tribunal compétent et médiation de la consommation : ${TODO}`,
      ],
    },
  ],
};

export const privacy: LegalDocument = {
  slug: "confidentialite",
  title: "Politique de confidentialité",
  intro:
    "Un client qui nous confie un vêtement qu'il aime nous confie aussi ses données. Cette page explique lesquelles nous collectons, pourquoi, et comment exercer tes droits.",
  sections: [
    {
      title: "Responsable du traitement",
      paragraphs: [
        `Kadel Kouture — ${TODO} (raison sociale, adresse, email de contact pour les données personnelles).`,
      ],
    },
    {
      title: "Données collectées",
      items: [
        "Commande : nom, téléphone, email, prestation, type de vêtement, matière, consignes et commentaire.",
        "Photos du vêtement, transmises à l'atelier comme instructions.",
        "Mensurations (par photos ou saisie manuelle), traitées uniquement avec ton consentement explicite.",
        "Point relais choisi et informations de suivi du colis.",
        "Paiement : traité par Stripe ; Kadel Kouture ne conserve pas tes données bancaires.",
        "Guide gratuit : ton email ou ton numéro WhatsApp, avec ton consentement.",
        "Demandes des marques et inscriptions des ateliers : nom, coordonnées professionnelles et informations transmises dans le formulaire.",
      ],
    },
    {
      title: "Pourquoi nous les utilisons",
      items: [
        "Exécuter ta commande : transmission à l'atelier choisi, expédition, suivi, emails de confirmation.",
        "Appliquer la garantie satisfaction (sur la base de tes consignes et mensurations).",
        "T'envoyer le guide demandé et quelques conseils, si tu l'as accepté (désinscription en un clic).",
        "Mesurer l'audience et améliorer le site, uniquement après ton consentement aux cookies.",
      ],
    },
    {
      title: "Destinataires",
      items: [
        "L'atelier partenaire choisi : prestation, photos, mensurations et consignes.",
        "Le transporteur et le service d'expédition (Sendcloud, InPost, Correos, SEUR, GLS) : informations nécessaires à l'envoi et au suivi.",
        "Le prestataire de paiement (Stripe).",
        "Le service d'envoi d'emails (Resend ou Brevo).",
        `Sous-traitants, transferts éventuels hors UE et garanties : ${TODO}`,
      ],
    },
    {
      title: "Hébergement",
      paragraphs: [
        "Les mensurations et les photos sont traitées comme des données personnelles et hébergées dans l'Union européenne.",
      ],
    },
    {
      title: "Cookies et mesure d'audience",
      paragraphs: [
        "Les outils de mesure et de publicité (Google Analytics 4 ou PostHog, Meta Pixel, TikTok Pixel, Microsoft Clarity) ne sont activés qu'après ton accord dans le bandeau de cookies. Tu peux modifier ton choix à tout moment.",
      ],
    },
    {
      title: "Durée de conservation",
      paragraphs: [
        `${TODO} (commandes, mensurations et photos, prospects, cookies).`,
      ],
    },
    {
      title: "Tes droits",
      paragraphs: [
        "Tu peux demander l'accès à tes données, leur rectification, leur suppression, leur portabilité, la limitation ou l'opposition à leur traitement, et retirer ton consentement à tout moment.",
        `Pour exercer tes droits : ${TODO}. Tu peux aussi adresser une réclamation à l'Agencia Española de Protección de Datos (AEPD).`,
      ],
    },
  ],
};
