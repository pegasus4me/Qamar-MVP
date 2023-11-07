import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import desc from "../../public/assets/desc.svg"
export default function Home() {
  return (
    <main className="max-w-[70%] m-auto">
    <section className="lg:mt-32 mt-11" id="hero">
        <div className="text-5xl sm:text-5xl md:text-6xl flex justify-center mt-6 lg:text-8xl font-semibold text-center max-w-[800px] m-auto md:max-w-[1000px] ">
          <h1 className="text-slate-800">
            Case study interview{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-[#230E49] bg-clip-text text-transparent">
              made Easy
            </span>
          </h1>
        </div>
        <div className="flex justify-center mt-6 text-center lg:text-xl md:text-md max-w-[800px] m-auto text-md">
          <p className="opacity-60 font-medium">
            Maximize your case study interviews succes rate the time with
            customized, personal 1:1 mock interviews with experts in your field.
          </p>
        </div>
      </section>
      <div className="flex justify-center gap-3 w-fit m-auto p-3 mt-6">
          <div className="">
            <Button className='bg-[#230E49]'><Link href="/coaches">browse coaches</Link></Button>
          </div>
        </div>

        <section className="lg:mt-10 mt-5">
        <div className=" rounded-md h-fit lg:max-w-[1300px] m-auto p-4 ">
          <h2 className="text-slate-800 text-center mt-1 p-2 text-4xl font-bold">
            The current{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-[#230E49] bg-clip-text text-transparent">
              problem
            </span>
          </h2>
          <p className="font-medium text-center lg:text-lg mt-2 opacity-60 text-md ">
            In the competitive job market, case study interviews are vital.
            However, a gap exists between academic resources and real-world
            interview demands. To bridge this gap, students need practical
            experience with industry experts, enhancing their interview skills
            and marketability.
          </p>
        </div>
      </section>
      <section className="mt-7">
        <article className=" max-w-[1300px] m-auto">
          <div>
            <h2 className="text-slate-800 text-center mt-1 p-2 lg:text-4xl font-bold text-2xl">
              How Qamar helps graduate land their{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-[#230E49] bg-clip-text text-transparent">
                dream Job
              </span>
            </h2>
          </div>
          <p className="font-medium text-center lg:text-lg mt-2 opacity-60 text-md ">
            Qamar aims to enhance the effectiveness of learning by connecting
            MBA students, both undergraduate and graduate, with industry experts
            and coaches our primary objective is to :{" "}
          </p>
          <div className='flex justify-center mt-10 mb-10 border p-5 rounded-lg border-dashed border-neutral-300 bg-slate-50'>
          <Image src={desc} alt='img'></Image>
          </div>
           
          <p className="font-medium text-center text-lg opacity-60 ">
            {" "}
            This approach supercharges the power of practice, making the
            transition from academic theory to professional application more
            seamless and comprehensible.
          </p>
        </article>
      </section>
    </main>
  )
}
