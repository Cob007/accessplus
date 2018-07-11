module.exports = (app) => {
    const visitor = require('../controllers/visitor.controller.js');

    // Create a new Note
    app.post('/visitor', visitor.create);

    // Retrieve all Notes
    app.get('/visitor', visitor.findAll);

    // Retrieve a single Note with noteId
    app.get('/visitor/:visitorId', visitor.findOne);

    // Update a Note with noteId
    app.put('/visitor/:visitorId', visitor.update);

    // Delete a Note with noteId
    app.delete('/visitor/:visitorId', visitor.delete);
}
