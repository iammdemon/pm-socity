import express from "express"
import { searchController } from "./controller.search"


const router = express.Router()

router.get("/", searchController.search)

export const searchRoutes = router