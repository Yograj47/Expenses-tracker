import { getMonthIndex } from "./utils/dateUtils.js";
import { totalExpenseOfMonth } from "./script.js";

let barChartInstance = null;
let pieChartInstance = null;

export default function drawDiagram(data) {
  const monthlabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyTotals = new Array(12).fill(0);

  data.forEach((item) => {
    monthlyTotals[getMonthIndex(item.date)] += item.amount;
  });

  totalExpenseOfMonth(monthlyTotals);

  const ctxBar = document.getElementById("barChart");
  if (barChartInstance) barChartInstance.destroy();

  barChartInstance = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: monthlabels,
      datasets: [
        {
          label: "Monthly Expenses",
          data: monthlyTotals,
          backgroundColor: "#298e42",
          borderRadius: 4,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } },
    },
  });

  const categories = Array.from(new Set(data.map((item) => item.category)));
  const categoryData = categories.map((cat) =>
    data.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
  );

  const ctxPie = document.getElementById("pieChart");
  if (pieChartInstance) pieChartInstance.destroy();

  pieChartInstance = new Chart(ctxPie, {
    type: "pie",
    data: {
      labels: categories,
      datasets: [
        {
          label: "Category of Expenses",
          data: categoryData,
          backgroundColor: ["#e74c3c", "#1a68bc", "#9b59b6", "#f39c12"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
    },
  });
}
