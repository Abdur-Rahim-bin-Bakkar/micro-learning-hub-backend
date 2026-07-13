import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";

export const getUserById = async (id: string) => {
  const db = getDB();

  const user = await db.collection("user").findOne({
    _id: new ObjectId(id),
  });

  return user;
};