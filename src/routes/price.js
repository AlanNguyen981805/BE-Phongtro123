import express from "express";
import * as priceController from "../controllers/price"

const router = express.Router();

router.get("/get-all", priceController.getPrice);

export default router;
