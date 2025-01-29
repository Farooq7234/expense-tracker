import { Router } from "express";
import {
  addExpense,
  deleteExpense,
  updateExpense,
  getExpenses,
} from "../controllers/expense.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Secured routes
router.route("/add").post(verifyJWT, addExpense);
router.route("/delete/:id").delete(verifyJWT, deleteExpense);
router.route("/update/:id").put(verifyJWT, updateExpense);
router.route("/").get(verifyJWT, getExpenses);

export default router;
