
import express from "express";
import {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTicket);
router.get("/", protect, getMyTickets);

router.get("/all", protect, adminOnly, getAllTickets);
router.put("/:id", protect, adminOnly, updateTicket);
router.delete("/:id", protect, adminOnly, deleteTicket);

export default router;
