const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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

app.post("/api/article", (req, res) => {
  const article = req.body;
  console.log(article);
  res.json("article created");
});

app.listen(PORT || 5001, () => {
  console.log(`Server is running on port ${PORT}`);
});
