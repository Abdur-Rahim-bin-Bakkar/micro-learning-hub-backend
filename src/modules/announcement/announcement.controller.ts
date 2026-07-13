import { Request, Response } from "express";

import {
  getAllAnnouncements,
  createAnnouncement,
} from "./announcement.service";



export const getAnnouncements = async (
  req: Request,
  res: Response
) => {
  try {
    const announcements = await getAllAnnouncements();

    res.status(200).json({
      success: true,
      message: "Announcements fetched successfully",
      data: announcements,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch announcements",
    });
  }
};





export const postAnnouncement = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      image,
      author,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description are required",
      });
    }

    const result = await createAnnouncement({
      title,
      description,
      image,
      author,
    });

    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create announcement",
    });
  }
};