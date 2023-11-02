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
    .select("*, talksHearters(*), talkers(*), talksComments(*, talkers(*)))")
    .eq("id", params.id)
    .single();

  return (
    <div className="flex px-2 sm:px-12 md:px-32 lg:px-64 xl:px-[300px] 2xl:px-[512px]  pb-20">
      <Talk comments={null} talk={data} user={user} />
    </div>
  );
}
