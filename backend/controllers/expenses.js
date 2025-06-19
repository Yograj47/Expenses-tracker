const data = require("../data.json");

const getAllExpenses = (req, res) => {
  res.send("All Expenses");
};
const getExpense = (req, res) => {
    res.json({id:req.params.id})
};
const addExpense = (req, res) => {
  res.json(req.body)
};
const deleteExpense = (req, res) => {
  res.send("Delete Expenses");
};
const updateExpense = (req, res) => {
  res.send("Update Expenses");
};

module.exports = {
  getAllExpenses,
  getExpense,
  addExpense,
  deleteExpense,
  updateExpense,
};
