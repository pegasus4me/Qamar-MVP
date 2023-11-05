import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const POST = async (req: Request) => {

    const headerList = headers();

    const { price, postPageId, reservation_Id }
        : { price: number, postPageId: string, reservation_Id: string } = await req.json()

    try {


        const session = await stripe.checkout.sessions.create({

            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `1 x mock case coaching session`,
                        },
                        unit_amount: price
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            payment_intent_data: {
                metadata: {
                    "id": reservation_Id
                }
            },
            success_url: `${headerList.get("origin")}/coaches/${postPageId}/succes`
        })

        if (!session.url) {
            return NextResponse.json(
                {
                    error: {
                        code: "stripe-error",
                        message: "Could not create checkout session",
                    },
                },
                { status: 500 }
            );
        }

        return NextResponse.json({ code: "created", session: session })







    } catch (error: any) {
        console.log('dodod', error)
        return NextResponse.json({ msg: error })
    }
}