"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
const CardModal = ({
  coachname,
  book,
  price,
}: {
  coachname: string;
  book: () => Promise<void>;
  price: string;
}) => {
  return (
    <Card className="min-w-[300px] rounded-sm shadow-sm p-3">
      <CardHeader>
        <CardTitle className="mb-5">Book a Session</CardTitle>
        <CardDescription className="flex gap-2">
          <Check />
          money is hold until you validate is all good
        </CardDescription>
        <CardDescription className="flex gap-2">
          <Check />
          refound offered if you are not satisfied 
        </CardDescription>
        <CardDescription className="flex gap-2">
          <Check />
          Schedule around your availability
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center">
        <Button className="max-w-full items-center bg-[#230E49]" onClick={book}>
          Book mock case with {coachname} for ${price}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardModal;
