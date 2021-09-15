const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }

    // Create a Note
    const user = new User({
        nama: req.body.nama, 
        email: req.body.email,
        nohp: req.body.nohp,
        password: bcrypt.hashSync(req.body.password, 8) 
    });

    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(user.password,salt,(err,hash) => {
            if(err) throw err;
                user.password = hash;
                user.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                return res.json(user);
        })
    })

    // Save Note in the database
    user.save()
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
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    const emails = req.params.emails;
    User.findOne({"email" : emails})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.emails
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.emails
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.emails
        });
    });
};

// Login
exports.loginEmail = (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        // console.log(user.password);
        // const currentPass =  bcrypt.compare(user.password);
        // const currentPass2 = bcrypt.compare(req.body.password);
        // console.log("Hey", currentPass, currentPass2);
        if(!user) {
            return res.status(404).send({
                message: "User not found with email "
            });            
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result == true){
                    res.status(200).send({Success: "Login Ok"})
                } else {
                    res.status(500).send({Failed: "Email or Password Wrong"})
                }
            })
        }
        
    })
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }
    const emails = req.params.emails;

    // Find note and update it with the request body
    User.findOneAndUpdate({"email": emails}, {
        nama: req.body.nama, 
        email: req.body.email,
        nohp: req.body.nohp,
        password: bcrypt.hashSync(req.body.password, 8) 
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.emails
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.emails
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.emails
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    const emails = req.params.emails;
    User.findOneAndDelete({"email":emails})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.emails
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.emails
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};