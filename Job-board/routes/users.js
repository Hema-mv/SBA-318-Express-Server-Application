const express = require('express');
const router = express.Router();
const fs = require('fs'); 
const path = require('path');
const users=require("../data/users")
const usersFilePath = path.join(__dirname, '../data/users.js');
// read users from the file
const readUsers = () => {
    delete require.cache[require.resolve(usersFilePath)];
    return require(usersFilePath);
};

// write users to the file
const writeUsers = (users) => {
    const usersContent = `const users = ${JSON.stringify(users, null, 4)};\n\nmodule.exports = users;`;
    fs.writeFileSync(usersFilePath, usersContent, 'utf8');
};
// GET route to list all users
router.get('/', (req, res) => {
    const users = readUsers();
    res.render('users', { users });
});

// GET route to show the update user page
router.get('/update/:id', (req, res) => {
    console.log("in get/update")
    const { id } = req.params;
    const users = readUsers();
    const user = users[id];
    if (user) {
        res.render('EditUser', { user, userIndex: id });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// POST route to add a new user
router.post('/', (req, res) => {
    const { name, email } = req.body;
    const users = readUsers();
    users.push({ name, email });
    writeUsers(users);
    res.redirect('/users');
});

// PATCH route to update a user
router.patch('/:id', (req, res) => {
    console.log("Im in patch")
    const { id } = req.params;
    const { name, email } = req.body;
    const users = readUsers();
    const user = users[id];
    
    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        writeUsers(users);
        res.redirect('/users');
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// DELETE route to delete a user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const users = readUsers();
    if (users[id]) {
        users.splice(id, 1);
        writeUsers(users);
        res.redirect('/users');
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

module.exports = router;



/*

const express = require('express');
const router = express.Router();
const users=require("../data/users")
//let users = [];

router.get('/', (req, res) => {
   res.render('users', {users});
   console.log(users)
});

router.post('/', (req, res) => {
    const { name, email } = req.body;
    users.push({ name, email });
    res.redirect('/users');
});


router.delete('/:id', function (req, res) {
    let found = users.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        let targetIndex = users.indexOf(found);

        data.splice(targetIndex, 1);

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});
module.exports = router;


*/
