import { Treservation } from "@/types/reservation";
import { BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownRight } from "lucide-react";
export const dynamic = "force-dynamic"

interface EventRes extends Treservation {
  price?: number;
  coach?: string;
  redirect? : React.MouseEventHandler<HTMLButtonElement>
  title : string
  seeMore: () => void;
}

const EventsComponent = ({
  DateReserved,
  message,
  payed,
  price,
  coach,
  seeMore,
  redirect,
  title, 
}: EventRes) => {
  return (
    <div className="max-w-[70%] border mt-7 min-h-[40px] border-dashed rounded-sm border-neutral-200 p-3 flex items-end justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="font-medium flex gap-2 ">
             1 x {title} with @qs-{coach}<BadgeCheck />
          </h2>
          <Badge variant="outline">payed : {String(payed)}</Badge>
          {!payed ? (
            
              <Button className="bg-green-300"
              onClick={redirect}
              >pay now</Button>
       
          ) : null}
        </div>
        <p className="font-medium mt-1">
          date:{" "}
          <span className="font-semibold text-neutral-600">{DateReserved.toString()}</span>
          <Badge className="ml-3">{`${new Date() > DateReserved ? "event passed" : "event coming"}`}</Badge>
        </p>
        <p className="text-sm font-semibold text-neutral-400">
          {" "}
          price ${String(price)}
        </p>
        <p className="text-xs text-neutral-400">
          The zoom link will be sent you via email 24h before
          the interview{" "}
        </p>
        <div className="mt-3">
          <p className="text-sm">
            optional message for the interviewer:{" "}
            <span className="text-neutral-600 italic">{message}</span>
          </p>
        </div>
      </div>

      <div>
        <Button className="bg-[#230E49] text-sm" onClick={seeMore}>
          see more <ArrowDownRight />
        </Button>
      </div>
    </div>
  );
};

export default EventsComponent;
