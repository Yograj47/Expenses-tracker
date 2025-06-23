import drawDiagram from "./charts.js";
import {
  title,
  amount,
  category,
  dateInput,
  list,
  addNewBtn,
  expenseBox,
  closeBtn,
  formTitle,
  formBtn,
  expenseOfMonth,
  dailyRate,
  icon,
} from "./dom/domElements.js";
import { formatDate } from "./utils/dateUtils.js";

const CURRENT_MONTH = new Date().getMonth();

// Fetch and render all expenses from the backend
async function fetchExpenses() {
  try {
    const response = await axios.get("/api/v1/expenses");
    const data = response.data.expenses;
    renderExpenseList(data);
    drawDiagram(data);
    CalculateDailyRate(data);
  } catch (err) {
    console.error("Failed to fetch expenses:", err);
  }
}

// Calculate total expenses
export function totalExpenseOfMonth(month) {
  expenseOfMonth.innerHTML = `Total Expenses: Rs.${month[CURRENT_MONTH]}`;
}

function getCurrentMonthExpenses(data) {
  const currentMonthExpenses = data.filter((item) => {
    const itemMonth = new Date(item.date).getMonth();
    return itemMonth === CURRENT_MONTH;
  });

  return currentMonthExpenses;
}

// Daily expenses rate
function CalculateDailyRate(data) {
  const thisMonthExpenses = getCurrentMonthExpenses(data);
  thisMonthExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));

  const len = thisMonthExpenses.length;

  // Guard clause: need at least 2 entries
  if (len < 2) {
    console.log("Not enough data to compare.");
    return;
  }

  const item1Amount = thisMonthExpenses[len - 1].amount; // last
  const item2Amount = thisMonthExpenses[len - 2].amount; // second last

  const change = item1Amount - item2Amount;
  const percentChange = (change / item2Amount) * 100;

  if (change > 0) {
    dailyRate.innerHTML = `${percentChange.toFixed(2)}%`;
    icon.className = "fa-solid fa-arrow-up up icon";
  } else if (change < 0) {
    dailyRate.innerHTML = `${100 - Math.abs(percentChange).toFixed(2)}%`;
    icon.className = "fa-solid fa-arrow-down down icon";
  } else {
    dailyRate.innerHTML = "0%";
    icon.className = "fa-solid fa-equals neutral icon";
  }
}

// Render all expense rows to the table
// @param {Array} data - List of expense objects
function renderExpenseList(data) {
  list.innerHTML = ""; // Clear previous list
  data.forEach((item) => renderExpenseRow(item));
}

// Render one expense item as a table row
// @param {Object} item - A single expense object
function renderExpenseRow(item) {
  const tr = document.createElement("tr");
  tr.classList.add("item");
  tr.innerHTML = `
    <td class="title">${item.title}</td>
    <td class="amount">Rs. ${item.amount}</td>
    <td class="category">${item.category}</td>
    <td><button class="edit-btn" data-id="${item._id}"><i class="fa-solid fa-pen"></i></button></td>
    <td><button class="delete-btn" data-id="${item._id}"><i class="fa-solid fa-trash"></i></button></td>
  `;
  list.appendChild(tr);

  const editBtn = tr.querySelector(".edit-btn");
  const deleteBtn = tr.querySelector(".delete-btn");

  editBtn.addEventListener("click", () => openForm("edit", item._id));
  deleteBtn.addEventListener("click", () => {
    const response = window.confirm("Do you want to delete?");
    if (response === true) {
      deleteExpense(item._id);
    } else {
      return;
    }
  });
}

// Open the add/edit form
// @param {string} mode - "add" or "edit"
// @param {string|null} id - Expense ID to edit, or null to add
function openForm(mode, id = null) {
  formTitle.textContent = mode === "edit" ? "Edit Expense" : "Add Expense";
  formBtn.textContent = mode === "edit" ? "Save" : "Add";
  expenseBox.dataset.mode = mode;
  expenseBox.dataset.id = id || "";

  if (mode === "edit" && id) {
    getExpenseById(id).then((res) => {
      const data = res.data.expense;
      title.value = data.title;
      amount.value = data.amount;
      category.value = data.category;
      dateInput.value = formatDate(data.date);
    });
  } else {
    clearFormInputs();
  }

  expenseBox.classList.remove("close");
}

// Close and reset the form
function closeForm() {
  expenseBox.classList.add("close");
  delete expenseBox.dataset.mode;
  delete expenseBox.dataset.id;
  clearFormInputs();
}

// Clear form input fields
function clearFormInputs() {
  title.value = "";
  amount.value = "";
  category.value = "Food";
  dateInput.value = "";
}

// Fetch a single expense by ID
// @param {string} id - Expense ID
function getExpenseById(id) {
  return axios.get(`/api/v1/expenses/${id}`);
}

// Delete an expense
// @param {string} id - Expense ID
async function deleteExpense(id) {
  try {
    const res = await axios.delete(`/api/v1/expenses/${id}`);
    console.log(res);
    fetchExpenses();
  } catch (err) {
    console.error("Delete failed:", err);
  }
}

// Handle form submission for add/edit
document
  .getElementById("expense-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      title: title.value,
      amount: amount.value,
      category: category.value,
      date: dateInput.value,
    };

    try {
      const mode = expenseBox.dataset.mode;
      const id = expenseBox.dataset.id;

      let response = null;
      if (mode === "edit" && id) {
        response = await axios.patch(`/api/v1/expenses/${id}`, data);
      } else {
        response = await axios.post("/api/v1/expenses", data);
      }
      console.log(response);
      closeForm();
      fetchExpenses();
    } catch (err) {
      console.error("Form submit failed:", err);
    }
  });

// Event listeners for toggle
addNewBtn.addEventListener("click", () => openForm("add"));
closeBtn.addEventListener("click", closeForm);

// Initial load
fetchExpenses();
