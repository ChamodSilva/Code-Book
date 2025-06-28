# Database

This directory contains the database schema and documentation for the Code-Book project.

## Contents
- `schema.sql`: SQL file containing the database schema definitions.
- `DATABASE.md`: Additional documentation and instructions for managing the database.

## Database Overview
The database is used to store user information, posts, and other related data for the Code-Book application. The schema is designed to support authentication, user profiles, and post management.

## Setting Up the Database

### Using the Schema
1. Ensure you have a compatible SQL database server installed (e.g., MySQL).
2. Create a new database for the project.
3. Run the contents of `schema.sql` to set up the required tables and relationships:
   ```sql
   -- Example command for MySQL
   mysql -u <username> -p <database_name> < schema.sql
   ```

### Configuration
- Update your backend service's database connection settings to point to the new database.
- Connection details are typically set in the project's `.env` file.

## Documentation
- See `DATABASE.md` for more detailed information about the schema, relationships, and any migration or seeding instructions.

## License

This project is licensed under the [GNU GPL v3](../LICENSE).
