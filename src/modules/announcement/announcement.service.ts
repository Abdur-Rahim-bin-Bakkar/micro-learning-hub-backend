import { getDB } from "../../config/db";

export const getAllAnnouncements = async () => {
  const db = getDB();

  return await db
    .collection("announcement")
    .find({
      status: "published",
    })
    .sort({
      createdAt: -1,
    })
    .toArray();
};



// CREATE ANNOUNCEMENT

export const createAnnouncement = async (payload: any) => {
  const db = getDB();

  const announcementCollection = db.collection("announcement");

  const result = await announcementCollection.insertOne({
    ...payload,
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return result;
};