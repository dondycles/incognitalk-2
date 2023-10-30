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
    .select("*, talkers(*), talksComments(*, talkers(*)))")
    .eq("id", params.id)
    .single();

  console.log(data);

  return <Talk comments={null} talk={data} user={user} />;
}
