"use client";
import { User } from "@supabase/supabase-js";
import NavUser from "./NavUser";
import { Link } from "@nextui-org/react";

export default function Nav({ user }: { user: User | null }) {
  return (
    <div className=" w-full flex justify-between items-center p-2 sm:p-4">
      <Link href="/talks" className="text-primary font-black text-2xl">
        incognitalk.
      </Link>
      <NavUser user={user} />
    </div>
  );
}
