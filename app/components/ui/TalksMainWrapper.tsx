"use client";
import { motion as m, AnimatePresence } from "framer-motion";
export default function TalksMainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AnimatePresence>{children}</AnimatePresence>;
}
