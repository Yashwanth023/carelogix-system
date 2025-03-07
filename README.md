
# CareLogix Healthcare System

A comprehensive backend system for a healthcare application using Node.js, Express.js, and PostgreSQL. The system allows users to register, log in, and manage patient and doctor records securely.

## Features

- User authentication with JWT
- Patient management
- Doctor management
- Patient-Doctor relationship mapping
- RESTful API endpoints
- PostgreSQL database with Sequelize ORM

## API Endpoints

### Authentication APIs
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user and return a JWT token

### Patient Management APIs
- `POST /api/patients` - Add a new patient (Authenticated users only)
- `GET /api/patients` - Retrieve all patients created by the authenticated user
- `GET /api/patients/:id` - Get details of a specific patient
- `PUT /api/patients/:id` - Update patient details
- `DELETE /api/patients/:id` - Delete a patient record

### Doctor Management APIs
- `POST /api/doctors` - Add a new doctor (Authenticated users only)
- `GET /api/doctors` - Retrieve all doctors
- `GET /api/doctors/:id` - Get details of a specific doctor
- `PUT /api/doctors/:id` - Update doctor details
- `DELETE /api/doctors/:id` - Delete a doctor record

### Patient-Doctor Mapping APIs
- `POST /api/mappings` - Assign a doctor to a patient
- `GET /api/mappings` - Retrieve all patient-doctor mappings
- `GET /api/mappings/:patientId` - Get all doctors assigned to a specific patient
- `DELETE /api/mappings/:id` - Remove a doctor from a patient

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- PostgreSQL (v12 or later)

### Setting up the PostgreSQL Database

1. Install PostgreSQL on your local machine if you haven't already
2. Create a new database:
   ```sql
   CREATE DATABASE healthcare_db;
   ```
3. Create a user (or use the default postgres user)
   ```sql
   CREATE USER healthcare_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE healthcare_db TO healthcare_user;
   ```

### Installing and Running the Application

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd healthcare-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your PostgreSQL database credentials and JWT secret

5. Start the development server:
   ```bash
   npm run dev
   ```

6. The server should now be running at http://localhost:5000

## Technologies Used

- Node.js and Express.js for the backend
- PostgreSQL as the database
- Sequelize ORM for database modeling
- JWT for authentication
- TypeScript for type safety
- React with Tailwind CSS for the frontend

## License

MIT
