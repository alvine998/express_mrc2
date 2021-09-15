module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new Note
    app.post('/users', users.create);

    // Retrieve all users
    app.get('/users', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:emails', users.findOne);

    // Login Email
    app.post('/userss/login', users.loginEmail);

    // Update a Note with noteId
    app.put('/users/:emails', users.update);

    // Delete a Note with noteId
    app.delete('/users/:emails', users.delete);
}