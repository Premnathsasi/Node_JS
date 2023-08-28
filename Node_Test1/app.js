const path = require("path");

const express = require("express");
const cors = require("cors");

const sequelize = require("./util/database");

const app = express();

app.use(cors());

const todoRoutes = require("./routes/todo");

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/todo", todoRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000, () => {
      console.log(`App is running at port 4000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
