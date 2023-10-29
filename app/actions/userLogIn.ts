"use server";
// import prisma from "@/prisma/client";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const userLogIn = async (user: FieldValues) => {
  const email = String(user.talkername + "@gmail.com");
  const password = String(user.password);
  const supabase = createServerActionClient({ cookies });
  const session = await supabase.auth.getSession();

  if (session.data.session?.user)
    return { error: "You are already logged in!" };

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  return { success: data };
};
