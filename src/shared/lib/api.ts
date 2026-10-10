/** URL du backend Express (kadel-backend) : toute la logique et les endpoints y vivent. */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001").replace(/\/$/, "");
