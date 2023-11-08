"use client";
import { BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownRight } from "lucide-react";
import { Treservation } from "@/types/reservation";
import { useRouter } from "next/navigation";


const CoachComponent = ({
  title,
  price,
  Reservation,
  name,
}: {
  title: string;
  price: string;
  Reservation: Treservation[] | undefined;
  name : string
}) => {
  const router = useRouter();
  return (
    <>
    <div className="max-w-[70%] border mt-7 min-h-[40px] border-dashed rounded-sm border-neutral-200 p-3 flex items-end justify-between">
      
      <div>
        <div className="flex items-center gap-3">
          <h2 className="font-medium flex gap-2 ">
            1 x mock case interview with {title}
            <BadgeCheck />
            
          </h2>
        </div>

        <p className="text-sm font-semibold text-neutral-600">
          {" "}
          price ${String(price)}
        </p>

        {Reservation?.length !== 0
          ? Reservation?.map((one: Treservation, index: number) => (
              <div key={index} className="mb-4 p-3">
                <Badge variant="outline">payed : {String(one.payed)}</Badge>
                <p className="font-medium mt-1">
                  date:{" "}
                  <span className="font-semibold text-neutral-600">
                    booked for : {new Date(one.DateReserved).toString()}
                    {/* <Badge className="ml-3">{`${new Date() > one.DateReserved ? "event passed" : "event coming"}`}</Badge> */}
                  </span>
                </p>

                <p className="text-xs text-neutral-400">
                  The zoom link will be sent to you via email 24h before the
                  interview
                </p>
                <div className="mt-3">
                  <p className="text-sm">
                    optional message for the interviewer:{" "}
                    <span className="text-neutral-600 italic">
                      {one.message}
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <Button
                    className="bg-[#230E49] text-sm"
                    onClick={() => router.push(`/coaches/${one.postId}`)}
                  >
                    see more <ArrowDownRight />
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
    </>
  );
};

export default CoachComponent;
