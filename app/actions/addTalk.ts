"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const addTalk = async (values: FieldValues) => {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase
    .from("talks")
    .insert([{ talk: values.talk }]);

  if (error) return { error: error };

  revalidatePath("/talks");
  return { success: "Talk Added!" };
};
