const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Create and connect to the SQLite database
const db = new sqlite3.Database(':memory:');

// Create a table to store the click count
db.serialize(() => {
    db.run("CREATE TABLE click_count (id INTEGER PRIMARY KEY, count INTEGER)");
    db.run("INSERT INTO click_count (count) VALUES (0)");
});

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to get the click count
app.get('/click-count', (req, res) => {
    db.get("SELECT count FROM click_count WHERE id = 1", (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json({ count: row.count });
        }
    });
});

// Endpoint to update the click count
app.post('/click-count', (req, res) => {
    const newCount = req.body.count;
    db.run("UPDATE click_count SET count = ? WHERE id = 1", [newCount], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json({ count: newCount });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
