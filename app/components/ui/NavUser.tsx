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
      className={` bg-background text-foreground `}
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
          onClick={logOut}
          key="logout"
          startContent="LOG OUT"
          endContent={<TbLogout />}
          className="text-xs font-black text-primary"
        />
      </DropdownMenu>
    </Dropdown>
  );
}
