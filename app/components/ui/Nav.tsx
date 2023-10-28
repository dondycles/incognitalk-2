"use client";
import { User } from "@supabase/supabase-js";
import NavUser from "./NavUser";

export default function Nav({ user }: { user: User | null }) {
  return (
    <div className=" w-full flex justify-between items-center p-2 sm:p-4">
      <p className="text-primary font-black text-2xl">incognitalk.</p>
      <NavUser user={user} />
    </div>
  );
}
