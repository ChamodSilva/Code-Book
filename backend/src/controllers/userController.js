const pool = require('../config/db');

// Get all users
exports.getAllUsers = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(
            'SELECT id, username, email, profile_picture_url, bio, github_username, created_at, updated_at FROM users'
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    } finally {
        if (connection) connection.release();
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    let connection;
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'username, email, and password are required.' });
        }

        const password_hash = password; // Replace with hash function in production

        connection = await pool.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, password_hash]
        );

        res.status(201).json({
            message: 'User created successfully',
            userID: result.insertId,
            user: { username, email }
        });

    } catch (err) {
        console.error('Error creating user:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Username or email already exists.', error: err.message });
        }
        res.status(500).json({ message: 'Error creating user', error: err.message });
    } finally {
        if (connection) connection.release();
    }
};