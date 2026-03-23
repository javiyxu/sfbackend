const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');


router.get('/orders', pizzaController.getAllOrders);
router.get('/orders/:id', pizzaController.getOrderById);
router.post('/orders', pizzaController.createOrder);
router.put('/orders/:id', pizzaController.updateOrder);     
router.delete('/orders/:id', pizzaController.deleteOrder);   

module.exports = router;
