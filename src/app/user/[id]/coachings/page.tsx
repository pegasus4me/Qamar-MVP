"use client";
export const dynamic = "force-dynamic"
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
import axios from "axios";

const Coachings = ({ params }: { params: { id: string } }) => {
  const [reservationData, setReservationData] = useState([]);
  const [coachPosts, setCoachPost] = useState([]);
  const { data: session } = useSession();

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

    console.log("ddtt", coachPosts)
    try {
      const createPayment = await axios.post("/api/checkout_sessions", {
        price: findRes.data.reservations.postReference.price,
        reservation_Id: findRes.data.reservations.id,
        postPageId: findRes.data.postId,
      });
      let sessionId = createPayment.data.session.id;
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error(stripeError);
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
              <Badge variant="outline">{reservationData.length} events</Badge>
            </div>

            <>
              {reservationData.length !== 0
                ? reservationData.map((r: ExtendReservation, index: number) => {
                    return (
                      <EventsComponent
                        key={index}
                        seeMore={() => router.push(`/coaches/${r.postId}`)}
                        message={r.message}
                        payed={r.payed}
                        DateReserved={new Date(r.DateReserved)}
                        price={r.postReference[0].price}
                        coach={r.postReference[0].authorName}
                        redirect={() => payCoaching(r.id as string)}
                      />
                    );
                  })
                : null}
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

              {coachPosts.map((res: Treservation, index:number) => {
                return (
                  <Badge variant="outline"
                  key={index}
                  >
                    {res.Reservation?.length} courses
                  </Badge>
                );
              })}

            </div>

            <>
              {coachPosts.length !== 0
                ? coachPosts.map((r: ExtendPost, index: number) => {
                  console.log(r)
                    return (
                      <CoachComponent
                        key={index}
                        title={r.Title as string}
                        price={String(r.price)}
                        Reservation={r.Reservation} 
                        name={""}                      />
    
                    );
                     
                  })
                : null}
            </>
          </article>
        ) : null}
      </div>
    </section>
  );
};

export default Coachings;
