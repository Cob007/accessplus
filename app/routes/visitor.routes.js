module.exports = (app) => {
    const visitor = require('../controllers/visitor.controller.js');

    // Create a new Note
    app.post('/visitor', visitor.create);

    //create a staff
    app.post('/staff', visitor.signin);

    // Retrieve all Notes
    app.get('/visitor', visitor.findAll);

    // Retrieve a single Note with noteId
    app.get('/visitor/:visitorId', visitor.findOne);

    // Update a Note with noteId
    app.put('/visitor/:visitorId', visitor.update);

    // Delete a Note with noteId
    app.delete('/visitor/:visitorId', visitor.delete);

    //querying a database for name search
    app.get('/search', visitor.search);

    //querying for date
    app.post('/date', visitor.date)

    //update staff
    app.put('/signOut/:visitorId', visitor.signout);
}
