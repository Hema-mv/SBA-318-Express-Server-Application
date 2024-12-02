// GET route to show the update user page
router.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const users = readUsers();
    const user = users[id];
    if (user) {
        res.render('update_user', { user, userIndex: id });
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
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});