# Vault

A secure and user-friendly password management application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to safely store, manage, and retrieve their passwords with encryption, ensuring data privacy and security.

## Features

- **Secure Authentication:** User login with encrypted password storage for added security.
- **Password Storage:** Safely store and retrieve passwords, accessible only to the user.
- **Password Generation:** Built-in tool to generate strong, unique passwords.
- **Encryption:** End-to-end encryption for all stored passwords, ensuring maximum data security.
- **Responsive UI:** A user-friendly and responsive design built with React.

## Tech Stack

- **Frontend:** React, Tailwind CSS, JavaScript
- **Backend:** Node.js 
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Encryption:** bcrypt for password hashing

## Getting Started

Follow these steps to get the project up and running locally.

### 1. Clone the repository

```bash
git clone https://github.com/videshravi27/Password-Manager.git
```

- **Create a .env file in the backend directory and add the following:**

- **1.1.** MONGO_URI=your_mongodb_connection_string
- **1.2.** JWT_SECRET=your_jwt_secret

### 2. Install dependency

```bash
cd server
npm install

cd client
npm install
```

### 3. Run the app

```bash
cd server
npm start

cd client
npm run dev
```
