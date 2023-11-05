"use client";
import PostComponent from "@/app/_components/post.component";
import Research from "@/app/_components/ResearchBy.component";
import { useRouter } from "next/navigation";
import { findAllPosts } from "@/lib/db.allPosts";
import { useEffect, useState } from "react";
import { TPost } from "@/types/post";
import { RotatingLines } from  'react-loader-spinner'
import { useSession } from "next-auth/react";


const Posts = () => {
  const [datas, setDatas] = useState<TPost[]>([]);
  const { data: session } = useSession();

  const router = useRouter();
  const a = async () => {
    const p = await findAllPosts();
    setDatas(p);
  };

  useEffect(() => {
    a();
  }, [session]);

  return (
    <div className="flex justify-evenly p-2 max-w-[1900px] m-auto gap-10 flex-wrap flex-col">
      <div className="">
        {/* filter params */}

        {/* <Research /> */}
      </div>

      <div className="">
        {datas.length !== 0 ? (
          datas.map((v: TPost, index: number) => {
            const {
              profilePic,
              Title,
              currentCompany,
              description,
              localisation,
              price,
              yearsExperience,
              experienceField,
              id,
              author,
            } = v;
            return (
              <PostComponent
                key={index}
                imageurl={profilePic}
                name={author?.name}
                experienceFiled={experienceField}
                learnMore={() => router.push(`/coaches/${id}`)}
                postTitle={Title}
                description={description}
                experience={yearsExperience}
                localisation={localisation}
                price={String(price)}
                company={currentCompany}
              />
            );
          })
        ) : (
          <div>
            <div className="flex justify-center items-center mt-36">
              <RotatingLines
                strokeColor="purple"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;