### Healthflex Application Documentation

### Introduction

- Welcome to the Healthflex Application.
- This application is designed to provide robust health and wellness services through a series of APIs.
- This documentation will guide you through the configuration and usage of the application.

---

### Installation steps:

1. Clone the project repository from your version control system (e.g., Git):

   ```bash
   git clone https://github.com/AvinashChandavar7/health_flex_assessment-.git
   ```

   Replace `<repository_url>` with the URL of your project repository.

2. Navigate to the cloned project directory:

   ```
   cd backend
   ```

3. Run `npm install` to install dependencies.

4. Use `npm run dev` to start the server in development mode with automatic restarts.

5. Optionally, generate Swagger documentation with `npm run generate-swagger`.

6. Build your TypeScript files to JavaScript with `npm run build` for production.

7. Start the server in production mode using `npm start`.

---

### API Endpoints

The following API endpoints are available in the Healthflex Application:

#### User Authentication

- **Register a new user**

  - **URL**: `/api/v1/users/register`
  - **Method**: `POST`
  - **Tags**: `User-Auth`
  - **Request Body**:
    ```json
    {
      "username": "any",
      "password": "any"
    }
    ```
  - **Responses**:
    - `200 OK`: Registration successful.

- **Login a user**

  - **URL**: `/api/v1/users/login`
  - **Method**: `POST`
  - **Tags**: `User-Auth`
  - **Request Body**:
    ```json
    {
      "username": "any",
      "password": "any"
    }
    ```
  - **Responses**:
    - `200 OK`: Login successful.

- **Logout a user**
  - **URL**: `/api/v1/users/logout`
  - **Method**: `POST`
  - **Tags**: `User-Auth`
  - **Responses**:
    - `200 OK`: Logout successful.

#### User

- **Get user timeline**
  - **URL**: `/api/v1/users/{userId}/timeline`
  - **Method**: `GET`
  - **Tags**: `User`
  - **Parameters**:
    - `userId` (path): The ID of the user.
    - `cursor` (query, optional): For pagination.
    - `limit` (query, optional): Number of items to return.
  - **Responses**:
    - `200 OK`: Timeline retrieved successfully.

#### Tweet

- **Create a new tweet**
  - **URL**: `/api/v1/tweets/`
  - **Method**: `POST`
  - **Tags**: `Tweet`
  - **Request Body**:
    ```json
    {
      "text": "any"
    }
    ```
  - **Responses**:
    - `200 OK`: Tweet created successfully.

---
