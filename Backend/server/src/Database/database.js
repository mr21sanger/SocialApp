const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/socialApp")
  .then(() => {
    console.log("Database is running");
  })
  .catch((e) => {
    console.log("Database Error", e);
  });
