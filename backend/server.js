// Import required packages
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

// Import project files
const dotenv = require('dotenv');
const pool = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if you use cookies or authentication headers
}));

// --- Swagger Definition ---
const swaggerOptions =
{
    swaggerDefinition:
    {
        openapi: '3.0.0',
        info:
        {
            title: 'Code Book',
            version: '1.0.0',
            description: 'Like the other social media platform 😏, but for coding!',
            contact:
            {
                name: 'Chamod Silva',
                email: 'my email :P'
            },
        },
        servers:
        [
            {
                url: `http://localhost:${process.env.PORT || 5000}`,
                description: 'Local development server',
            },
        ],
        components:
        {
            schemas:
            {
                User:
                {
                    type: 'object',
                    properties:
                    {
                        id: { type: 'integer', readOnly: true, description: 'Auto-generated user ID' },
                        username: { type: 'string', description: 'Unique username' },
                        email: { type: 'string', format: 'email', description: 'User email address' },
                        password_hash: { type: 'string', description: 'Hashed password' },
                        profile_picture_url: { type: 'string', nullable: true, description: 'Profile picture URL' },
                        bio: { type: 'string', nullable: true, description: 'User bio' },
                        github_username: { type: 'string', nullable: true, description: 'GitHub username' },
                        created_at: { type: 'string', format: 'date-time', readOnly: true },
                        updated_at: { type: 'string', format: 'date-time', readOnly: true }
                    },
                    required: ['username', 'email', 'password_hash']
                },
                Post:
                {
                    type: 'object',
                    properties:
                    {
                        id: { type: 'integer', readOnly: true, description: 'Auto-generated post ID' },
                        user_id: { type: 'integer', description: 'ID of the user who authored the post' },
                        title: { type: 'string', description: 'Title of the post' },
                        code_snippet: { type: 'string', description: 'Code snippet' },
                        language: { type: 'string', nullable: true, description: 'Programming language' },
                        description: { type: 'string', nullable: true, description: 'Description of the code' },
                        github_repo_url: { type: 'string', nullable: true, description: 'GitHub repository URL' },
                        created_at: { type: 'string', format: 'date-time', readOnly: true },
                        updated_at: { type: 'string', format: 'date-time', readOnly: true }
                    },
                    required: ['user_id', 'title', 'code_snippet']
                },
                Comment:
                {
                    type: 'object',
                    properties:
                    {
                        id: { type: 'integer', readOnly: true },
                        post_id: { type: 'integer' },
                        user_id: { type: 'integer' },
                        content: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time', readOnly: true },
                        updated_at: { type: 'string', format: 'date-time', readOnly: true }
                    },
                    required: ['post_id', 'user_id', 'content']
                },
                Reaction:
                {
                    type: 'object',
                    properties:
                    {
                        id: { type: 'integer', readOnly: true },
                        user_id: { type: 'integer' },
                        entity_id: { type: 'integer' },
                        entity_type: { type: 'string', description: 'Type of entity (post/comment)' },
                        reaction_type: { type: 'string', description: 'Type of reaction' },
                        created_at: { type: 'string', format: 'date-time', readOnly: true }
                    },
                    required: ['user_id', 'entity_id', 'entity_type', 'reaction_type']
                }
            }
        }
    },
    apis: ['./src/routes/*.js'], // Correct path for JSDoc scanning
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- Main API Routes ---
app.use('/api/users', userRoutes); // All user-related routes start with /api/users
app.use('/api/posts', postRoutes); // All post-related routes start with /api/posts
app.use('/api/auth', authRoutes); // All authentication-related routes start with /api/auth

// Basic Route for testing the server
app.get('/', (req, res) =>
{
    res.send('Welcome to Code Book!');
});

// --- Start the server ---
app.listen(PORT, () =>
{
    console.log(`Code Book Server running on port ${PORT}`);
    console.log(`Access API at: http://localhost:${PORT}/api`);
    console.log(`Access Swagger Docs at: http://localhost:${PORT}/api-docs`);
});