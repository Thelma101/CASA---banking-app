const createCustomerId = (req, res) => {

    const createCIF = async (req, res) => {
        try {
            const {
                date,
                BVN,
                title,
                firstName,
                middleName,
                lastName,
                DOB,
                email,
                phoneNumber,
                address,
                occupation,
                gender,
                maritalStatus,
                country,
            } = req.body;

        } catch (error) {
            console.error('Error generating customer ID:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    // Concatenate full name if middleName is present
    const fullName = middleName
        ? `${firstName} ${middleName} ${lastName}`
        : `${firstName} ${lastName}`;
    // Generate a random customer ID
    const customerId = Math.floor(100000 + Math.random() * 900000);

    // Return the customer ID as a JSON response
    res.json({ customerId });

    res.json({ customerId, message: 'Customer ID generated successfully' });
    res.status(200).json({
        message: `Your customer ID is ${customerId}`,
    });
}