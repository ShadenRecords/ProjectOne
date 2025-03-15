const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

// Create and connect to the SQLite database file
const dbPath = path.resolve(__dirname, 'clicks.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

// Create a table to store the click count if it doesn't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS click_count (id INTEGER PRIMARY KEY, count INTEGER)", (err) => {
        if (err) {
            console.error('Error creating table', err);
        }
    });
    db.get("SELECT count FROM click_count WHERE id = 1", (err, row) => {
        if (err) {
            console.error('Error querying table', err);
        } else if (!row) {
            db.run("INSERT INTO click_count (count) VALUES (0)", (err) => {
                if (err) {
                    console.error('Error inserting initial count', err);
                }
            });
        }
    });
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
