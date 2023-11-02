import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";

export default async function Home() {
  // const { data } = await supabase.from("talks").select("*, talkers (*)");

  // .ilike("talk", "%%");

  return (
    <main className="max-h-[100dvh] w-full h-screen flex flex-col p-2">
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
      <div className=" text-center text-xs flex flex-row gap-2 mx-auto">
        <p>
          created by{" "}
          <Link
            className="text-xs"
            href="https://x.com/dondycles"
            target="_blank"
          >
            @dondycles
          </Link>
        </p>
        <Divider orientation="vertical" />
        <Link href="/" className="text-xs">
          Privacy & Policy
        </Link>
      </div>
    </main>
  );
}
