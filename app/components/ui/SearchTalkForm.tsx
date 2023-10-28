"use client";
import { Button, Input } from "@nextui-org/react";
import { motion as m } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouce } from "@/lib/hooks/useDebounce";
import { TiCancel } from "react-icons/ti";
export default function SearchTalkForm({ cancel }: { cancel: () => void }) {
  const route = useRouter();
  const [search, setSearch] = useState<string>("");
  const searchParams = useSearchParams();
  const [initialized, setInitialized] = useState(false);
  const [query, setQuery] = useState({
    to: searchParams.get("to") ? searchParams.get("to") : "3",
    from: searchParams.get("from") ? searchParams.get("from") : "0",
    query: searchParams.get("query") ? searchParams.get("query") : "",
  });

  useEffect(() => {
    setQuery({
      to: searchParams.get("to") ? searchParams.get("to") : "3",
      from: searchParams.get("from") ? searchParams.get("from") : "0",
      query: search,
    });
  }, [search]);

  useEffect(() => {
    route.push(`/talks?query=${query.query}&from=${query.from}&to=${query.to}`);
  }, [useDebouce(search)]);

  return (
    <m.div layout className="flex flex-row gap-2">
      <Input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="search it"
        color="primary"
        variant="bordered"
      />
      <Button
        startContent={<TiCancel />}
        isIconOnly
        color="primary"
        variant="shadow"
        onClick={cancel}
        className="text-white text-xl "
      />
    </m.div>
  );
}
