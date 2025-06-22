const pool = require('../config/db');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email/username and password are required.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        // Try to find user by email or username
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [email, email]
        );
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const user = rows[0];
        // For now, compare plain text (replace with hash check in production)
        if (user.password_hash !== password) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        // Optionally, generate a token here
        res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Error during login', error: err.message });
    } finally {
        if (connection) connection.release();
    }
};