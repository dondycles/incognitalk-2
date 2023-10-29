"use client";
import { Button, Link } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserResponse } from "@supabase/supabase-js";
import { FaTrash } from "react-icons/fa";

export default function TalkComment({
  comment,
  user,
}: {
  comment: any[any];
  user: UserResponse;
}) {
  const supabase = createClientComponentClient();
  return (
    <div className="bg-primary/5 rounded p-1 text-xs flex flex-row gap-2 justify-between">
      <div>
        <Link size="sm" color="primary" className="cursor-pointer text-xs">
          @{comment.talkers.userName}
        </Link>
        <p>
          <span className="text-primary font-black">//</span> {comment.comment}
        </p>
      </div>
      {user.data.user?.id === comment.userId && (
        <Button
          isIconOnly
          startContent={<FaTrash />}
          className="bg-transparent text-danger"
        />
      )}
    </div>
  );
}
