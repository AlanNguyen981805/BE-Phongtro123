import express from "express";
import * as areaController from "../controllers/area"

const router = express.Router();

router.get("/get-all", areaController.getAreas);

export default router;
