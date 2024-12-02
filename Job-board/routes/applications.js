const express = require('express');
const router = express.Router();
const applications=require("../data/applications")
//let applications = [];

router.get('/', (req, res) => {
    res.render('applications', { applications });
});

router.post('/', (req, res) => {
    const { jobTitle, applicantName } = req.body;
    applications.push({ jobTitle, applicantName });
    res.redirect('/applications');
});

module.exports = router;
