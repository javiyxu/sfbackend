const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- Routes ---
app.get('/api/orders', (req, res) => {
    connection.query("SELECT * FROM pizza_orders", (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        res.json(rows);
    });
});

app.get('/api/orders/:id', (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM pizza_orders WHERE id=?", [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).json({ message: "Order not found" });
    });
});

app.post('/api/orders', (req, res) => {
    const { customer_name, pizza_type, size, quantity, instructions } = req.body;
    connection.query(
        "INSERT INTO pizza_orders (customer_name,pizza_type,size,quantity,instructions) VALUES (?,?,?,?,?)",
        [customer_name, pizza_type, size, quantity, instructions],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Order created", id: result.insertId });
        }
    );
});

app.put('/api/orders/:id', (req, res) => {
    const id = req.params.id;
    const { customer_name, pizza_type, size, quantity, instructions } = req.body;
    connection.query(
        "UPDATE pizza_orders SET customer_name=?, pizza_type=?, size=?, quantity=?, instructions=? WHERE id=?",
        [customer_name, pizza_type, size, quantity, instructions, id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Order updated" });
        }
    );
});

app.delete('/api/orders/:id', (req, res) => {
    const id = req.params.id;
    connection.query("DELETE FROM pizza_orders WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Order deleted" });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
