import { Router } from "express";
import {
  addExpense,
  deleteExpense,
  updateExpense,
  getExpenses,
  getSpendingInsights,
} from "../controllers/expense.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Secured routes
router.route("/add").post(verifyJWT, addExpense);
router.route("/delete/:id").delete(verifyJWT, deleteExpense);
router.route("/update/:id").put(verifyJWT, updateExpense);
router.route("/getexpenses").get(verifyJWT, getExpenses);
router.route("/insights").get(verifyJWT, getSpendingInsights);

export default router;
