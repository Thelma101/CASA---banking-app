const createCustomerId = (req, res) => {
    // Generate a random customer ID
    const customerId = Math.floor(100000 + Math.random() * 900000);

    // Return the customer ID as a JSON response
    res.json({ customerId });
    res.status(200).json({
        message: 'Your customer ID is 1234567890',
    });
}