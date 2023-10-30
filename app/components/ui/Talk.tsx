"use client";
import { addComment } from "@/app/actions/addComent";
import { Button, Card, Chip, Divider, Input } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import TalkComment from "./TalkComment";
import { UserResponse } from "@supabase/supabase-js";
import { FaRegComment } from "react-icons/fa";
export default function Talk({
  talk,
  user,
  comments,
}: {
  talk: any[any];
  comments: any[any];
  user: UserResponse;
}) {
  const pathname = usePathname();
  const {
    handleSubmit,
    reset,
    register,
    formState: { isSubmitting },
  } = useForm();

  const comment = async (values: FieldValues) => {
    if (isSubmitting) return;
    const { error, success } = await addComment({
      talkId: talk.id,
      talkTalkerId: talk.talkers.talkerId,
      values: values,
    });
    if (error) return console.log(error);
    reset();
  };
  return (
    <div
      className={`bg-primary/10 rounded-xl p-2 flex flex-col gap-2 ${
        Boolean(pathname.match("/talk/")) && "max-w-[800px] w-screen mx-auto"
      }`}
    >
      {!Boolean(pathname.match("/talkers/")) && (
        <div className="flex flex-row gap-2 text-xs items-center">
          <Chip
            as={Link}
            href={`/talkers/${talk.talkerId}`}
            size="sm"
            color="primary"
            className="text-xs"
          >
            @{talk.talkers.talkerName}
          </Chip>
        </div>
      )}

      <p className="bg-primary/5 rounded p-1 ">{talk.talk}</p>
      <p className="text-[10px] opacity-50 text-right">
        {new Date(talk.created_at).toLocaleString()}
      </p>
      <Divider />
      {/* This is the comments fetched from talks page */}
      {talk.talksComments && (
        <div className="text-[10px] opacity-50 text-left flex flex-row-re gap-2 justify-center items-center">
          {talk.talksComments.length > 0 ? (
            <>
              <span>comments</span> <FaRegComment />
            </>
          ) : (
            <>
              <span>no comments yet</span> <FaRegComment />
            </>
          )}
        </div>
      )}
      {/* This is the comments fetched from talkers page */}
      {comments && (
        <div className="text-[10px] opacity-50 text-left flex flex-row-re gap-2 justify-center items-center">
          {comments.length > 0 ? (
            <>
              <span>comments</span> <FaRegComment />
            </>
          ) : (
            <>
              <span>no comments yet</span> <FaRegComment />
            </>
          )}
        </div>
      )}
      <div className="mb-0 mt-auto flex flex-col gap-2 ">
        {/* This is the comments fetched from talks page */}
        <div className="flex flex-col">
          {talk.talksComments && talk.talksComments.length > 0 && (
            <>
              {talk.talksComments.map((comment: any) => {
                return (
                  <TalkComment user={user} key={comment.id} comment={comment} />
                );
              })}
            </>
          )}
          {/* This is the comments fetched from talkers page */}
          {comments && comments.length > 0 && (
            <>
              {comments.map((comment: any) => {
                return (
                  <TalkComment user={user} key={comment.id} comment={comment} />
                );
              })}
            </>
          )}
          <Link
            href={`/talk/${talk.id}`}
            className="text-[10px] mx-auto cursor-pointer"
          >
            view talk
          </Link>
        </div>
        <Divider />
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
      </div>
    </div>
  );
}
