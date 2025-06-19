const express = require("express");
const router = express.Router();

const { getAllExpenses, getExpense, addExpense, deleteExpense, updateExpense } = require("../controllers/expenses.js");

router.route("/").get(getAllExpenses).post(addExpense);
router.route("/:id").get(getExpense).delete(deleteExpense).patch(updateExpense);

module.exports = router;
