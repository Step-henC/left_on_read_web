// /api/stripe

import { stripe } from "@/lib/stripe/stripe";
import { NextResponse } from "next/server";


const return_url = process.env.NEXT_BASE_URL! + '/'


export async function GET() {
    try {

        //user's first time trying to subscribe
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: return_url,
            cancel_url: return_url,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: 'stevecunningham@outlook.com',
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: 'Left_OnRead',
                            description: "Engage in your books"
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: 'month'
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {id: '1001'}, //need userID for after transaction stripe returns a webhook and we need to know who did the transaction

        })

        return NextResponse.json({url: stripeSession.url})

    } catch (e) {
        console.log(e)
        return NextResponse.json({error: "cannot complete stripe request"}, {status: 500})
    }
}