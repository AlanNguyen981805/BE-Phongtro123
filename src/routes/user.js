import express from "express";
import verifyToken from "../middleware/verifyToken";
import * as user from "./../controllers/user";

const router = express.Router();

router.use(verifyToken);
router.get("/get-current-user", user.getCurrentUser);
router.post("/update", user.updateUser);

export default router;
