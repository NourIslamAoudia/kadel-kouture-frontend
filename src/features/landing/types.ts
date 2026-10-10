/** Réponse de GET /api/landing/stats (kadel-backend). */
export interface FounderOffer {
  limit: number;
  discountPercent: number;
  /** null quand le compteur n'est pas disponible */
  remaining: number | null;
  active: boolean;
}

export interface LandingStats {
  founderOffer: FounderOffer;
  /** null tant que le nombre est trop petit pour être affiché */
  savedGarments: number | null;
}
