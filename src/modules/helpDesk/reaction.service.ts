import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";

export const reactToPostService = async (
    postId: string,
    userId: string,
    reaction: "like" | "love" | "necessary"
) => {

    const db = getDB();

    const collection = db.collection("helpdesk");

    const post = await collection.findOne({
        _id: new ObjectId(postId),
    });

    if (!post) {
        throw new Error("Post not found");
    }

    const reactions = post.reactions;

    const alreadyLiked =
        reactions.like.includes(userId);

    const alreadyLoved =
        reactions.love.includes(userId);

    const alreadyNecessary =
        reactions.necessary.includes(userId);

    reactions.like =
        reactions.like.filter(
            (id: string) => id !== userId
        );

    reactions.love =
        reactions.love.filter(
            (id: string) => id !== userId
        );

    reactions.necessary =
        reactions.necessary.filter(
            (id: string) => id !== userId
        );

    if (
        reaction === "like" &&
        !alreadyLiked
    ) {
        reactions.like.push(userId);
    }

    if (
        reaction === "love" &&
        !alreadyLoved
    ) {
        reactions.love.push(userId);
    }

    if (
        reaction === "necessary" &&
        !alreadyNecessary
    ) {
        reactions.necessary.push(userId);
    }

    await collection.updateOne(
        {
            _id: new ObjectId(postId),
        },
        {
            $set: {
                reactions,
                updatedAt: new Date(),
            },
        }
    );

    return reactions;
};