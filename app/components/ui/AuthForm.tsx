"use client";
import { Button, Input, Link, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { userSignUp } from "../../actions/userSignUp";
import { userLogIn } from "../../actions/userLogIn";
import { useRouter } from "next/navigation";
export default function AuthForm() {
  const {
    register,
    setError,
    getValues,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const route = useRouter();
  const submit = async (values: FieldValues) => {
    if (mode === "signup") {
      const { error, success } = await userSignUp(values);

      if (error) return console.log(error);
      route.replace("/talks");
    }
    if (mode === "login") {
      const { error, success } = await userLogIn(values);

      if (error) return console.log(error);
      route.replace("/talks");
    }
  };

  useEffect(() => {
    reset();
  }, [mode]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-2 max-w-[350px] w-screen m-auto bg-foreground/5 px-4 py-8 rounded-xl"
    >
      <p className="text-primary font-black text-3xl">incognitalk.</p>
      {mode === "login" && (
        <>
          <Input
            {...register("talkername", {
              required: "please input your username",
            })}
            placeholder="username"
            variant="bordered"
            color="primary"
          />
          {errors.talkername && (
            <ErrorMessage message={String(errors.talkername.message)} />
          )}
          <Input
            {...register("password", {
              required: "please input your password",
            })}
            placeholder="password"
            variant="bordered"
            color="primary"
          />{" "}
          {errors.password && (
            <ErrorMessage message={String(errors.password.message)} />
          )}
        </>
      )}
      {mode === "signup" && (
        <>
          <Input
            {...register("talkername", {
              required: "please input your username",
            })}
            placeholder="username"
            variant="bordered"
            color="primary"
          />
          {errors.talkername && (
            <ErrorMessage message={String(errors.talkername.message)} />
          )}
          <Input
            {...register("password", {
              required: "please input your password",
            })}
            placeholder="password"
            variant="bordered"
            color="primary"
          />
          {errors.password && (
            <ErrorMessage message={String(errors.password.message)} />
          )}
          <Input
            {...register("confirmpassword", {
              required: "please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Password did not match!",
            })}
            placeholder="confirm password"
            variant="bordered"
            color="primary"
          />
          {errors.confirmpassword && (
            <ErrorMessage message={String(errors.confirmpassword.message)} />
          )}
        </>
      )}
      <Button
        type="submit"
        disableAnimation={isSubmitting}
        disabled={isSubmitting}
        className="text-xs font-black text-white"
        variant="shadow"
        color={isSubmitting ? "default" : "primary"}
      >
        {isSubmitting ? (
          <Spinner size="sm" color="primary" />
        ) : (
          (mode === "login" && "LOG IN") || (mode === "signup" && "SIGN UP")
        )}
      </Button>
      <Link
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
        className="mx-auto cursor-pointer text-sm"
      >
        {mode === "login" && "or create an account"}
        {mode === "signup" && "already have an account?"}
      </Link>
    </form>
  );
}

const ErrorMessage = ({ message }: { message: string }) => {
  return <p className="text-danger text-xs">{message}</p>;
};
