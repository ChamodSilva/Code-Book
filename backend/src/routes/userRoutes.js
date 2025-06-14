const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password_hash:
 *           type: string
 *           description: Hashed password
 *         profile_picture_url:
 *           type: string
 *           nullable: true
 *         bio:
 *           type: string
 *           nullable: true
 *         github_username:
 *           type: string
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [Users]
 *     description: Returns a list of all registered users in the system. Password fields are excluded for security.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user.
 *     tags: [Users]
 *     description: Creates a new user account with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           examples:
 *             newUser:
 *               value:
 *                 username: exauser
 *                 email: exa.user@example.com
 *                 password: mySecretPassword123
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 userID:
 *                   type: integer
 *                   example: 4
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (e.g., missing required fields).
 *       409:
 *         description: Conflict (e.g., username or email already exists).
 *       500:
 *         description: Internal server error.
 */
router.post('/', userController.createUser);

module.exports = router;