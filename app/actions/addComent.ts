"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const addComment = async ({
  values,
  postId,
}: {
  values: FieldValues;
  postId: string;
}) => {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase
    .from("talksComments")
    .insert([{ comment: values.comment, postId: postId }]);

  if (error) return { error: error };

  revalidatePath("/talks");
  return { success: "Talk Added!" };
};
