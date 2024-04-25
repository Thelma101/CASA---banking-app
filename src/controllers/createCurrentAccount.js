const express = require('express');
const { v4: uuidv4 } = require('uuid');


try {
    const createCurrentAccount = async (req, res) => {

        const { cifId, BVN, schemeType } = req.body;
        const id = uuidv4();
        const currentAccount = {
            cifId,
            BVN,
            schemeType
        }
        // TODO: Save currentAccount to database
        res.status(201).json(currentAccount);
    }
} catch (error) {
    console.error(error);
    res.status(500).json({
        message: 'Error creating current account',
        details: error.message
    });
}