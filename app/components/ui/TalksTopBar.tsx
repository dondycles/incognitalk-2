"use client";
import { useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import AddTalkForm from "./AddTalkForm";
import SearchTalkForm from "./SearchTalkForm";
export default function TalksTopBar() {
  const [mode, setMode] = useState<"search" | "talk" | null>(null);
  return (
    <div className="min-h-[40px] px-2 sm:px-4">
      {mode ? (
        (mode === "talk" && (
          <AddTalkForm cancel={() => setMode(null)} key={0} />
        )) ||
        (mode === "search" && (
          <SearchTalkForm cancel={() => setMode(null)} key={1} />
        ))
      ) : (
        <div key={2} className="flex flex-row gap-2 items-center">
          <Button
            isIconOnly
            startContent={<FaPlus />}
            color="primary"
            variant="shadow"
            onClick={() => setMode("talk")}
          />
          <Button
            isIconOnly
            startContent={<FaSearch />}
            color="primary"
            variant="shadow"
            onClick={() => setMode("search")}
          />
        </div>
      )}
    </div>
  );
}
