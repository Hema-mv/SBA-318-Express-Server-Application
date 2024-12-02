# Job Board Application

This is a simple job board application built with Express.js. It allows users to view, add, and manage job applications.

## Features

- View a list of job applications
- Add new job applications
- Manage existing job applications

- View a list of job applications
- Add new job applications
- Manage existing job applications

- View a list of job applications
- Add new job applications
- Manage existing job applications

## Installation

1. Clone the repository:
 
   git clone https://github.com/your-username/job-board.git

2,Install the dependencies
 1. npm init -y
 2. npm i express
 3. nom i method-override

2.Start the server:

nodemon index.js
Open your browser and navigate to http://localhost:3000/jobs to view the job applications.
Open your browser and navigate to http://localhost:3000/applications to view the job applications.
Open your browser and navigate to http://localhost:3000/users to view the useres.



3. Routes
Users Routes
GET /users: View all users

POST /users: Add a new user

PATCH /users/:id: Update an existing user

DELETE /users/:id: Delete a user

Jobs Routes
GET /jobs: View all jobs

POST /jobs: Add a new job

PATCH /jobs/:id: Update an existing job

DELETE /jobs/:id: Delete a job

Applications Routes
GET /applications: View all applications

POST /applications: Add a new application

DELETE /applications/:id: Delete an application