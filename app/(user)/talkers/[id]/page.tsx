import LoadMore from "@/app/components/ui/LoadMore";
import Talk from "@/app/components/ui/Talk";
import { supabase } from "@/supabase/client";
import { Divider } from "@nextui-org/divider";
import { UUID } from "crypto";

export default async function Talker({
  searchParams,
  params,
}: {
  searchParams: { from: number; to: number; query: string };
  params: { id: string };
}) {
  const { data, error } = await supabase
    .from("talkers")
    .select("*, talks (*, talkers(*))")
    .eq("userId", params.id)
    .range(
      searchParams.from ? searchParams.from : 0,
      searchParams.to ? searchParams.to : 20,
      { foreignTable: "talks" }
    )
    .single();

  console.log(data);
  return (
    <div className="px-2  sm:px-4 flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
      <div className="flex flex-row gap-2 text-xs">
        <p className="text-primary">@{data.userName}</p>
        <Divider orientation="vertical" />
        <p className="text-primary">
          {new Date(data.created_at).toLocaleDateString()}
        </p>
      </div>
      <Divider />
      <div className="grid gap-2 grid-cols-fluid overflow-x-hidden overflow-y-auto">
        {data.talks.map((talk: any[any]) => {
          return <Talk key={talk.id} talk={talk} />;
        })}
      </div>
      <LoadMore />
    </div>
  );
}
