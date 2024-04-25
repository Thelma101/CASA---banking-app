const express = require('express');
const createCustomerId = require('./src/controllers/createCustomerId');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use(express.json());

app.post('/createCIF', createCustomerId);
// app.use('/createCAA', currentAccountRoutes);
// app.use('/createSBA', savingsAccountsRoutes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Press CTRL + C to stop server`);
})