"use client";
import CardModal from "@/app/_components/card.component";
import axios from "axios";
import { TPost } from "@/types/post";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FaHouse } from "react-icons/fa6";
import Image from "next/image";
import DateComponent from "@/app/_components/date.component";
import { ContextProvider } from "@/lib/contexProvider";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { Check } from "lucide-react";
import { VideoIcon } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ShieldQuestion } from "lucide-react";

const PostPage = ({ params }: { params: { postPage: string } }) => {
  const router = useRouter();
  const [data, setData] = useState<TPost[]>([]);
  const [message, setMessage] = useState<string | undefined>("");
  const { data: session, status } = useSession();
  const [sessionId, setSessionId] = useState<string | undefined>("");
  const { date } = useContext(ContextProvider);
  const { toast } = useToast();

  useEffect(() => {
    setSessionId(session?.user.id);
  }, [session]);

  async function fetchData(): Promise<TPost | void> {
    try {
      const res = await axios.get("/api/post/findById", {
        params: {
          PostId: params.postPage,
        },
      });
      setData([res.data.user]);
    } catch (error: any) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [date]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center mt-36">
        <RotatingLines
          strokeColor="purple"
          strokeWidth="2"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }
  async function checkoutLink() {
    if (status === "unauthenticated") {
      toast({
        title: "not connected",
        description: "connect yoursef or create an account to continue",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return router.push("/register");
    }

    const sendNewReservation = await axios.post("/api/reservation/new", {
      message,
      postId: params.postPage,
      authorId: sessionId,
      DateReserved: date,
      authorName: session?.user.name,
    });

    if (sendNewReservation.status !== 200) {
      throw new Error("resevation failed");
    }

    if (sendNewReservation.data?.error === "date already reserved") {
      toast({
        title: "Date non avalaible",
        description: "choose another one to continue your booking 🪄",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }

    console.log("inside function call ====", session?.user.id);

    if (sendNewReservation.status === 200 && session?.user.id) {
      router.push(`/user/${session?.user.id}/coachings`);
    }
  }

  return (
    <div className=" p-5 md:max-w-[1900px] m-auto max-w-[1600px]">
      <Link
        href="/coaches"
        className="font-semibold text-[#230E49] flex gap-3 p-2 mb-6 hove:text-slate-300"
      >
        <ArrowLeft />
        view all coaches
      </Link>
      {data?.length !== 0 ? (
        data?.map((v: TPost, index: number) => (
          <div
            key={index}
            className="flex lg:justify-between lg:max-w-full lg:h-[1060px] lg:flex-row flex-col max-w-fit gap-5"
          >
            <div className="p-5 :min-w-[1300px] border min-h-[50%] border-dashed rounded-md border-slate-300">
              <div className="flex gap-4">
                <div>
                  {v.profilePic && (
                    <Image
                      src={String(v?.profilePic)}
                      alt="image user"
                      width={170}
                      height={170}
                      className="rounded-xs"
                    ></Image>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-medium">{v.author?.name}</h2>
                  <h1 className="text-3xl font-semibold">{v.Title}</h1>
                  <Badge variant="outline" className="mt-4">
                    {v?.experienceField}
                  </Badge>
                  <div className="min-h-[60px] p-2 mt-4 max-w-[500px] text-slate-600">
                    <p className="flex gap-3 text-slate-600">
                      {" "}
                      <FaHouse />
                      {v?.currentCompany}
                    </p>
                    <p>{v?.localisation}</p>
                    <p>experience : {v?.yearsExperience} years</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 max-w-[1000px] p-4 text-slate-600">
                {v?.description}
              </div>
              <div className="flex gap-5">
                <Badge variant="outline" className="mt-4 cursor-pointer">
                  <a href={v?.linkedin as string}>Linkedin</a>
                </Badge>
                <Badge variant="outline" className="mt-4 cursor-pointer">
                  <a href={v?.twitter as string}>Twitter</a>
                </Badge>
                <Badge variant="outline" className="mt-4 cursor-pointer">
                  <a href={v?.whatsApp as string}>whatsApp</a>
                </Badge>
              </div>
              <article className="mt-3 p-3">
                <DateComponent
                  dates={v?.disponibilities}
                  name={v?.author?.name as string}
                />
              </article>

              <div className="p-3 max-w-[850px] flex flex-col ">
                <label className="font-medium text-lg mt-3 mb-2">
                  add optional message
                </label>
                <Textarea
                  placeholder="optional message for the interviewver if you have something to tell him"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setMessage(e.target.value)
                  }
                />
              </div>

              <div className="flex gap-5 mt-5 justify-center">
                <p className="text-sm text-[#230E49] flex items-center gap-4">
                  <Globe />
                  60-min 1:1 session
                </p>
                <p className="text-sm text-[#230E49] flex items-center gap-4">
                  <Check />
                  Verbal on-spot feedback
                </p>
                <p className="text-sm text-[#230E49] flex items-center gap-4">
                  <VideoIcon />
                  sessions hosted on Zoom
                </p>
              </div>
              <div className="mt-5">
                <p className="flex gap-1 text-[#230E49] font-medium">
                how does booking a coach work?
                  <ShieldQuestion />
                </p>
                <div className="font-medium mt-6 text-[#475569]">
                  <p className="mb-2">
                    1 - schedule your preferred date to perform your interview
                    remember each interview has a duration of 60 min
                  </p>
                  <p className="mb-2">
                    2 - add a message if you have something more to say to your
                    coach
                  </p>
                  <p className="mb-2">3 - confirm your booking</p>
                  <p className="mb-2">
                    4 - go to your coaching section and pay for the session.
                    Your money is held  until you validate through an email
                    that all goes well with your interviewer
                  </p>
                </div>
              </div>
            </div>

            <div>
              <CardModal
                coachname={v?.author?.name as string}
                book={() => checkoutLink()}
                price={String(v?.price)}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center mt-36">
          <RotatingLines
            strokeColor="purple"
            strokeWidth="2"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default PostPage;
