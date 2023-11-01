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
const PostPage = ({ params }: { params: { postPage: string } }) => {
  
  const [data, setData] = useState<TPost[]>([]);
  const [message, setMessage] = useState<string | undefined>("")
  const { data: session } = useSession();
  
  const { date } = useContext(ContextProvider);

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

  async function sendReservation() {

  }


  useEffect(() => {
    fetchData();
  }, [session, date]);

  console.log("date import via useContext", date);

  return (
    <div className=" p-5 md:max-w-[1900px] m-auto max-w-[1600px]">
      <Link
        href="/coaches"
        className="font-semibold text-[#230E49] flex gap-3 p-2 mb-6 hove:text-slate-300"
      >
        <ArrowLeft />
        view all coaches
      </Link>
      {data.length !== 0
        ? data.map((v: TPost, index: number) => (
            <div
              key={index}
              className="flex lg:justify-between lg:max-w-full lg:h-[1060px] lg:flex-row flex-col max-w-fit gap-5"
            >
              <div className="p-5 lg:min-w-[1300px] border min-h-[50%] border-dashed rounded-md border-slate-300">
                <div className="flex gap-4">
                  <div>
                    <Image
                      src={v.profilePic as string}
                      alt="image user"
                      width={170}
                      height={170}
                      className="rounded-xs"
                    ></Image>
                  </div>
                  <div>
                    <h2 className="text-xl font-medium">{v.author?.name}</h2>
                    <h1 className="text-3xl font-semibold">{v.Title}</h1>
                    <Badge variant="outline" className="mt-4">
                      {v.experienceField}
                    </Badge>
                    <div className="min-h-[60px] p-2 mt-4 max-w-[500px] text-slate-600">
                      <p className="flex gap-3 text-slate-600">
                        {" "}
                        <FaHouse />
                        {v.currentCompany}
                      </p>
                      <p>{v.localisation}</p>
                      <p>experience : {v.yearsExperience} years</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 max-w-[1000px] p-4 text-slate-600">
                  {v.description}
                </div>
                <div className="flex gap-5">
                  <Badge variant="outline" className="mt-4 cursor-pointer">
                    <a href={v.linkedin as string}>Linkedin</a>
                  </Badge>
                  <Badge variant="outline" className="mt-4 cursor-pointer">
                    <a href={v.twitter as string}>Twitter</a>
                  </Badge>
                  <Badge variant="outline" className="mt-4 cursor-pointer">
                    <a href={v.whatsApp as string}>whatsApp</a>
                  </Badge>
                </div>
                <article className="mt-3 p-3">
                  <DateComponent dates={v.disponibilities} name={v.author?.name as string} />
                </article>
                
                <div className="p-3 max-w-[850px] flex flex-col">
                <label className="font-semibold text-lg mt-3 mb-2">add optional message</label>
                  <Textarea
                  placeholder="optional message for the interviewver if you have something to tell him"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <CardModal
                  coachname={v.author?.name as string}
                  book={function (): void {
                    // envoyer vers l'etape 2 : book un temps : puis payer
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default PostPage;
