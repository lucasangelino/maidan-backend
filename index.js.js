require("dotenv").config();
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
  const id = req.params.id;
  Article.findById(id)
    .then((article) => {
      if (article) {
        return res.json(article);
      } else {
        return res.status(404).json({ message: "Article not found" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

app.get("/api/categories", (req, res) => {
  res.json("categories");
});

app.post("/api/article", (req, res) => {
  const article = req.body;
  const newArticle = new Article({
    title: article.title,
    date: new Date(),
    content: article.content,
    tags: article.tags,
    author: article.author,
    comments: [],
  });
  newArticle.save().then((savedArticle) => {
    res.json(savedArticle);
  });
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
