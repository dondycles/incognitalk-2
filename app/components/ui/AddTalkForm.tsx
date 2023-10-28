"use client";
import { addTalk } from "@/app/actions/addTalk";
import { supabase } from "@/supabase/client";
import { Button, Input, Textarea } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { motion as m } from "framer-motion";
import { TiCancel } from "react-icons/ti";
import { BsFillSendFill } from "react-icons/bs";
export default function AddTalkForm({ cancel }: { cancel: () => void }) {
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const add = async (values: FieldValues) => {
    const { error, success } = await addTalk(values);
    if (error) return setError("post", { message: error.message });

    reset();
    cancel();
  };
  return (
    <form onSubmit={handleSubmit(add)} className="flex flex-col gap-2">
      <Textarea
        color="primary"
        variant="bordered"
        placeholder="Anything, just spill it."
        {...register("talk", { required: "please state your talk." })}
      />
      {errors.post && <ErrorMessage message={String(errors.post.message)} />}
      <div className=" flex flex-row gap-2 justify-end">
        <Button
          type="submit"
          color={isSubmitting ? "default" : "success"}
          disabled={isSubmitting}
          className="text-white font-black"
          isIconOnly
          startContent={<BsFillSendFill />}
        />
        <Button
          startContent={<TiCancel />}
          color={isSubmitting ? "default" : "danger"}
          disabled={isSubmitting}
          onClick={() => {
            reset();
            cancel();
          }}
          className="text-white text-xl "
          isIconOnly
        />
      </div>
    </form>
  );
}

const ErrorMessage = ({ message }: { message: string }) => {
  return <p className="text-danger text-xs">{message}</p>;
};
