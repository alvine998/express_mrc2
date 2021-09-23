const Order = require('../models/order.model.js');
const uploadFile = require('../middleware/upload');
const fs = require("fs");

// Create and Save a new Note
exports.create = (req, res) => {
    
    // uploadFile(req,res);
    // if(req.file == undefined){
    //     return res.status(400).send({message: "Please upload file"})
    // }
    // Create a Note
    const order = new Order({
        userid: req.body.userid, 
        tanggal_booking: req.body.tanggal_booking,
        waktu: req.body.waktu,
        keluhan: req.body.keluhan,
        alamat: req.body.alamat,
        status: req.body.status,
        area: req.body.area
    });

    // Save Note in the database
    order.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order."
        });
    });
};

exports.upload = async (req,res) => {
    try {
        await uploadFile(req, res);
    
        if (req.file == undefined) {
          return res.status(400).send({ message: "Please upload a file!" });
        }
    
        res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
        });
      } catch (err) {
        res.status(500).send({
          message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
      }
}

exports.download = (req,res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if(err){
            res.status(500).send({
                message:"could not download the file" + err,
            });
        }
    });
};

exports.getListFiles = (req,res) => {
    const baseUrl = "http://localhost:3000/files/"
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    fs.readdir(directoryPath, function(err,files) {
        if(err){
            res.status(500).send({
                message: "Unable to scan files"
            })
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });
        res.status(200).send(fileInfos);
    })
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    const userid = req.params.userid;
    Order.find({"userid" : userid})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.userid
            });            
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userid
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userid
        });
    });
};

// get data area jakarta
exports.getJakarta = (req,res) => {
    const areaId = req.params.areas
    Order.find({'area': 'jakarta'})
    .then(
        order => {
            console.log(order)
            if(!order){
                return res.status(404).send({
                    message: "Order not found with area " + req.params.areas
                });  
            }
            res.send(order)
        }
    )
}

// get data area bogor
exports.getBogor = (req,res) => {
    const areaId = req.params.areas
    Order.find({'area': 'bogor'})
    .then(
        order => {
            console.log(order)
            if(!order){
                return res.status(404).send({
                    message: "Order not found with area " + req.params.areas
                });  
            }
            res.send(order)
        }
    )
}

// get data area depok
exports.getDepok = (req,res) => {
    const areaId = req.params.areas
    Order.find({'area': 'depok'})
    .then(
        order => {
            console.log(order)
            if(!order){
                return res.status(404).send({
                    message: "Order not found with area " + req.params.areas
                });  
            }
            res.send(order)
        }
    )
}

// get data area bekasi
exports.getBekasi = (req,res) => {
    const areaId = req.params.areas
    Order.find({'area': 'bekasi'})
    .then(
        order => {
            console.log(order)
            if(!order){
                return res.status(404).send({
                    message: "Order not found with area " + req.params.areas
                });  
            }
            res.send(order)
        }
    )
}

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.userid) {
        return res.status(400).send({
            message: "User id can not be empty"
        });
    }
    const userid = req.params.userid;

    // Find note and update it with the request body
    User.findOneAndUpdate({"userid": userid}, {
        userid: req.body.userid, 
        tanggal_booking: req.body.tanggal_booking,
        waktu: [req.body.hour, req.body.hour2, req.body.minute, req.body.minute2],
        keluhan: req.body.keluhan,
        alamat: req.body.alamat,
        status: req.body.status,
        area: req.body.area
    }, {new: true})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.userid
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.userid
            });                
        }
        return res.status(500).send({
            message: "Error updating order with id " + req.params.userid
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    const userid = req.params.userid;
    Order.findOneAndDelete({"userid":userid})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.userid
            });
        }
        res.send({message: "Order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.userid
            });                
        }
        return res.status(500).send({
            message: "Could not delete Order with id " + req.params.userid
        });
    });
};