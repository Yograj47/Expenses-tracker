require('dotenv').config(); 
const express = require("express");
const PORT = 3000;

const app = express();
const routes = require("./backend/routes/expenses.js");
const connectDB = require("./db/connection.js");

// midddleware
app.use(express.json());
app.use(express.static('./frontend'));

//routes
app.use("/api/v1/expenses", routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server Running: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error(error);
  }
}

start();