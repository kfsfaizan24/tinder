const express = require('express');
const connectToDB = require('../config/database')
const cookieParser = require('cookie-parser');
const app = express();
const authRouter = require('../routes/auth');
const profileRouter = require('../routes/profile');
const connectionRouter = require('../routes/connection');

const port = 8080;

app.use(express.json());

app.use('/', authRouter);
app.use('/profile', profileRouter);
app.use('/connection', connectionRouter);

connectToDB().then(() => {
    app.listen(port, () => {
        console.log("server is up and running..");
    });
}).catch((err) => {
    console.log(err);
})
