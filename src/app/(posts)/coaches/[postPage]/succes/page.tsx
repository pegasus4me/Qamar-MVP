'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import check from "../../../../../../public/assets/check.svg";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
const Succes = () => {
    const {data:session} = useSession()

  return (
    <div className="flex justify-center flex-col items-center gap-4 mt-11 p-4">
      <h1 className="text-2xl font-medium opacity-50">
        Your event have been sheduled 
      </h1>
      <p>thanks for your trust</p>
      <Image src={check} alt="confimation"></Image>
      <Button className="max-w-[300px] bg-[#230E49]">
        <Link href={`/user/${session?.user.id}/coachings`}>go to your profile</Link>
      </Button>
    </div>
  );
};

export default Succes;
