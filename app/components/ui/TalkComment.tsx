"use client";
import { deleteComment } from "@/app/actions/deleteComment";
import { Button, Link, Spinner } from "@nextui-org/react";
import { UserResponse } from "@supabase/supabase-js";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function TalkComment({
  comment,
  user,
}: {
  comment: any[any];
  user: UserResponse;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const delete_ = async () => {
    setIsDeleting(true);
    const { error, success } = await deleteComment(comment.id);

    if (error) return console.log(error);
    setIsDeleting(false);
  };
  return (
    <div className="text-xs flex flex-row gap-2 justify-between bg-primary/5 p-1 rounded">
      <div className=" flex-1">
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
      {user.data.user?.id === comment.talkTalkerId ? (
        <>
          <Button
            onClick={() => delete_()}
            isIconOnly
            startContent={
              isDeleting ? <Spinner color="primary" size="sm" /> : <FaTrash />
            }
            className="bg-transparent text-danger"
            isDisabled={isDeleting}
          />
        </>
      ) : (
        user.data.user?.id === comment.talkerId && (
          <Button
            onClick={() => delete_()}
            isIconOnly
            startContent={
              isDeleting ? <Spinner color="primary" size="sm" /> : <FaTrash />
            }
            className="bg-transparent text-danger"
            isDisabled={isDeleting}
          />
        )
      )}
    </div>
  );
}
