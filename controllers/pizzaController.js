const connection = require('../config/db');

// Get all orders
exports.getAllOrders = (req, res) => {
    connection.query("SELECT * FROM pizza_orders", (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
};

// Get order by ID
exports.getOrderById = (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM pizza_orders WHERE id=?", [id], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).json({ message: "Order not found" });
    });
};

// Create order
exports.createOrder = (req, res) => {
    const { customer_name, pizza_type, size, quantity, instructions } = req.body;

    connection.query(
        "INSERT INTO pizza_orders (customer_name,pizza_type,size,quantity,instructions) VALUES (?,?,?,?,?)",
        [customer_name, pizza_type, size, quantity, instructions],
        (err, result) => {
            if (err) throw err;
            res.json({ message: "Order created", id: result.insertId });
        }
    );
};

// Update order
exports.updateOrder = (req, res) => {
    const { id, customer_name, pizza_type, size, quantity, instructions } = req.body;

    connection.query(
        "UPDATE pizza_orders SET customer_name=?, pizza_type=?, size=?, quantity=?, instructions=? WHERE id=?",
        [customer_name, pizza_type, size, quantity, instructions, id],
        (err, result) => {
            if (err) throw err;
            res.json({ message: "Order updated" });
        }
    );
};

// Delete order
exports.deleteOrder = (req, res) => {
    const id = req.body.id;

    connection.query(
        "DELETE FROM pizza_orders WHERE id=?",
        [id],
        (err, result) => {
            if (err) throw err;
            res.json({ message: "Order deleted" });
        }
    );
};