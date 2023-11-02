"use client";
export default function TalksFeed({ children }: { children: React.ReactNode }) {
  return (
    // <div className="w-full grid grid-cols-fluid gap-2 overflow-x-hidden overflow-y-auto px-2 sm:px-4 pb-20">
    //   {children}
    // </div>
    <div className="overflow-x-hidden overflow-y-auto">
      <div className="w-full mx-auto flex flex-col gap-2 px-2 sm:px-12 md:px-32 lg:px-64 xl:px-[300px] 2xl:px-[512px]  pb-20">
        {children}
      </div>
    </div>
  );
}
