import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";

export const getAllHelpPosts = async () => {
  const db = getDB();

  const posts = await db
    .collection("helpdesk")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return posts;
};

export const getSingleHelpPost = async (id: string) => {
  const db = getDB();

  const post = await db.collection("helpdesk").findOne({
    _id: new ObjectId(id),
  });

  return post;
};

export const getMyHelpPosts = async (userId: string) => {
  const db = getDB();

  const posts = await db
    .collection("helpdesk")
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();

  return posts;
};

export const updateHelpPost = async (postId: string, userId: string, payload: any) => {
  const db = getDB();

  const post = await db.collection("helpdesk").findOne({ _id: new ObjectId(postId) });
  if (!post) throw new Error("Post not found");
  if (post.userId !== userId) throw new Error("Unauthorized");

  const { _id, userId: _, createdAt, ...updateData } = payload;
  const result = await db.collection("helpdesk").updateOne(
    { _id: new ObjectId(postId) },
    { $set: { ...updateData, updatedAt: new Date() } }
  );

  return result;
};

export const deleteHelpPost = async (postId: string, userId: string) => {
  const db = getDB();

  const post = await db.collection("helpdesk").findOne({ _id: new ObjectId(postId) });
  if (!post) throw new Error("Post not found");
  if (post.userId !== userId) throw new Error("Unauthorized");

  await db.collection("helpdesk").deleteOne({ _id: new ObjectId(postId) });
  return { deleted: true };
};