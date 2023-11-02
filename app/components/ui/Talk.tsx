"use client";
import { addComment } from "@/app/actions/addComent";
import { Button, Chip, Divider, Input, Spinner } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { usePathname, useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import TalkComment from "./TalkComment";
import { UserResponse } from "@supabase/supabase-js";
import { FaExternalLinkAlt, FaRegComment } from "react-icons/fa";
import { heartTalk } from "@/app/actions/heartTalk";
import { useEffect, useOptimistic, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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

  const [optHearts, updateOptHearts] = useOptimistic(
    talk.talksHearters.length,
    (state, newState) => state + Number(newState)
  );

  const [optHearted, updateOptHearted] = useOptimistic(
    Boolean(
      talk.talksHearters.some(
        (post: any) => post.hearterId === user.data.user?.id
      )
    ),
    (state, newState) => newState as boolean
  );

  // const [optComments, updateOptComments] = useOptimistic(
  //   talk.talksComments.map((comment) => ({
  //     comment: comment.comment,
  //     talker: {
  //       name: comment.talkers.talkerName,
  //       id: comment.talkers.talkerId,
  //     },
  //   })),
  //   (state, newState) => {
  //     return [...state, newState];
  //   }
  // );

  // console.log(
  //   talk.talksComments.map((comment) => ({
  //     id: comment.id,
  //     comment: comment.comment,
  //     talker: {
  //       name: comment.talkers.talkerName,
  //       id: comment.talkers.talkerId,
  //     },
  //   }))
  // );

  const comment = async (values: FieldValues) => {
    if (isSubmitting) return;

    // updateOptComments({
    //   comment: values.comment,
    //   talker: {
    //     name: user.data.user?.email?.replace("@gmail.com", ""),
    //     id: user.data.user?.id,
    //   },
    // });

    const { error, success } = await addComment({
      talkId: talk.id,
      talkTalkerId: talk.talkers.talkerId,
      values: values,
    });
    if (error) return console.log(error);
    reset();
  };
  const heart = async () => {
    if (!optHearted) {
      updateOptHearts(1);
      updateOptHearted(true);
      const { error, success } = await heartTalk({
        talkId: talk.id,
        mode: "adding",
      });
      if (error) return console.log(error);
    }
    if (optHearted) {
      updateOptHearts(-1);
      updateOptHearted(false);
      const { error, success } = await heartTalk({
        talkId: talk.id,
        mode: "deducting",
      });
      if (error) return console.log(error);
    }
  };

  return (
    <div
      className={`bg-primary/10 rounded-xl p-2 flex flex-col gap-2 ${
        Boolean(pathname.match("/talk/")) && "max-w-[800px] w-screen mx-auto"
      }`}
    >
      {!Boolean(pathname.match("/talkers/")) && (
        <div className="flex flex-row gap-2 text-xs  justify-between">
          <Chip
            as={Link}
            href={
              talk.talkerId === user.data.user?.id
                ? "/me"
                : `/talkers/${talk.talkerId}`
            }
            size="sm"
            color="primary"
            className="text-xs"
          >
            @{talk.talkers.talkerName}
          </Chip>
          {!Boolean(pathname.match("/talk/")) && (
            <Link
              href={`/talk/${talk.id}`}
              className="text-[10px] cursor-pointer text-xs w-fit "
            >
              <FaExternalLinkAlt />
            </Link>
          )}
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
      <div className="flex flex-col gap-2 h-full">
        {/* This is the comments fetched from talks page */}
        <div className="flex flex-col-reverse gap-2 mb-auto mt-0">
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
        </div>
        <Divider />
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row items-center">
            <span className="text-[10px]">
              {talk.talksHearters &&
                talk.talksHearters.length != 0 &&
                talk.talksHearters.length}
            </span>
            <Button
              size="sm"
              isIconOnly
              startContent={optHearted ? <AiFillHeart /> : <AiOutlineHeart />}
              className="text-lg bg-transparent text-primary"
              onClick={heart}
            />
          </div>

          <form onSubmit={handleSubmit(comment)} className="flex-1 flex gap-2">
            <Input
              {...register("comment")}
              placeholder="comment"
              variant="bordered"
              color={isSubmitting ? "default" : "primary"}
              size="sm"
              disabled={isSubmitting}
            />
            {isSubmitting && <Spinner size="sm" color="primary" />}
          </form>
        </div>
      </div>
    </div>
  );
}
