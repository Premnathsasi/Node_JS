const path = require('path');

const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const contactRouter = require('../../Backend_Development/routes/contact')
const successRouter = require('../../Backend_Development/routes/success')
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error')

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactRouter);
app.use(successRouter)

app.use(errorController.get404);

app.listen(3000);
