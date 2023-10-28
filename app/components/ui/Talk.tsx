"use client";
import { Link } from "@nextui-org/react";

export default function Talk({ talk }: { talk: any[any] }) {
  return (
    <div key={talk.id} className="bg-primary/10 rounded-xl p-2">
      <Link href={`/talkers/${talk.talkers.userId}`} className="text-xs">
        @{talk.talkers.userName}
      </Link>
      <p>{talk.talk}</p>
    </div>
  );
}
