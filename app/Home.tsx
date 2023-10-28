import { db } from "@/supabase/client";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const talks = await db
    .from("talks")
    .select("*, talks (userId)")

    .ilike("talk", "%%");

  return (
    <main>
      {searchParams["page"] ?? "hi"}
      {JSON.stringify(talks.data)}
    </main>
  );
}
