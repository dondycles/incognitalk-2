"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// import prisma from "@/prisma/client";
import { FieldValues } from "react-hook-form";

export const userSignUp = async (user: FieldValues) => {
  const email = String(user.username + "@gmail.com");
  const password = String(user.password);
  const confirmpassword = String(user.confirmpassword);
  const supabase = createServerActionClient({ cookies });
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

  // await prisma.users.create({
  //   data: {
  //     userId: data.user?.id as string,
  //     userName: user.username,
  //   },
  // });

  return { success: data };
};
