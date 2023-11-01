import { Badge } from "@/components/ui/badge";
import { FaHouse } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowDownRightIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PostComponent = {
  imageurl: string | undefined | null;
  name: string | undefined;
  experienceFiled: string;
  learnMore: () => void;
  postTitle: string | undefined;
  description: string;
  experience: string;
  localisation: string;
  price: string;
  company: string;
};

const PostComponent = ({
  imageurl,
  name,
  experienceFiled,
  learnMore,
  postTitle,
  description,
  experience,
  localisation,
  price,
  company,
}: PostComponent) => {
  console.log("dd", imageurl);
  return (
    <Card className="min-w-full mb-5 p-4">
      <CardHeader className="flex flex-row gap-4 items-center">
        <Image
          src={imageurl as string}
          alt="image user"
          width={170}
          height={170}
          className="rounded-xs"
        ></Image>

        <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-center">
            <CardTitle className="">{name}</CardTitle>
            <Badge variant="outline">{experienceFiled}</Badge>
          </div>

          <CardTitle className="">{postTitle}</CardTitle>
          <div className="">
            <CardDescription className="flex">
              experience :{" "}
              <span className="font-semibold">{experience} years</span>
            </CardDescription>
            <CardDescription className="flex items-center gap-4">
              {localisation}
            </CardDescription>
            <CardDescription className="flex items-center gap-4 font-bold">
              {" "}
              <FaHouse />
              {company}
            </CardDescription>
            <CardDescription className="mt-2 text-black font-semibold">${price} / 60-min</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-1 flex justify-between ">
        <CardDescription className=" max-w-[900px]">
          {description}
        </CardDescription>
        
        <div>
          <Button className="bg-[#230E49]" onClick={learnMore}>
            learn more{" "}
            <span>
              {" "}
              <ArrowDownRightIcon />
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostComponent;
