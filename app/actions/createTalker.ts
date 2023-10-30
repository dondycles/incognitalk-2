"use server";
import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const createTalker = async ({
  talkerId,
  talkerName,
}: {
  talkerId: string;
  talkerName: string;
}) => {
  const supabase = createServerActionClient<Database>({ cookies });
  const { error } = await supabase.from("talkers").insert([
    {
      talkerId: talkerId,
      talkerName: talkerName,
    },
  ]);

  if (error) return { error: error };

  return { success: "Talker Added!" };
};
