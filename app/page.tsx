import { Button } from "@nextui-org/button";
import Link from "next/link";

export default async function Home() {
  // const { data } = await supabase.from("talks").select("*, talkers (*)");

  // .ilike("talk", "%%");

  return (
    <main className="max-h-[100dvh] w-full h-screen flex p-2">
      <div className=" max-w-[500px] m-auto flex flex-col gap-2">
        <h1 className="text-3xl font-black text-primary">incognitalk.</h1>
        <p>Anonymously revealing the world, one secret at a time.</p>
        <Button
          as={Link}
          href="/portal"
          className="text-white font-black text-xs"
          color="primary"
          variant="shadow"
        >
          START.
        </Button>
      </div>
    </main>
  );
}
