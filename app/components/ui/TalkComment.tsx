"use client";
import { deleteComment } from "@/app/actions/deleteComment";
import { Button, Link } from "@nextui-org/react";
import { UserResponse } from "@supabase/supabase-js";
import { FaTrash } from "react-icons/fa";

export default function TalkComment({
  comment,
  user,
}: {
  comment: any[any];
  user: UserResponse;
}) {
  const delete_ = async () => {
    const { error, success } = await deleteComment(comment.id);

    if (error) return console.log(error);
  };

  return (
    <div className="text-xs flex flex-row gap-2 justify-between ">
      <div>
        <Link
          href={`/talkers/${comment.talkers.talkerId}`}
          size="sm"
          color="primary"
          className="cursor-pointer text-xs"
        >
          @{comment.talkers.talkerName}
        </Link>
        <p>{comment.comment}</p>
      </div>
      {comment.talkers.userName}
      {/* {isCommentInPost(comment.id, comment.talkers.talks)} */}
      {/*       
      {comment.talkers.talks.map((talk) => {
        return <p>{talk.talk}</p>;
      })} */}
      {/* <div className="flex flex-col gap-2">
        <p>{String(user.data.user?.id === comment.talkerId)}</p>
        <p>{String(user.data.user?.id === comment.talkTalkerId)}</p>
      </div> */}
      {user.data.user?.id === comment.talkTalkerId ? (
        <>
          <Button
            onClick={() => delete_()}
            isIconOnly
            startContent={<FaTrash />}
            className="bg-transparent text-danger"
          />
        </>
      ) : (
        user.data.user?.id === comment.talkerId && (
          <Button
            onClick={() => delete_()}
            isIconOnly
            startContent={<FaTrash />}
            className="bg-transparent text-danger"
          />
        )
      )}
    </div>
  );
}
