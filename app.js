const express  = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
mongoose.connect(process.env.DB_CONNECTION,
    {useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
        if (err) console.error(err)
        console.log('Connected to DB!')
        }
    );
app.use(bodyParser.json());

const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);   //Middleware

app.get('/',(req,res)=>{
    res.send('We are on home');
});

app.listen(3000, () => {
    console.log('Server listen 3000...')
});
