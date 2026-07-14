import stripe from "../../config/stripe";

const createCheckoutSession = async (payload: any) => {
    console.log("Payment Payload:", payload);
    const session =
        await stripe.checkout.sessions.create({

            payment_method_types: ["card"],

            mode: "payment",

            line_items: [

                {

                    quantity: 1,

                    price_data: {

                        currency: "usd",

                        unit_amount: 1000,

                        product_data: {

                            name: "Student Registration",

                            description:
                                "Micro Learning Hub Student Registration",

                        },

                    },

                },

            ],

            success_url:
                `${process.env.CLIENT_URL}/payment/success`,

            cancel_url:
                `${process.env.CLIENT_URL}/payment/cancel`,

            metadata: {

                userId: payload.userId,

                name: payload.name,

                email: payload.email,

                education: payload.education,

                interest: payload.interest,

                goal: payload.goal,

            },

        });
    console.log("Stripe Session:", session);

    return {

        success: true,

        url: session.url,

    };

};

export const paymentService = {

    createCheckoutSession,

};