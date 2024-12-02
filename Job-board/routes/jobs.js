const express = require('express');
const router = express.Router();
const fs = require('fs'); 
const path = require('path');
const jobs = require('../data/jobs');
const jobsFilePath = path.join(__dirname, '../data/jobs.js');

// Read jobs from the file
const readJobs = () => {
    delete require.cache[require.resolve(jobsFilePath)];
    return require(jobsFilePath);
};

// Write jobs to the file
const writeJobs = (jobs) => {
    const jobsContent = `const jobs = ${JSON.stringify(jobs, null, 4)};\n\nmodule.exports = jobs;`;
    fs.writeFileSync(jobsFilePath, jobsContent, 'utf8');
};

// GET route to list all jobs
router.get('/', (req, res) => {
    const jobs = readJobs();
    res.render('jobs', { jobs });
});

// GET route to show the update job page
router.get('/update/:id', (req, res) => {
    console.log("i'm in get")
    console.log(req.params)
    const { id } = req.params;
    const jobs = readJobs();
    const job = jobs[id];
    console.log(job)
    if (job) {
        res.render('EditJob', { job, jobIndex: id });
    } else {
        res.status(404).json({ error: 'Job not found' });
    }
});

// POST route to add a new job
router.post('/', (req, res) => {
    const { title, description } = req.body;
    const jobs = readJobs();
    jobs.push({ title, description });
    writeJobs(jobs);
    res.redirect('/jobs');
});

// PATCH route to update a job
router.patch('/:id', (req, res) => {
    console.log("im in get patch)")
    const { id } = req.params;
    const { title, description } = req.body;
    const jobs = readJobs();
    const job = jobs[id];
    
    if (job) {
        job.title = title || job.title;
        job.description = description || job.description;
        writeJobs(jobs);
        res.redirect('/jobs');
    } else {
        res.status(404).json({ error: 'Job not found' });
    }
});

// DELETE route to delete a job
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const jobs = readJobs();
    if (jobs[id]) {
        jobs.splice(id, 1);
        writeJobs(jobs);
        res.redirect('/jobs');
    } else {
        res.status(404).json({ error: 'Job not found' });
    }
});

module.exports = router;
