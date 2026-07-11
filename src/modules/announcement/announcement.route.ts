import { Router } from "express";
import { getAnnouncements } from "./announcement.controller";


const router = Router();



router.get("/", getAnnouncements);



export default router;