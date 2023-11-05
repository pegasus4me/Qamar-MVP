import Stripe from "stripe";
import Cors from "micro-cors"
import prisma from "@/lib/db.server";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET as string;
const cors = Cors({
    allowMethods: ["POST", "HEAD"],
});

export const POST = async (req: Request) => {

    const buf = await req.text();
    const sig = headers().get("stripe-signature")!;
    let event: Stripe.Event;

    try {

        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);


        switch (event?.type) {

            case "payment_intent.succeeded":
                console.log('icic', event.data.object.metadata.id)
                await prisma.reservation.update({
                    where: {
                        id: event.data.object.metadata.id,
                    },
                    data: {
                        payed: true
                    },
                    include: {
                        reservedBy: true,
                        postReference: true
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
