
# 💸 Expenses Tracker

A simple yet functional Expense Tracker Web App that helps users manage daily expenses and visualize financial data with interactive charts.

---

## 🚀 Features (Current Version v0.1)

✅ Add new expenses  
✅ Edit existing expenses  
✅ Delete expenses  
✅ Interactive charts (Pie & Bar) using Chart.js  
✅ Monthly expense calculation  
✅ Daily expense comparison (If data is irregular, compares the last two entries to show up/down trend)  
✅ Responsive design for desktop and mobile  
✅ Light mode only (for now)  
✅ Real-time charts update as you add, edit, or delete expenses  

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Chart Library:** Chart.js  

---

## 📦 Folder Structure

```
EXPENSES-TRACKER
├── backend
│   ├── controllers
│   ├── models
│   └── routes
├── db
│   └── connection.js
├── frontend
│   ├── dom
│   ├── utils
│   ├── index.html
│   ├── script.js
│   └── style.css
├── app.js
├── .env
└── package.json
```

---

## 📊 Upcoming in Next Updates

- Filter, Sort, and Search functionality for expenses  
- Improved UI/UX  
- Fully responsive design across all devices  
- Dark mode toggle  
- Success and Error message popups  

---

## 🏁 Future Plan for Complete v1.0

- Pagination for transaction/expenses history  
- Income management alongside expenses  
- Login & Register (Authentication & Authorization)  
- Multiple data visualization modes (user preference)  
- Additional UI refinements and enhancements  

---

## ⚡ Quick Setup

1. Clone the repository:
   ```
   git clone https://github.com/Yograj47/Expenses-tracker.git
   cd Expenses-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Setup your `.env`:
   ```
   MONGO_URI=your_mongo_connection_string
   ```

4. Start the server:
   ```
   npm start
   ```

Access the app at:  
[http://localhost:3000](http://localhost:3000)
