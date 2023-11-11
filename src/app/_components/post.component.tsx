import { Badge } from "@/components/ui/badge";
import { FaHouse } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { GoLocation } from "react-icons/go";

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
  name: string | undefined;
  experienceFiled: string;
  learnMore: () => void;
  postTitle: string | undefined;
  description: string;
  experience: string;
  localisation: string;
  price: string;
  company: string;
  sessionFormat: string;
};

const PostComponent = ({
  name,
  experienceFiled,
  sessionFormat,
  learnMore,
  postTitle,
  description,
  experience,
  localisation,
  price,
  company,
}: PostComponent) => {
  return (
    <Card className="max-w-[1300px] border  mb-5 p-3 m-auto ">
      <CardHeader className="flex flex-row gap-4 items-center">
        <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-center p-1">
            <CardTitle className="text-md opacity-40">@qs-{name}</CardTitle>
            <Badge variant="outline">{experienceFiled}</Badge>
          </div>
          <div>
          <Badge variant="destructive">{sessionFormat}</Badge>
          </div>

          <CardTitle className="">{postTitle}</CardTitle>
          <div className="">
            <CardDescription className="flex">
              experience :{" "}
              <span className="font-semibold">{experience} years</span>
            </CardDescription>
            <CardDescription className="flex items-center gap-4">
              <GoLocation/>{localisation}
            </CardDescription>
            <CardDescription className="flex items-center gap-4 font-bold">
              {" "}
              <FaHouse />
              {company}
            </CardDescription>
            <CardDescription className="mt-2 text-black font-semibold">
              ${price} / 60-min
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-1 flex justify-between flex-wrap gap-2">
        <CardDescription className=" max-w-[900px]">
          {description.slice(0, 400)}{" "}
          <span className="opacity-60">learn more...</span>
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
