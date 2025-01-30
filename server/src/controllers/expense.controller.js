import { asyncHandler } from "../utils/asyncHandler.js";
import Expense from "../models/expense.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const addExpense = asyncHandler(async (req, res) => {
  const { amount, category, date, description } = req.body;

  if (!amount || !category || !date) {
    throw new ApiError(401, "Amount, category, date is required");
  }

  const newExpense = new Expense({
    user: req.userId,
    amount,
    category,
    date,
    description,
  });

  await newExpense.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newExpense, "Expense added successfully"));
});

export const getExpenses = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate, category } = req.query;

    const filter = { user: req.userId };

    // Apply date range filter
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // Apply category filter
    if (category) {
      filter.category = category;
    }

    // Pagination
    const expenses = await Expense.find(filter)
      .sort({ date: -1 }) // Latest expenses first
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalExpenses = await Expense.countDocuments(filter);

    return res.json({
      expenses,
      totalPages: Math.ceil(totalExpenses / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export const updateExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedExpense) {
    throw new ApiError("404", "Expense not found");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, updatedExpense, "Expense Updated Successfully"));
});

export const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedExpenses = await Expense.findByIdAndDelete(id);

  if (!deletedExpenses) {
    throw new ApiError("404", "Expense not found");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, deletedExpenses, "Expense deleted successfully")
    );
});

export const getSpendingInsights = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const categoryWiseSpending = await Expense.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: "$category",
        totalSpent: { $sum: "$amount" },
      },
    },
  ]);

  const totalSpending = categoryWiseSpending.reduce(
    (sum, category) => sum + category.totalSpent,
    0
  );

  // Calculate percentage distribution
  const spendingDistribution = categoryWiseSpending.map((category) => ({
    category: category._id,
    totalSpent: category.totalSpent,
    percentage: ((category.totalSpent / totalSpending) * 100).toFixed(2), // Convert to percentage
  }));

  return res
    .status(201)
    .json(
      new ApiResponse(200, spendingDistribution, "Spending insights calculated")
    );
});
