import Talk from "@/app/components/ui/Talk";
import TalksFeed from "@/app/components/ui/TalksFeed";
import { Avatar } from "@nextui-org/avatar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function Me() {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("talkers")
    .select(
      "*, talks(*, talksHearters(*, talkers(*)) , talkers(*) , talksComments(*, talkers(*)))"
    )
    .eq("talkerId", user.data.user?.id)
    .single();
  return (
    <div className="h-full  w-full pt-0  flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
      {/* {JSON.stringify(data)} */}
      <div className="flex px-2 sm:px-12 md:px-32 lg:px-64 xl:px-[300px] 2xl:px-[512px]">
        <div className="flex flex-row items-center justify-center gap-2">
          <Avatar />
          <p>@{data.talkerName}</p>
        </div>
      </div>
      <TalksFeed>
        {data.talks?.map((talk) => {
          return <Talk comments={null} user={user} key={talk.id} talk={talk} />;
        })}
      </TalksFeed>
    </div>
  );
}
