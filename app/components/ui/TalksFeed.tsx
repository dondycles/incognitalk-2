"use client";
export default function TalksFeed({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full grid grid-cols-fluid gap-2 overflow-x-hidden overflow-y-auto px-2 sm:px-4 pb-20">
      {children}
    </div>
  );
}
