import LoadMore from "@/app/components/ui/LoadMore";
import TalksFeed from "@/app/components/ui/TalksFeed";
import TalksTopBar from "@/app/components/ui/TalksTopBar";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Talk from "@/app/components/ui/Talk";
export default async function Talks({
  searchParams,
}: {
  searchParams: { from: number; to: number; query: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();
  const { data } = await supabase
    .from("talks")
    .select("*, talksHearters (*), talkers (*), talksComments (*, talkers(*))")
    .range(
      searchParams.from ? searchParams.from : 0,
      searchParams.to ? searchParams.to : 20
    )
    .range(0, 2, { foreignTable: "talksComments" })
    .ilike("talk", `%${searchParams.query ? String(searchParams.query) : ""}%`)
    .order("created_at", { ascending: false })
    .order("created_at", { ascending: false, foreignTable: "talksComments" });

  console.log(data);

  return (
    <div className="h-full  w-full pt-0  flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
      <TalksTopBar />
      <TalksFeed>
        {data?.map((talk) => {
          return <Talk comments={null} user={user} key={talk.id} talk={talk} />;
        })}
      </TalksFeed>
      <LoadMore />
    </div>
  );
}
