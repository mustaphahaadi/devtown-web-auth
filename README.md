# Devtown Web Auth Assignment

## Overview
This project demonstrates two authentication methods in Node.js:
- Password hashing using bcrypt
- JWT authentication with hashed passwords

## Files
- `hash-auth.js`: Example of password hashing for user authentication.
- `jwt-auth.js`: Example of JWT authentication, including password hashing and access level control (admin/user).

## Real-life Scenario
The JWT example simulates a system with two access levels:
- **Admin**: Can access `/admin` route
- **User**: Can access `/user` route

## How to Run
1. Install dependencies:
   ```bash
   npm install express bcrypt jsonwebtoken
   ```
2. Run the JWT server:
   ```bash
   node jwt-auth.js
   ```
3. Use API endpoints to register, login, and access protected routes.

## Submission
Push all code to GitHub before the deadline.
