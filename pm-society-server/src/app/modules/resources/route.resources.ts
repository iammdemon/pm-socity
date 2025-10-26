import express from "express";
import multer from "multer";
import { ResourceController } from "./controller.resources";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), ResourceController.createAResource);
router.get("/", ResourceController.getAllResources);
router.put("/:id", upload.single("file"), ResourceController.updateResource);
router.delete("/:id", ResourceController.deleteResource);

export const ResourceRoutes = router;
