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