const express = require("express");
const app = express();

const PORT = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Home page");
  
});

app.listen(PORT, () => {
  console.log(`Server Running: http://localhost:${PORT}`);
});
