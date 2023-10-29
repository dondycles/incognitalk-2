"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const addComment = async ({
  values,
  talkId,
  talkTalkerId,
}: {
  values: FieldValues;
  talkId: string;
  talkTalkerId: UUID;
}) => {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase
    .from("talksComments")
    .insert([
      { comment: values.comment, talkId: talkId, talkTalkerId: talkTalkerId },
    ]);

  if (error) return { error: error };

  revalidatePath("/talks");
  return { success: "Talk Added!" };
};
