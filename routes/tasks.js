import express from "express";
import auth from "../middleware/auth.js";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// All these routes are protected
router.get("/", auth, getTasks);
router.get("/:id", auth, getTaskById);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
