const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.get("/api/article/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json(`Article ${id}`);
});

app.get("/api/categories", (req, res) => {
  res.json("categories");
});

app.listen(PORT || 5001, () => {
  console.log(`Server is running on port ${PORT}`);
});
