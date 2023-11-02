"use client";
import { User } from "@supabase/supabase-js";
import NavUser from "./NavUser";
import { Link } from "@nextui-org/react";

export default function Nav({ user }: { user: User | null }) {
  return (
    <div className=" w-full flex justify-between items-center py-2 sm:py-4 px-2 sm:px-12 md:px-32 lg:px-64 xl:px-[300px] 2xl:px-[512px] ">
      <Link href="/talks" className="text-primary font-black text-2xl">
        incognitalk.
      </Link>
      <NavUser user={user} />
    </div>
  );
}
