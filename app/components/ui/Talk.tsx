"use client";
import { addComment } from "@/app/actions/addComent";
import { Button, Chip, Divider, Input, Link } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
export default function Talk({ talk }: { talk: any[any] }) {
  const { handleSubmit, reset, register } = useForm();
  const comment = async (values: FieldValues) => {
    const { error, success } = await addComment({
      postId: talk.id,
      values: values,
    });
    if (error) return console.log(error);
    reset();
  };
  return (
    <div
      key={talk.id}
      className="bg-primary/10 rounded-xl p-2 flex flex-col gap-2"
    >
      <div className="flex flex-row gap-2 text-xs items-center">
        <Chip
          as={Link}
          href={`/talkers/${talk.talkers.userId}`}
          size="sm"
          color="primary"
          className="text-xs"
        >
          @{talk.talkers.userName}
        </Chip>
        <Divider orientation="vertical" />
        <p>{new Date(talk.created_at).toLocaleString()}</p>
      </div>
      <Divider />
      <p>
        <span className="text-primary font-black">/</span> {talk.talk}
      </p>
      <div className="flex flex-row gap-2">
        <Button
          isIconOnly
          startContent={<AiOutlineHeart />}
          className="text-2xl bg-transparent text-primary"
        />
        <form onSubmit={handleSubmit(comment)} className="flex-1">
          <Input
            {...register("comment")}
            placeholder="comment"
            variant="bordered"
            color="primary"
          />
        </form>
      </div>
      <div className="flex flex-col gap-2">
        {talk.talksComments.length ? (
          talk.talksComments.map((comment: any) => {
            return (
              <div className="bg-primary/5 rounded p-1 text-xs">
                <Link
                  size="sm"
                  color="primary"
                  className="cursor-pointer text-xs"
                >
                  @{comment.talkers.userName}
                </Link>
                <p>
                  <span className="text-primary font-black">//</span>{" "}
                  {comment.comment}
                </p>
              </div>
            );
          })
        ) : (
          <div className="bg-primary/5 rounded p-1  text-xs text-center">
            <p>no comments yet...</p>
          </div>
        )}
      </div>
    </div>
  );
}
