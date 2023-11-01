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
const CardModal = ({coachname,  book }: { coachname: string; book: () => void }) => {
  return (
    <Card className="min-w-[300px] rounded-sm shadow-sm p-3">
      <CardHeader>
        <CardTitle className="mb-5">Book a Session</CardTitle>
        <CardDescription className="flex gap-2">
          <Check />
          60-min 1:1 session on Zoom
        </CardDescription>
        <CardDescription className="flex gap-2">
          <Check />
          Verbal on-spot feedback
        </CardDescription>
        <CardDescription className="flex gap-2">
          <Check />
          Schedule around your availability
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center">
        <Button className="max-w-full items-center" onClick={book}>
          Book mock case with {coachname}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardModal;
