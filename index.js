const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.use('/createCIF', createCIFRoutes);
app.use('/createCAA', currentAccountRoutes);
app.use('/createSBA', savingsAccountsRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Press CTRL + C to stop server`);
})