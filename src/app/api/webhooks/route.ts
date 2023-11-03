import Stripe from "stripe";
import prisma from "@/lib/db.server";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET as string;


export const POST = async (req: Request) => {

    const buf = await req.text();
    const sig = req.headers.get("stripe-signature")!;
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

        const purchase = event.data.object
        console.log(purchase)
        console.log("event ====", event)
        switch (event?.type) {

            case "payment_intent.succeeded":

                await prisma.reservation.update({
                    where: {
                        id: purchase.id,
                    },
                    data: {
                        payed: true
                    }
                })
                break;
            default:
                console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
                break;
        }
        return NextResponse.json({
            msg: "payment succesfull and reservation created",
            data: event.data

        })

    } catch (error: any) {
        console.log(`❌ Error message: ${error}`);
        return NextResponse.json(
            {
                error: {
                    message: `Webhook Error: ${error}`,
                },
            },
            { status: 400 }
        );
    }

}
