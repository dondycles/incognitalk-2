import LoadMore from "@/app/components/ui/LoadMore";
import Talk from "@/app/components/ui/Talk";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Divider } from "@nextui-org/divider";

export default async function Talker({
  searchParams,
  params,
}: {
  searchParams: { from: number; to: number; query: string };
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("talkers")
    .select("*, talks (*, talkers (*), talksComments (*, talkers(*)))")
    .eq("talkerId", params.id)
    .range(
      searchParams.from ? searchParams.from : 0,
      searchParams.to ? searchParams.to : 20,
      { foreignTable: "talks" }
    )
    .single();

  return (
    <div className="px-2  sm:px-4 flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
      <div className="flex flex-row gap-2 text-xs">
        <p className="text-primary">@{data.talkerName}</p>
        <Divider orientation="vertical" />
        <p className="text-primary">
          {new Date(data.created_at).toLocaleDateString()}
        </p>
      </div>
      <Divider />
      <div className="grid gap-2 grid-cols-fluid overflow-x-hidden overflow-y-auto">
        {data.talks.map((talk: any[any]) => {
          return <Talk user={user} key={talk.id} talk={talk} />;
        })}
      </div>
      <LoadMore />
    </div>
  );
}
