"use server";
import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function UserLogOut() {
  const supabase = createServerActionClient<Database>({ cookies });
  const session = await supabase.auth.getSession();

  if (!session.data.session?.user) return { error: "No user to log out!" };

  await supabase.auth.signOut();

  return { success: "Logged Out!" };
}
