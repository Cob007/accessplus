/**
 * Created by michealcob on 7/11/18.
 */
const Visitor = require('../models/visitor.model.js');

// Create and Save a new Note
exports.create = (req, res) => {

    // Validate request
    if (!req.body.viname) {
        return res.status(400).send({
            message: "Visitor name can not be empty"
        });
    }
    if (!req.body.number) {
        return res.status(400).send({
            message: "visitor number can not be empty"
        });
    }
    if (!req.body.company) {
        return res.status(400).send({
            message: "visitor company can not be empty"
        });
    }
    if (!req.body.viaim) {
        return res.status(400).send({
            message: "visitor aim can not be empty"
        });
    }


    // Create a Note
    const visitor = new Visitor({
        viname: req.body.viname,
        number: req.body.number,
        company: req.body.company,
        viaim: req.body.viaim,
        status: true/*true for user sign in*/
    });

    visitor.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    Visitor.find()
        .then(visitor => {
            res.send(visitor);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Visitor.findById(req.params.visitorId)
        .then(visitor => {
            if(!visitor) {
                return res.status(404).send({
                    message: "Note not found wvith id " + req.params.visitorId
                });
            }
            res.send(visitor);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.visitorId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.visitorId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    Visitor.findByIdAndUpdate(req.params.visitorId, {
        viname: req.body.viname,
        number: req.body.number,
        company: req.body.company,
        viaim: req.body.viaim,
        status: false/*true for user sign in*/
    }, {new: true})
        .then(visitor => {
            if(!visitor) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.visitorId
                });
            }
            res.send(visitor);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.visitorId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.visitorId
        });
    });

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

    Visitor.findByIdAndRemove(req.params.noteId)
        .then(visitor => {
            if(!visitor) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.visitorId
                });
            }
            res.send({message: "Note deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.visitorId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.visitorId
        });
    });
};

exports.search = (req, res) =>{
    var query = req.query;
    Visitor.find(parseRegExpProperties(query))
        .then(visitor =>{
            res.send(visitor);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        })

    /*Visitor.find(req.query)
        .then(visitor =>{
            res.send(visitor);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    })*/
};

function parseRegExpProperties(obj) {
    var newObject = {};
    for(var propName in obj) {
        if(typeof(obj[propName]) != "undefined") {
            newObject[propName] = {'$regex': obj[propName], '$options': "i" };
        }
    }
    return newObject;
}

exports.date = (req, res) =>{
    var startAt = req.body.start;
    var stopAt = req.body.stop;

    var end = new Date(stopAt);
    end.setDate(end.getDate() + 1);
    Visitor.find({updatedAt : { $gte : new Date(startAt), $lt: end} }, function(err, docs){
        res.send(docs)
    });
}
