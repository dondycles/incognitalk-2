import LoadMore from "@/app/components/ui/LoadMore";
import TalksFeed from "@/app/components/ui/TalksFeed";
import TalksTopBar from "@/app/components/ui/TalksTopBar";
import { supabase } from "@/supabase/client";
export default async function Talks({
  searchParams,
}: {
  searchParams: { from: number; to: number; query: string };
}) {
  const { data } = await supabase
    .from("talks")
    .select("*, talkers (*)")
    .range(
      searchParams.from ? searchParams.from : 0,
      searchParams.to ? searchParams.to : 20
    )
    .ilike("talk", `%${searchParams.query ? String(searchParams.query) : ""}%`)
    .order("created_at", { ascending: false });

  return (
    <div className="h-full  w-full pt-0  flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
      <TalksTopBar />
      <TalksFeed talks={data} />
      <LoadMore />
    </div>
  );
}
