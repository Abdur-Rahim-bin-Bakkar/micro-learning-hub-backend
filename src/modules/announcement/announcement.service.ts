import { getDB } from "../../config/db";



export const getAllAnnouncements = async()=>{


    const db = getDB();



    const announcementsCollection =
    db.collection("announcement");



    const announcements = await announcementsCollection

        .find({
            status:"published"
        })

        .sort({
            createdAt:-1
        })

        .toArray();



    return announcements;


};