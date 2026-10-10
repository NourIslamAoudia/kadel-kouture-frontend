import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { matchLocale } from "@features/landing/i18n/locales";

/** « / » : redirection vers la langue du navigateur (espagnol par défaut). */
export default async function RootPage() {
  const requestHeaders = await headers();
  redirect(`/${matchLocale(requestHeaders.get("accept-language"))}`);
}
