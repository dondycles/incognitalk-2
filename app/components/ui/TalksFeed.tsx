"use client";
import { UserResponse } from "@supabase/supabase-js";
import Talk from "./Talk";
export default function TalksFeed({
  talks,
  user,
}: {
  talks: any[] | null;
  user: UserResponse;
}) {
  return (
    <div className="w-full grid grid-cols-fluid gap-2 overflow-x-hidden overflow-y-auto px-2 sm:px-4 pb-20">
      {talks?.map((talk) => {
        return <Talk user={user} key={talk.id} talk={talk} />;
      })}
    </div>
  );
}
