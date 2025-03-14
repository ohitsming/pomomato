import Stripe from 'stripe';


export async function POST(req: Request) {  
    
    if(!process.env.STRIPE_SECRET_KEY) {
        return new Response(JSON.stringify({ error: 'Missing Keys' }), {
            status: 500
        });
    }
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { priceId } = await req.json();

    try {
        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId, // Use the Price ID from Stripe Dashboard
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });

        return new Response(JSON.stringify({ sessionId: session.id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        return new Response(JSON.stringify({ error: 'Failed to create session' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}