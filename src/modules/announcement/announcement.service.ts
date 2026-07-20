import { ObjectId } from "mongodb";
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

export const updateAnnouncement = async (id: string, payload: any) => {
  const db = getDB();
  const announcementCollection = db.collection("announcement");

  const { _id, createdAt, ...updateData } = payload;
  const result = await announcementCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updateData, updatedAt: new Date() } }
  );

  return result;
};

export const deleteAnnouncement = async (id: string) => {
  const db = getDB();
  const announcementCollection = db.collection("announcement");

  const result = await announcementCollection.deleteOne({
    _id: new ObjectId(id),
  });

  return result;
};