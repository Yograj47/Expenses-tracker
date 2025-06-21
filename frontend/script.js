async function fetchExpenses() {
  try {
    const response = await axios.get("/api/v1/expenses");
    console.log("Full response:", response.data.expenses);
    } catch (err) {
    console.error("Failed to fetch expenses:", err);
  }
}

fetchExpenses();