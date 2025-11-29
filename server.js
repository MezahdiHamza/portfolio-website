const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'website')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    // Create table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Contacts table ready');
      }
    });
  }
});

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Submit contact form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      error: 'All fields are required' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Invalid email format' 
    });
  }

  // Insert into database
  const sql = `INSERT INTO contacts (name, email, subject, message) 
               VALUES (?, ?, ?, ?)`;
  
  db.run(sql, [name, email, subject, message], function(err) {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ 
        error: 'Failed to save message. Please try again later.' 
      });
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      id: this.lastID
    });
  });
});

// Get all contacts (for admin/viewing messages)
app.get('/api/contacts', (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ 
        error: 'Failed to retrieve contacts' 
      });
    }
    res.json({ contacts: rows });
  });
});

// Get a specific contact by ID
app.get('/api/contacts/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ 
        error: 'Failed to retrieve contact' 
      });
    }
    if (!row) {
      return res.status(404).json({ 
        error: 'Contact not found' 
      });
    }
    res.json({ contact: row });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

