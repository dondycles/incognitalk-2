"use server";
import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const deleteComment = async (id: UUID) => {
  const supabase = createServerActionClient<Database>({ cookies });
  const { error } = await supabase.from("talksComments").delete().eq("id", id);

  console.log(id);

  if (error) return { error: error };

  revalidatePath("/talks");
  return { success: "Talk Added!" };
};
