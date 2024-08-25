const express = require("express");
const app = express();
const stocks = require("./data/stocks");
const cors = require("cors");

const port = 5000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Server running on port number 5000");
});

app.get("/", (req, res) => {
  //   console.log("Hello");
  res.json(stocks);
});

app.post("/buy", (req, res) => {
  const { symbol, amount } = req.body;
  const stock = stocks.find((s) => s.symbol === symbol);
  if (stock) {
    stock.quantity -= amount;
    res.json(stock);
  } else {
    res.status(404);
    res.json({ message: "Stock not found" });
  }
});

app.post("/sell", (req, res) => {
  const { symbol, amount } = req.body;
  const stock = stocks.find((s) => s.symbol === symbol);
  if (stock) {
    stock.quantity += amount;
    res.json(stock);
  } else {
    res.status(404).json({ message: "Stock not found" });
  }
});

module.exports = app;
