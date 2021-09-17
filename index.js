require("dotenv").config();
require("./mongo");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const notFound = require("./middleware/notFound");
const handleError = require("./middleware/handleErrors");

const express = require("express");
const cors = require("cors");

// Schemas
const Article = require("./models/article");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.json("holi");
});

app.get("/api/articles/latest", (req, res) => {
  console.log("latest");
  Article.find({})
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

app.get("/api/article/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Article.findById(id)
    .then((article) => {
      if (article) {
        return res.json(article);
      } else {
        return res.status(404).json({ message: "Article not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.get("/api/categories", (req, res) => {
  res.json("categories");
});

app.post("/api/article", jsonParser, (req, res) => {
  if (
    !req.body.title ||
    !req.body.content ||
    !req.body.summary ||
    !req.body.tags ||
    !req.body.author
  ) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const article = req.body;
  const newArticle = new Article({
    title: article.title,
    summary: article.summary,
    date: new Date(),
    content: article.content,
    tags: article.tags,
    author: article.author,
    comments: [],
  });
  newArticle.save().then((savedArticle) => {
    return res.status(201).json({ code: 201, message: "Article Created" });
  });
});

app.use(notFound);
app.use(handleError);

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT || 5001}`);
});
