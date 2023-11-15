import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Trust from "./_components/trust";
import Book from "../../public/assets/book.svg";
import Review from "../../public/assets/review.svg";

import { Check } from "lucide-react";
import bg from "../asset/back.webp";
export default function Home() {
  return (
    <main className="m-auto">
      
            <Button className="bg-[#230E49] relative z-50">
              <Link href="/coaches">browse coaches</Link>
            </Button>
       
    </main>
  );
}
