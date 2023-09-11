import express from "express";
import { createSports } from "../controller/sports.js";

// import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create",createSports)
// router.get("/all",getAllUser)
// router.get("/profile",auth,profile)
// router.post("/login",login)
// router.put("/update/:id", updateUser)
// router.get("/getaddressbyid",[auth,authZ], getAddressById)

export default router; 