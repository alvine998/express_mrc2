module.exports = (app) => {
    const orders = require('../controllers/order.controller.js');

    // Create a new Note
    app.post('/orders', orders.create);

    // Retrieve all orders
    app.get('/orders', orders.findAll);

    // Retrieve a single Note with noteId
    app.get('/orders/:userid', orders.findOne);

    // Get from area Jakarta
    app.get('/orderss/area/jakarta', orders.getJakarta);

    // Get from area Bogor
    app.get('/orderss/area/bogor', orders.getBogor);

    // Get from area Bekasi
    app.get('/orderss/area/bekasi', orders.getBekasi);

    // Get from area Depok
    app.get('/orderss/area/depok', orders.getDepok);

    // Retrieve Image File
    app.get('/orderss/files', orders.getListFiles);

    // Retrieve Image File
    app.get('/orderss/files/:name', orders.download);

    // Upload Image
    app.post('/orders/upload', orders.upload);

    // Update a Note with noteId
    app.put('/orders/:userid', orders.update);

    // Delete a Note with noteId
    app.delete('/orders/:orderId', orders.delete);
}