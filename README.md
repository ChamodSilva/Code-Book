# Code-Book

Code-Book is a full-stack social platform for sharing code snippets, built with a React + Vite frontend, a Node.js/Express backend, and a MySQL database. Users can register, log in, create posts with code, and interact with others.

## Project Structure

```
.
├── backend/      # Node.js/Express REST API
├── frontend/     # React + Vite client app
├── database/     # SQL schema and DB docs
├── docker-compose.yml
├── .env
└── LICENSE
```

## Features

- User authentication (JWT-based)
- Create/view code posts with syntax highlighting
- User profiles
- Responsive 3-panel UI (Quicklinks, Feed, Social)
- RESTful API with Swagger docs
- Dockerized for easy development

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm
- Docker & Docker Compose (recommended)
- MySQL

### Quick Start (with Docker)

1. Copy `.env` and adjust credentials if needed.
2. Run:
   ```sh
   docker-compose up --build
   ```
3. Frontend: [http://localhost:5173](http://localhost:5173)  
   Backend API: [http://localhost:5000/api](http://localhost:5000/api)  
   Swagger Docs: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

### Manual Setup

See [backend/README.md](backend/README.md), [frontend/README.md](frontend/README.md), and [database/README.md](database/README.md) for standalone instructions.

## Database

- Schema: [database/schema.sql](database/schema.sql)
- Setup: See [database/README.md](database/README.md)

## License

This project is licensed under the [GNU GPL v3](LICENSE).