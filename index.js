const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const createCustomerId = require('./src/controllers/createCustomerId');
const createCurrentAccount = require('./src/controllers/createCurrentAccount');
const createSavingsAccount = require('./src/controllers/createSavingsAccount');


mongoose.connect('mongodb+srv://coursequesthub:fePziw-bewbaz-5cofme@cluster0.lssixvh.mongodb.net/CourseQuestHub', { 
    useNewUrlParser: true, useUnifiedTopology: true 
})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use(express.json());

app.post('/createCIF', createCustomerId);
app.use('/createCAA', createCurrentAccount);
app.use('/createSBA', createSavingsAccount);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Press CTRL + C to stop server`);
})