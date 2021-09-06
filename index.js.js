require("./mongo");
const express = require("express");
const cors = require("cors");

// Schemas
const Article = require("./models/article");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.get("/api/article/:id", (req, res) => {
  const id = Number(req.params.id);
  Article.find({}, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
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
