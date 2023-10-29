"use client";
import { addComment } from "@/app/actions/addComent";
import { Button, Chip, Divider, Input, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import TalkComment from "./TalkComment";
import { UserResponse } from "@supabase/supabase-js";
import { useState } from "react";
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
  const [showComments, setShowComments] = useState(false);
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
    <div className="bg-primary/10 rounded-xl p-2 flex flex-col gap-2">
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
        <Divider orientation="vertical" />
        <p>{new Date(talk.created_at).toLocaleString()}</p>
      </div>
      <p className="bg-primary/5 rounded p-1 ">{talk.talk}</p>
      <div className="mb-0 mt-auto flex flex-col gap-2 ">
        {talk.talksComments && talk.talksComments.length > 0 && (
          <div className="flex flex-col">
            {showComments ? (
              <>
                {talk.talksComments.map((comment: any) => {
                  return (
                    <TalkComment
                      user={user}
                      key={comment.id}
                      comment={comment}
                    />
                  );
                })}
              </>
            ) : (
              <Button
                size="sm"
                color="primary"
                className="text-xs font-black text-primary bg-transparent"
                onClick={() => setShowComments(true)}
              >
                SHOW COMMENTS
              </Button>
            )}
          </div>
        )}
        {comments &&
          comments.map((comment: any) => {
            if (comment.talkId === talk.id)
              return (
                <TalkComment user={user} key={comment.id} comment={comment} />
              );
          })}

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
