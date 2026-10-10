import type { Metadata } from "next";
import OrderFlow from "@features/submission/components/OrderFlow";
import { parseOrderPreselection } from "@/common/services";

export const metadata: Metadata = { title: "Commander · Kadel Kouture" };

export default async function CommanderPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const preselection = parseOrderPreselection(await searchParams);

  return (
    <OrderFlow
      initialGarment={preselection.garment}
      initialWork={preselection.work}
    />
  );
}
