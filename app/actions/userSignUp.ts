"use server";
import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// import prisma from "@/prisma/client";
import { FieldValues } from "react-hook-form";

export const userSignUp = async (user: FieldValues) => {
  const email = String(user.talkername + "@gmail.com");
  const password = String(user.password);
  const confirmpassword = String(user.confirmpassword);
  const supabase = createServerActionClient<Database>({ cookies });
  const session = await supabase.auth.getSession();

  if (session.data.session?.user)
    return { error: "You are already logged in!" };

  if (password != confirmpassword) return { error: "Password Did Not Match!" };

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  await supabase.from("talkers").insert([
    {
      talkerId: data.user?.id,
      talkerName: user.talkername,
    },
  ]);

  return { success: data };
};
