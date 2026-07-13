import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";

export const addCommentService = async (
  postId: string,
  userId: string,
  name: string,
  photo: string,
  comment: string
) => {
  const db = getDB();

  const collection = db.collection("helpdesk");

  const newComment = {
    userId,
    name,
    photo,
    comment,
    createdAt: new Date(),
  };

  const result = await collection.updateOne(
    {
      _id: new ObjectId(postId),
    },
    {
      $push: {
        comments: newComment,
      },
      $set: {
        updatedAt: new Date(),
      },
    }
  );

  return result;
};