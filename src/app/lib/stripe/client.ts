import {loadStripe, Stripe} from '@stripe/stripe-js'

//to be PCI client, use this stripe wrapper to download stripe for use in the browser
// stripe must originate from Stripe servers in client
// this wrapper pulls down stripe from stripe servers

//however, this app will not collect payment from browser and will instead delegate payment
// processing to stripe

// in separate folder so as to not be instantiated on every page render

let stripePromise: Promise<Stripe | null>
export const getStripe = () =>  {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! ?? '')
    }
return stripePromise;
}