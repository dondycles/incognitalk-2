import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Nav from "../components/ui/Nav";
export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <main className="max-h-[100dvh] w-full h-screen flex flex-col overflow-y-auto overflow-x-hidden">
      <Nav user={user} />
      {children}
    </main>
  );
}
