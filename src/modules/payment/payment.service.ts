import stripe from "../../config/stripe";
import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";

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
                `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

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

const usersCollection = () => {

    const db = getDB();
    console.log("Connected Database:", db.databaseName);
    return db.collection("user");

};

const updateUserRole = async (metadata: any) => {

    console.log("Updating User:", metadata);

    const objectId = new ObjectId(metadata.userId);

    console.log("ObjectId:", objectId);
    const allUsers = await usersCollection().find().toArray();

    console.log('all users', allUsers);

    const user = await usersCollection().findOne({
        _id: objectId,
    });

    console.log("Found User:", user);

    const result = await usersCollection().updateOne(
        {
            _id: objectId,
        },
        {
            $set: {
                role: "student",
                education: metadata.education,
                interest: metadata.interest,
                goal: metadata.goal,
            },
        }
    );

    console.log("Mongo Update Result:", result);

    return result;
};

const confirmPayment = async (
    sessionId: string
) => {

    // console.log("Session ID:", sessionId);

    const session =
        await stripe.checkout.sessions.retrieve(sessionId);

    // console.log("Stripe Session:", session);

    // console.log("Payment Status:", session.payment_status);

    // console.log("Metadata:", session.metadata);


    if (!session) {

        return {

            success: false,

            message: "Session not found",

        };

    }

    if (session.payment_status !== "paid") {

        return {

            success: false,

            message: "Payment not completed",

        };

    }

    const metadata = session.metadata;

    if (!metadata) {

        return {

            success: false,

            message: "Metadata not found",

        };

    }

    await updateUserRole(metadata);

    return {

        success: true,

        message: "Payment verified successfully",

    };

};

export const paymentService = {

    createCheckoutSession,

    updateUserRole,

    confirmPayment,

};