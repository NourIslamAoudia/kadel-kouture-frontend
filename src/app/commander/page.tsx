import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import OrderFlow from "@features/submission/components/OrderFlow";
import {
  isLocale,
  matchLocale,
  type Locale,
} from "@features/landing/i18n/locales";
import { parseOrderPreselection } from "@/common/services";

export const metadata: Metadata = {
  title: "Kadel Kouture",
  robots: { index: false, follow: false },
};

type SearchParams = Record<string, string | string[] | undefined>;

/** Langue : ?lang=… (lien depuis la landing), puis cookie, puis navigateur, puis espagnol. */
async function resolveLocale(params: SearchParams): Promise<Locale> {
  const fromQuery = Array.isArray(params.lang) ? params.lang[0] : params.lang;
  if (fromQuery && isLocale(fromQuery)) return fromQuery;
  const fromCookie = (await cookies()).get("kk_lang")?.value;
  if (fromCookie && isLocale(fromCookie)) return fromCookie;
  return matchLocale((await headers()).get("accept-language"));
}

export default async function CommanderPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const preselection = parseOrderPreselection(params);

  return (
    <OrderFlow
      initialLocale={await resolveLocale(params)}
      initialGarment={preselection.garment}
      initialWork={preselection.work}
    />
  );
}
