const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const Product = require("./models/product");
const Users = require("./models/appUser");

const cors = require("cors");

const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  Users.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

app.use(errorController.get404);

Product.belongsTo(Users, { constraints: true, onDelete: "CASCADE" });
Users.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
  .then((res) => {
    return Users.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return Users.create({ name: "Premnath", email: "prem@test.com" });
    }
    return user;
  })
  .then((user) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
