import { getDB } from "../../config/db";
import { ICreateHelpDeskPost } from "./helpDeskType";

export const createPostService = async (
  payload: ICreateHelpDeskPost
) => {
  const db = getDB();

  const document = {
    userId: payload.userId,
    issue: payload.issue,
    description: payload.description,
    image: payload.image,
    uimage:payload.uimage,
    name:payload.name,
    reactions: {
      like: [],
      love: [],
      necessary: [],
    },

    comments: [],

    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db
    .collection("helpdesk")
    .insertOne(document);

  return result;
};