# Kadel Kouture — Frontend

Plateforme de couture et de réparation textile basée à Barcelone. Kadel Kouture digitalise la couture de proximité : **commander en ligne → déposer dans un point partenaire → faire travailler un artisan → récupérer son vêtement**.

Ce dépôt contient l'application **Frontend** du projet, construite avec **Vite + React + TypeScript**.

---

## Table des matières

- [Concept](#concept)
- [Parcours client](#parcours-client)
- [Rôles de la plateforme](#rôles-de-la-plateforme)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Variables d'environnement](#variables-denvironnement)
- [Scripts disponibles](#scripts-disponibles)
- [Conventions de code](#conventions-de-code)

---

## Concept

Le client ne cherche plus un tailleur : il commande son service en ligne, dépose son vêtement dans un point partenaire proche de chez lui, et le récupère une fois le travail terminé.

Services proposés :

| Service | Description |
|---|---|
| **Retouches** | Ourlets, ajustements, coutures, modifications |
| **Réparations** | Trous, fermetures éclair, boutons, tissus endommagés |
| **Personnalisation** | Broderies, impressions, logos, créations personnalisées |
| **Service Express** | Traitement prioritaire, délai réduit |
| **Service Premium** | Accès aux artisans les mieux évalués |
| **Upcycling** | Transformation créative d'anciens vêtements en nouvelles pièces |

L'objectif : connecter clients, artisans tailleurs et commerces partenaires, tout en favorisant une consommation plus durable (réparer/transformer plutôt que jeter).

---

## Parcours client

1. **Commande en ligne**
   Le client choisit un service (retouche / réparation / personnalisation / upcycling), décrit son besoin, et renseigne ses mensurations — **manuellement ou via Scan 3D** (donnée essentielle pour l'artisan).

2. **Dépôt dans un point partenaire**
   Le client se rend au point de dépôt le plus proche, dépose son vêtement et présente son **QR code** pour identifier sa commande.

3. **Prise en charge par un artisan**
   Un partenaire logistique récupère le vêtement et l'achemine vers l'artisan adapté. Le client peut suivre l'avancement en temps réel.

4. **Retour et récupération**
   Le vêtement est ramené au point partenaire, le client est notifié, et récupère son vêtement quand il le souhaite.

---

## Rôles de la plateforme

L'application frontend gère **5 espaces distincts**, chacun avec son propre layout, sa navigation et ses permissions.

### 🧍 Client
Le rôle principal de l'application.
- Créer un compte, gérer son profil et ses adresses
- Saisir ses mensurations (manuelle ou Scan 3D)
- Passer commande via un wizard multi-étapes
- Choisir un point de dépôt (carte interactive)
- Payer en ligne
- Recevoir et afficher son QR code de commande
- Suivre sa commande en temps réel (timeline de statuts)
- Consulter son historique, ses factures
- Laisser un avis sur la prestation
- (Optionnel) Discuter avec l'artisan via messagerie

### 🧵 Artisan
Le professionnel qui réalise la prestation.
- Recevoir les commandes correspondant à sa spécialité
- Consulter le détail de la commande (photos, mensurations, description, délai)
- Accepter ou refuser une commande
- Mettre à jour l'avancement du travail
- Consulter son historique de prestations et ses notes
- Gérer sa disponibilité / capacité de traitement

### 🏬 Point partenaire (dépôt)
Le commerce local qui reçoit et restitue les vêtements.
- Scanner le QR code du client à la réception
- Mettre à jour le statut (« déposé »)
- Gérer les vêtements en attente (avant collecte / après retour)
- Notifier le client quand le vêtement est prêt
- Confirmer la remise du vêtement (scan de récupération)

### 🚚 Logistique (transporteur)
Le maillon qui achemine les vêtements entre points partenaires et artisans.
- Consulter la liste des collectes à effectuer
- Consulter la liste des livraisons retour
- Mettre à jour le statut de transport

### 🛠️ Admin (back-office)
La supervision globale de la plateforme.
- Gérer les utilisateurs (clients, artisans, points partenaires, transporteurs)
- Valider les artisans et points partenaires
- Gérer les services et la tarification
- Superviser les commandes (dashboard global, litiges, retards)
- Consulter les statistiques (volume, satisfaction, délais moyens)
- Gérer les paiements et commissions

---

## Fonctionnalités

### Fonctionnalités transverses
- Authentification & autorisation par rôle (JWT + routes protégées)
- Notifications centralisées (in-app, avec préférences email/SMS/push)
- Messagerie client ↔ artisan (optionnelle)
- Géolocalisation pour trouver le point partenaire le plus proche
- Suivi en temps réel des commandes (WebSocket)
- Génération et scan de QR codes
- Gestion de fichiers (photos vêtements, scans 3D)
- Design system partagé entre tous les espaces (composants réutilisables)
- Interface responsive, mobile-first

---

## Stack technique

| Catégorie | Choix |
|---|---|
| Build tool | **Vite** |
| Langage | **TypeScript** |
| Librairie UI | **React** |
| Routing | React Router |
| État serveur / cache API | TanStack Query (React Query) |
| État global UI | Zustand |
| Formulaires | React Hook Form + Zod |
| HTTP client | Axios |
| Temps réel | Socket.io-client |
| Carte interactive | Mapbox GL JS |
| QR code | qrcode.react (génération) / html5-qrcode (scan) |
| Paiement | Stripe.js / React Stripe.js |
| Style | Tailwind CSS v4 |
| Icônes | lucide-react |
| Linter | ESLint + Prettier |

---

## Structure du projet

```
src/
├── app/
│   ├── router.tsx              # configuration des routes
│   ├── App.tsx
│   └── providers.tsx           # QueryClientProvider, etc.
│
├── features/                   # organisation par fonctionnalité
│   ├── auth/
│   ├── orders/                 # commandes (OrderWizard, OrderTracking...)
│   ├── measurements/           # mensurations manuelles + Scan 3D
│   ├── partner-points/         # sélection du point de dépôt + carte
│   ├── artisan-dashboard/
│   ├── partner-dashboard/
│   ├── logistics-dashboard/
│   ├── admin/
│   ├── payments/
│   ├── notifications/
│   └── reviews/
│       └── (components/, hooks/, api.ts, types.ts)
│
├── shared/
│   ├── components/             # Button, Card, Modal, Stepper, Timeline...
│   ├── hooks/                  # useAuth, useGeolocation, useWebSocket...
│   ├── lib/                    # axios instance, socket instance
│   ├── utils/
│   └── types/                  # types partagés (User, Role, Status...)
│
├── layouts/
│   ├── ClientLayout.tsx
│   ├── ArtisanLayout.tsx
│   ├── PartnerLayout.tsx
│   └── AdminLayout.tsx
│
├── assets/
├── styles/
└── main.tsx
```

Chaque module de `features/` suit la même organisation : `components/`, `hooks/`, `api.ts` (appels au backend), `types.ts` (contrats de données partagés avec le backend).

---

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd kadel-kouture-frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application est disponible sur `http://localhost:5173`.

---

## Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
VITE_API_Base_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
VITE_MAPBOX_TOKEN=xxxxx
VITE_STRIPE_PUBLIC_KEY=xxxxx
```

> ⚠️ Le fichier `.env` ne doit jamais être commité (déjà présent dans `.gitignore`).

---

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le serveur de développement Vite |
| `npm run build` | Compile TypeScript puis build l'application pour la production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run preview` | Prévisualise le build de production en local |

---

## Conventions de code

- **Organisation feature-based** : chaque fonctionnalité métier vit dans son propre dossier sous `features/`, avec ses composants, hooks, appels API et types.
- **Alias d'imports** : utiliser `@/`, `@features/`, `@shared/`, `@layouts/` plutôt que des chemins relatifs longs (`../../../`).
- **Appels API** : toujours passer par les fonctions définies dans `features/<module>/api.ts`, jamais d'appel Axios direct dans un composant.
- **État serveur** : utiliser React Query (`useQuery` / `useMutation`) via des hooks dédiés (`useCreateOrder`, `useOrderStatus`, etc.), jamais de `fetch`/`axios` brut dans les composants.
- **Formulaires** : React Hook Form + schéma de validation Zod, partagé si possible avec les types du backend.
- **Routing par rôle** : chaque espace (client, artisan, point partenaire, logistique, admin) est protégé par un `ProtectedRoute` vérifiant le rôle de l'utilisateur.