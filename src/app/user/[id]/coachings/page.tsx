"use client";
export const dynamic = "force-dynamic";
import { findReservation } from "@/lib/db.reservation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import EventsComponent from "@/app/_components/events.component";
import { useRouter } from "next/navigation";
import { Treservation } from "@/types/reservation";
import { findCoachPosts } from "@/lib/db.allPosts";
import { ExtendPost } from "@/types/post";
import CoachComponent from "@/app/_components/coachPosts.component";
import { ExtendReservation } from "@/types/reservation";
import getStripe from "@/lib/stripejs";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { PiWarningCircle } from "react-icons/pi";
const Coachings = ({ params }: { params: { id: string } }) => {
  const [reservationData, setReservationData] = useState([]);
  const [coachPosts, setCoachPost] = useState([]);
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  async function findUser() {
    const reservations = await findReservation(params.id);
    const coachPosts = await findCoachPosts(params.id);

    setCoachPost(coachPosts.statut);
    setReservationData(reservations.reservations);
  }

  async function payCoaching(id: string) {
    const stripe = await getStripe();
    if (!stripe) throw new Error("Stripe failed to initialize.");

    const findRes = await axios.get("/api/reservation/findById", {
      params: {
        id: id as string,
      },
    });

    try {
      const createPayment = await axios.post("/api/checkout_sessions", {
        price: findRes.data.reservations.postReference.price * 100,
        reservation_Id: findRes.data.reservations.id,
        postPageId: findRes.data.postId,
      });

      let sessionId = createPayment.data.session.id;
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        toast({
          title: "an error occured with stripe",
          description: "retry in few minutes or contact us",
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    findUser();
  }, []);
  return (
    <section>
      <div className="p-4 flex flex-col gap-4 border border-dashed max-w-[1600px] m-auto mt-11 min-h-[400px] rounded-sm border-slate-300 sm:max-w-[80%]">
        <p className="text-sm text-neutral-500">
          new booked events can take some minutes to appear in your profile
        </p>
        {session?.user.Role === "USER" ? (
          <article>
            <div className="flex gap-4">
              <p className="text-xl font-medium text-neutral-800">
                yours events sheduled
              </p>
              <Badge variant="outline">{reservationData?.length} events</Badge>
            </div>

            <>
              {reservationData?.length !== 0 ? (
                reservationData?.map((r: ExtendReservation, index: number) => {
                  return (
                    <EventsComponent
                      key={index}
                      seeMore={() => router.push(`/coaches/${r.postId}`)}
                      message={r.message}
                      payed={r.payed}
                      DateReserved={new Date(r.DateReserved)}
                      price={r.postReference.price}
                      coach={r.postReference.authorName}
                      redirect={() => payCoaching(r.id as string)}
                    />
                  );
                })
              ) : (
                <p>no coming events</p>
              )}
            </>
          </article>
        ) : session?.user.Role === "COACH" ? (
          <article>
            <div className="flex gap-3">
              <p className="text-md font-medium text-neutral-700">
                yours courses created
              </p>
              <Badge
                variant={`${
                  coachPosts.length !== 0 ? "destructive" : "outline"
                }`}
              >
                {coachPosts.length} events
              </Badge>
            </div>

            <div className="mt-4 p-3">
              <p className="text-xl font-medium text-neutral-800">
                the reservations booked for yours courses
              </p>

              {coachPosts.map((res: Treservation, index: number) => {
                return (
                  <>
                    <Badge variant="outline" key={index}>
                      {res.Reservation?.length} courses
                    </Badge>
                  </>
                );
              })}
            </div>

            <>
              {coachPosts.length !== 0
                ? coachPosts.map((r: ExtendPost, index: number) => {
                    return (
                      <CoachComponent
                        key={index}
                        title={r.Title as string}
                        price={String(r.price)}
                        Reservation={r.Reservation}
                        name={""}
                      />
                    );
                  })
                : null}
            </>
            <div className="mt-5">
              <p className="font-medium text-natural-500 flex items-center gap-2">
                frequently asked question
                <PiWarningCircle/>
              </p>
              <div className="max-w-[50%] p-2 border rounded-md border-dotted mt-5 opacity-60">
                <h3 className="font-medium text-md">
                  How would I get paid? <span className="text-xs">(1)</span>
                </h3>
                <p className="mt-3 text-sm text-natural-800">
                  because the platform is still in alpha when an Interview is
                  successfully completed with your student and everything is
                  fine from both sides, you will receive an email in the email
                  address of your registration to get your payout into your bank
                  account
                </p>
                <h3 className="font-medium text-md ">
                  Why user cannot directly pay me?{" "}
                  <span className="text-xs">(2)</span>
                </h3>
                <p className="mt-3 text-sm text-natural-800">
                  for a optimal experience for the both sides and to prevent
                  from scams we have to put a security checkpoint to guarantee
                  the security for the users, after the interview the coach and
                  the student will receive an email to know if all went good. if
                  there are no issue you will receive directly your payout (1)
                </p>
                <h3 className="font-medium text-md">
                  How much time to send my payout?{" "}
                  <span className="text-xs">(3)</span>
                </h3>
                <p className="mt-3 text-sm text-natural-800">
                  2-5 hours after the interview
                </p>
                
                  <a href="mailto:contact@qamarstudio.com"
                  className="font-medium text-md mt-5"
                  >if you have any other question please <span className="underline text-natural-200">contact us</span></a>
                 
                
              </div>
            </div>
          </article>
        ) : null}
      </div>

      <Toaster />
    </section>
  );
};

export default Coachings;
