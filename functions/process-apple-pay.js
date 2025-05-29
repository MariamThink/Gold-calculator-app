const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const paymentData = JSON.parse(event.body);

        // Process Apple Pay payment through Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 999, // Amount in cents (9.99 AED)
            currency: 'aed',
            payment_method_data: {
                type: 'card',
                card: {
                    token: paymentData.token
                }
            },
            confirm: true
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
