const Expense = require("../model/Expenses.js");

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getExpense = async (req, res) => {
  try {
    const { id: ExpenseId } = req.params;
    const expense = await Expense.findOne({ _id: ExpenseId });
    if (!expense)
      return res
        .status(404)
        .json({ msg: `No Expense with id: ${ExpenseId} found` });
    else {
      res.status(200).json({
        success: true,
        expense,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json({ expense });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id: ExpenseId } = req.params;
    const expense = await Expense.findOneAndDelete({ _id: ExpenseId });
    if (!expense)
      return res
        .status(404)
        .json({ msg: `No Expense with id: ${ExpenseId} found` });
    else {
      res.status(200).json({
        status: "success",
        expense: null,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id: ExpenseId } = req.params;
    const expense = await Expense.findOneAndUpdate(
      { _id: ExpenseId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!expense)
      return res
        .status(404)
        .json({ msg: `No Expense with id: ${ExpenseId} found` });
    else {
      res.status(200).json({
        status: "success",
        expense,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// {
//   "title": "Groceries at Walmart",
//   "amount": 120.50,
//   "category": "Food",
//   "date": "2025-06-18"
// }

module.exports = {
  getAllExpenses,
  getExpense,
  addExpense,
  deleteExpense,
  updateExpense,
};
