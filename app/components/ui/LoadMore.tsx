"use client";
import { Button, ButtonGroup } from "@nextui-org/react";
import {
  usePathname,
  useRouter,
  useSearchParams,
  useParams,
} from "next/navigation";
import { useEffect, useState } from "react";

export default function LoadMore() {
  const searchParams = useSearchParams();
  const route = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState({
    to: searchParams.get("to"),
    from: searchParams.get("from"),
    query: searchParams.get("query"),
  });
  const [range, setRange] = useState(Number(query.to));

  useEffect(() => {
    setQuery({
      to: searchParams.get("to") ? searchParams.get("to") : "20",
      from: searchParams.get("from") ? searchParams.get("from") : "0",
      query: searchParams.get("query") ? searchParams.get("query") : "",
    });
  }, [searchParams, pathname]);

  return (
    <Button
      className="fixed bottom-2 left-[50%] translate-x-[-50%]"
      onClick={() => {
        if (pathname === "/talks")
          route.push(
            `/talks?query=${query.query}&from=${query.from}&to=${String(
              Number(query.to) + 20
            )}`
          );

        if (pathname === `/talkers/${pathname.replace("/talkers/", "")}`)
          route.push(
            `/talkers/${pathname.replace("/talkers/", "")}?query=${
              query.query
            }&from=${query.from}&to=${String(Number(query.to) + 20)}`
          );
      }}
    >
      Load More
    </Button>
  );
}
