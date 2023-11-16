"use client";
import { Button } from "@/components/ui/button";
import Logo from "../../../public/assets/logo.svg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PiPlusCircleBold } from "react-icons/pi";
import { useEffect } from "react";


const Header = () => {
  const router = useRouter();
  
  const { data: session, status } = useSession();
  useEffect(() => {}, [session]);

  return (
    <div className=" justify-evenly flex md:justify-around items-center border-b border-neutral-400 ">
      <div className="flex items-center">
        <Image src={Logo} alt="logo"></Image>

        <div className="pl-4 border-l">
          {status === "authenticated" ? (
            <ul>
              <Link
                href="/coaches"
                className="hidden md:block md:text-lg md:font-medium text-[#230E49] hover:opacity-40 hover:transition-opacity relative z-50"
              >
                coaches
              </Link>
            </ul>
          ) : null}
        </div>
      </div>

      {/* handle mobile part */}
      <div className="md:flex md:gap-6">
        {/* IF THE USER IS NOT AUTH REGISTRATION BUTTON WILL BE SHOWED  */}
        {status !== "authenticated" ? (
          <div className="p-2 flex items-center gap-4">
            <Link href="/login"
            className="font-medium text-md hover:text-[#230E49] relative z-50"
            >login</Link>
            <Button
              className="bg-[#230E49] hover:bg-indigo-950 relative z-50"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          </div>
        ) : (
          // THE USER IS CONNECTED SO WE CALL OUR DROPDOWNMENU LOGIC WE ALSO ADAPTED THIS TO MOBILE SCREEN
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none relative z-50">
                <Avatar>
                  <AvatarFallback className="font-semibold hover:bg-[#230E49] transition hover:text-white">
                    {session.user?.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                  <Link href={`/user/${session?.user.id}/profile`}>
                    Profile
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <Link href={`/user/${session?.user.id}/coachings`}>
                    coachings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
                {session.user.Role === "COACH" ? (
                  <DropdownMenuItem className="md:hidden flex gap-2">
                    create new Post
                    <PiPlusCircleBold />
                  </DropdownMenuItem>
                ) : null}

                <DropdownMenuItem
                  className="md:hidden"
                  onClick={() => router.push("/coaches")}
                >
                  coaches
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <>
          {session?.user?.Role === "COACH" ? (
            <>
              <Button
                className="hidden md:flex md:gap-2 bg-[#230E49] relative z-50"
                onClick={() =>
                  router.push(`/user/${session.user.id}/coachings/create`)
                }
              >
                create new Post
                <PiPlusCircleBold />
              </Button>
            </>
          ) : null}
        </>
      </div>
    </div>
  );
};

export default Header;
