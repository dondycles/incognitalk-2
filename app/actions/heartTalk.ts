"use server";
import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const heartTalk = async ({
  talkId,
  mode,
}: {
  talkId: UUID;
  mode: "adding" | "deducting";
}) => {
  const supabase = createServerActionClient<Database>({ cookies });
  console.log(mode);
  if (mode === "adding") {
    const { error } = await supabase
      .from("talksHearters")
      .insert([{ talkId: talkId }]);
    if (error) return { error: error };
  }
  if (mode === "deducting") {
    const { error } = await supabase
      .from("talksHearters")
      .delete()
      .eq("talkId", talkId);
    if (error) return { error: error };
  }

  revalidatePath("/talks");
  return { success: "Talk Added!" };
};
