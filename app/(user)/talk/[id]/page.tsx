import Talk from "@/app/components/ui/Talk";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function TalkPage({
  searchParams,
  params,
}: {
  searchParams: { from: number; to: number; query: string };
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("talks")
    .select("*")
    .eq("id", params.id)
    .range(
      searchParams.from ? searchParams.from : 0,
      searchParams.to ? searchParams.to : 20,
      { foreignTable: "talks" }
    )
    .order("created_at", { ascending: false, foreignTable: "talks" });

  return <Talk comments={null} talk={data} user={user} />;
}
