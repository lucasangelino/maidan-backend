const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const articleSchema = new Schema({
  title: String,
  date: Date,
  content: String,
  tags: [String],
  author: String,
  comments: [
    {
      name: String,
      comment: String,
      date: Date,
    },
  ],
});
articleSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Article = model("Article", articleSchema);

module.exports = Article;
