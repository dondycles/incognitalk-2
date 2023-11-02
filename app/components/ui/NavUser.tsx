"use client";
import { UserLogOut } from "@/app/actions/userLogOut";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { TbLogout } from "react-icons/tb";
import { gabarito } from "../providers/NextUI";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

export default function NavUser({ user }: { user: User | null }) {
  const route = useRouter();
  const logOut = async () => {
    const { success, error } = await UserLogOut();
    if (error) return console.log(error);
    if (success) {
      route.push("/portal");
    }
  };
  return (
    <Dropdown
      className={` bg-background text-foreground ${gabarito.className} `}
      classNames={{ base: "min-w-[0px] max-w-[144px] w-screen" }}
    >
      <DropdownTrigger>
        <Button
          className="text-xss font-black text-white"
          color="primary"
          variant="shadow"
        >
          {user?.email?.replace("@gmail.com", "")}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          as={Link}
          href="/me"
          key="me"
          startContent={user?.email?.replace("@gmail.com", "")}
          endContent={<FaUser />}
          className="text-xs font-black text-primary font-gabarito"
        />
        <DropdownItem
          onClick={logOut}
          key="logout"
          startContent="LOG OUT"
          endContent={<TbLogout />}
          className="text-xs font-black text-primary font-gabarito"
        />
      </DropdownMenu>
    </Dropdown>
  );
}
