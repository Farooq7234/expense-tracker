import { asyncHandler } from "../utils/asyncHandler.js";
import Expense from "../models/expense.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

export const addExpense = asyncHandler(async (req, res) => {
  const { amount, category, date, description } = req.body;

  if (!amount || !category || !date) {
    throw new ApiError(401, "Amount, category, date is required");
  }

  const newExpense = new Expense({
    user: req.userId,
    amount,
    category,
