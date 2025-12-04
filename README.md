# TRAVELLER-API 🌍

A production-grade backend API for a travel management application. Built with **Node.js**, **Express**, and **TypeScript**, this project follows a modular architecture and emphasizes security and scalability using Docker.

## 🚀 Key Features

* **Type-Safe Development:** Built entirely with TypeScript for robust code quality.
* **Strict TypeScript Configuration:**
    * **Zero `any` Policy:** The codebase avoids the usage of the `any` type to ensure full type safety and compile-time error checking.
    * **Custom Type Definitions:** Utilizes custom interfaces and types (located in `src/types`) to extend Express Request objects and define strict data shapes for API responses.

* **Containerized:** Fully Dockerized setup for consistent development and deployment environments.
* **Secure:**
    * **Helmet:** Sets various HTTP headers to secure the app.
    * **Rate Limiting:** Protects against brute-force attacks and abuse.
    * **CORS:** Configured for cross-origin resource sharing.
* **Authentication:** JWT-based stateless authentication (Bearer Token).
* **Logging:** HTTP request logging with **Morgan** and custom logging via **Winston** (in `utils/logger`).
* **Error Handling:** Centralized error handling using a custom `ApiError` class.

## 🛠️ Tech Stack

* **Core:** Node.js, Express.js
* **Language:** TypeScript (Strict Mode)
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JWT (Stateless Auth)
* **Tooling:** Docker, Thunder Client (for API testing), Morgan (Logging)

## 📂 Project Structure

traveller-api/
├── dist/   # Compiled JavaScript output

├── src/
│   │           
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── tripController.ts
│   ├── middlewares/
│   │   ├── auth.ts         # JWT validation middleware
│   │   └── errorHandler.ts # Global error handler
│   ├── models/
│   │   ├── auth.ts         # User schema
│   │   └── trip.ts         # Trip schema
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── health.ts
│   │   └── trip.ts
│   ├── utils/
│   │   ├── ApiError.ts     # Custom error class
│   │   └── logger.ts       # Winston/Morgan logger
│   ├── app.ts              # Express app setup
│   └── server.ts           # Entry point
├── tests/                  # Test suites
├── types/                  # Custom type definitions
├── .dockerignore
├── .env                    # Environment variables
├── .env.docker             # Docker specific env vars
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md




🚀 Getting Started

Prerequisites

# Node.js (v18+)

# Docker & Docker Compose (Recommended)

# MongoDB URI

installation & Run 

1. Clone and install

git clone <repo-url>
npm install

2.Environment Setup:cCreate a .env(dont forget about .env.docker ,.gitignore,.dockerignore)

PORT=4000
MONGODB_URI=your_mongo_url
JWT_SECRET=your_secret
NODE_ENV=development

3. Run with docker (Best Practice)

docker-compose up --build

4.Run Locally 
npm run dev

⚡ API Testing

All endpoints have been rigorously tested using Thunder Client(Recommended),POSTMAN OR INSOMNIA is also fine.

Key Workflows Tested:

Auth Flow: User Registration -> Login -> Receive JWT.

Protected Routes: Accessing /trips without a token returns 401 Unauthorized.

try all the crud operations

Validation: Sending invalid data types triggers 400 Bad Request with descriptive messages.

*Built by Amal Thomas*


