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
      <Image
        src={bg}
        alt="d"
        className="absolute top-0 left-0 opacity-70 z-0 bg-transparent"
      ></Image>

      <section className="">
        <section className="lg:mt-32 mt-11 " id="hero">
          <div className="text-2xl sm:text-2xl md:text-3xl flex justify-center mt-5 lg:text-6xl font-semibold text-center max-w-[100%] m-auto md:max-w-[80%] ">
            <h1 className="text-slate-800">
              Anonymous mock case interviews with consultants from Mckenzie
              Deloitte, BCG, PWC and other top firms
            </h1>
          </div>
          <div className="flex justify-center mt-4 text-center lg:text-xl md:text-md max-w-[800px] m-auto text-md">
            <p className="opacity-60 font-medium">
              Get Better at case interviews by Practicing with experts
              consultants, get feedback and Maximize your case study interviews
              succes rates.
            </p>
          </div>
        </section>
        <div className="flex justify-center gap-3 w-fit m-auto p-3 mt-6">
          <div className="">
            <Button className="bg-[#230E49] relative z-50">
              <Link href="/coaches">browse coaches</Link>
            </Button>
          </div>
        </div>
      </section>

      <Trust />
      <section className="mt-7">
        <article className="m-auto max-w-[80%]">
          <div className="rounded-md p-3">
            <h2 className="text-black text-center mt-4 p-1 lg:text-xl font-medium text-2xl">
              How it works?
            </h2>
            <ul className="text-black m-autolg :max-w-[60%]  md:max-w-[100%]  p-5 text-md flex justify-center flex-wrap md:items-center gap-3 items-center">
              <p className="flex flex-col items-center text-sm">
                <Check /> Book mock interviews whenever you like
              </p>
              <p className="flex flex-col items-center text-sm">
                <Check /> Meet with your interviewer for virtual, fully
                anonymous sessions
              </p>
              <p className="flex flex-col items-center text-sm">
                <Check /> Get detailed, actionable feedback about exactly what
                you need to work on to get the job you deserve
              </p>
            </ul>
          </div>
        </article>

        <article className="max-w-[80%] m-auto flex mt-10 p-2 flex-col xl:flex-row gap-3">
          <div className="p-3 border border-dashed rounded-md shadow-sm">
            <h3 className="font-semibold text-5xl mb-5 max-w-[700px]">
              Book sessions with top tier consultants
            </h3>
            <p className="font-semibold text-sm">
              Browse among the list of coaches that are available
            </p>
            <p className="text-xl max-w-[60%] font-light">
              select the one who fits yours goals and you want to work with.
            </p>
            <p className="text-xl max-w-[60%] font-light">
              Choose your favorite day and organize yourself to be ready on the
              day of the session.
            </p>
            <div className="mt-5">
              <p className="text-xl max-w-[60%] font-light">
                Your interviewer will be an expert with extensive experience as
                a consultant at top firms. You&apos;ll run through exactly the kinds
                of questions you&apos;d see in a real case interview.
              </p>
            </div>
          </div>
          <div className="border border-dashed rounded-lg border-neutral-400 shadow-sm">
            <Image
              src={Book}
              alt="image explication"
              width={800}
              height={800}
            />
          </div>
        </article>
        <article className="max-w-[80%] m-auto flex mt-10 p-2 flex-col xl:flex-row gap-3">
          <div className="border border-dashed rounded-lg border-neutral-400 shadow-sm">
            <Image
              src={Review}
              alt="image explication"
              width={800}
              height={800}
            />
          </div>
          <div className="p-3 border border-dashed rounded-md shadow-sm">
            <h3 className="font-semibold text-5xl mb-5 max-w-[700px]">
              Meet with your interviewer for virtual, fully anonymous sessions
            </h3>
            <p className="text-xl max-w-[60%] font-light">
              You&apos;ll join your interviewer in a Zoom session for a fully
              anonymous session with audio and chat (video is optional).
            </p>
            <div className="mt-4">
              <h3 className="font-semibold text-xl mb-5 max-w-[700px]">
                Get detailed, actionable feedback from experts
              </h3>
              <p className="text-xl max-w-[60%] font-light">
                Each session ends with an in-depth rundown of what you did well
                on and how you can improve—all from a consultant expert.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
