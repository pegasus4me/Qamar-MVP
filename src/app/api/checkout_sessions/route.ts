import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const POST = async (req: Request) => {

    const headerList = headers();

    const { ProductName, price, postPageId }
        : { ProductName: string, price: number, postPageId: string } = await req.json()
    try {
        const session = await stripe.checkout.sessions.create({

            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `coaching session with ${ProductName}`,
                        },
                        unit_amount: price
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${headerList.get("origin")}/coaches/${postPageId}`
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