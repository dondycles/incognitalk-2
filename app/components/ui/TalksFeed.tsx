"use client";
import { Link } from "@nextui-org/react";
import { motion as m } from "framer-motion";
import Talk from "./Talk";
export default function TalksFeed({ talks }: { talks: any[] | null }) {
  return (
    <div className="w-full grid grid-cols-fluid gap-2 overflow-x-hidden overflow-y-auto px-2 sm:px-4">
      {talks?.map((talk) => {
        return <Talk key={talk.id} talk={talk} />;
      })}
    </div>
  );
}
