const mongoose = require("mongoose");
const conectionString = `${process.env.MONGO_DB_URI}`;

mongoose
  .connect(conectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected... ");
  })
  .catch((err) => {
    console.error(err);
  });
