# Backend

This is the backend service for the Code-Book project. It is built with Node.js and Express, and provides RESTful APIs for authentication, user management, and post management.

## Features
- User authentication (JWT-based)
- User registration and login
- CRUD operations for posts
- User profile management
- Docker support for easy deployment
- **Automated testing with Jest and Supertest**

## Project Structure
```
backend/
├── Dockerfile
├── package.json
├── server.js
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── routes/
│       ├── authRoutes.js
│       ├── postRoutes.js
│       └── userRoutes.js
├── tests/
│   ├── authController.test.js
│   ├── postController.test.js
│   └── userController.test.js
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm
- Docker (optional, for containerized deployment)
- MySQL database

### Installation
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Server
- To start the server locally:
  ```sh
  npm start
  ```
- The server will run on `http://localhost:5000` by default.

### Running Tests
- To run all backend tests:
  ```sh
  npm test
  ```
- Tests are located in the `tests/` directory and use [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladjs/supertest) for HTTP assertions.

### Using Docker
- Build and run the backend service with Docker:
  ```sh
  docker build -t codebook-backend .
  docker run -p 5000:5000 codebook-backend
  ```

### Environment Variables
Create a `.env` file in the project root with the following variables:
```
BACKEND_PORT=5000
DATABASE_HOST=your_mysql_host
DATABASE_USER=your_mysql_user
DATABASE_PASSWORD=your_mysql_password
DATABASE_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

## API Endpoints
- `POST /api/auth/login` - Login and receive a JWT
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/users` - Get all users

## Database
- The backend expects a MySQL database. See [database/README.md](../database/README.md) for setup.

## License
This project is licensed under the [GNU GPL v3](../LICENSE).
