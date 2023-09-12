import express from "express";
import { createSports, getAllSports, getSportById, updateSports } from "../controller/sports.js";

// import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create",createSports)
router.get("/getall",getAllSports)
router.get("/getbyid/:id",getSportById)
router.put("/update/:id", updateSports)

export default router; 