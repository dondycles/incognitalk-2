import LoadMore from "@/app/components/ui/LoadMore";
import Talk from "@/app/components/ui/Talk";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Divider } from "@nextui-org/divider";
import { Suspense } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Chip } from "@nextui-org/chip";

export default async function Talker({
  searchParams,
  params,
}: {
  searchParams: { from: number; to: number; query: string };
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();
  const { data, error }: any = await supabase
    .from("talkers")
    .select("*, talks(*, talkers(*))")
    .eq("talkerId", params.id)
    .range(
      searchParams.from ? searchParams.from : 0,
      searchParams.to ? searchParams.to : 20
    )
    .order("created_at", { ascending: false, foreignTable: "talks" })
    .single();

  return (
    <div className="px-2  sm:px-4 flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
      <div className="flex flex-row gap-2 items-center text-xs">
        <Chip color="primary" size="sm" className="text-white text-xs">
          @{data.talkerName}
        </Chip>
        <Divider orientation="vertical" />
        <p>{new Date(data.created_at).toLocaleDateString()}</p>
      </div>
      <Divider />
      <div className="grid gap-2 grid-cols-fluid overflow-x-hidden overflow-y-auto">
        <Suspense fallback={<Spinner size="sm" color="primary" />}>
          {data.talks.map(async (talk: any[any]) => {
            const comments = await supabase
              .from("talksComments")
              .select("*, talkers(*)")
              .eq("talkId", talk.id)
              .limit(3)
              .order("created_at", { ascending: false });
            if (!comments) return;
            return (
              <Talk
                comments={comments.data}
                user={user}
                key={talk.id}
                talk={talk}
              />
            );
          })}
        </Suspense>
      </div>
      <LoadMore />
    </div>
  );
}
