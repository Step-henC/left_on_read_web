//webhook stripe returns

import Stripe from "stripe"
import {stripe} from '@/app/lib/stripe/stripe'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.text() 
   
    const signature = req.headers.get('stripe-signature') as string

    if (!signature) {
        throw new Error('no stripe signature')
    }

    
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SIGNING_SECRET!);

    } catch (e) {
        if (e instanceof Error) {
            console.log(e)
            return NextResponse.json({error: 'webhook error'}, {status: 400})
       }
        console.log(e)
        return NextResponse.json({error: 'webhook error'}, {status: 400})
    }


    const session = event.data.object as Stripe.Checkout.Session

    // if new subscription, save to database
    if (event.type === 'checkout.session.completed') {
        console.log('COMPOLEJFK')


     
        console.log("WE GOOD!")
    }

    if (event.type === 'invoice.payment_succeeded') {
       
    
        console.log("WE PAID!")

    }

    // if we do not return 200 status, stripe will think somehting is wrong and 
    // keep sending webhook
    return NextResponse.json(null, {status: 200})

}