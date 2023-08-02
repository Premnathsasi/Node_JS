const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
let textin = "";
fs.readFile("./text.txt", "utf-8", (err, data) => {
    if (data) {
        textin = data;
    } else {
        textin = "No Chat Exist"
    }

});

app.get('/login', (req, res, next) => {
    res.send('<form action="/login" method="POST"><input type="text" name="username"><button type="submit">Login</button></form>')
})

app.post('/login', (req, res, next) => {
    const { username } = req.body;
    res.cookie('username', username)
    res.redirect('/')
})
app.get('/', (req, res, next) => {
    res.send(`<h3>${textin}</h3><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>`)
});

app.post('/message', (req, res) => {
    const { message } = req.body
    const username = req.cookies.username
    const msg = ` ${username}: ${message}`
    console.log(msg)

    fs.appendFile("text.txt", msg, (err) => {
        if (!err) {
            fs.readFile("./text.txt", "utf-8", (err, data) => {
                if (!err) {
                    textin = data;
                }
            });
        }
    })
    res.redirect('/')
});

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>')
})

app.listen(3000)
