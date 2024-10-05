# Microservices Frontend Application

This is a React application that serves as the user interface for the Microservices Backend. It allows users to upload files, manage user accounts, and view user information seamlessly.

## Features

- User registration and management
- File upload functionality with live previews
- Display all registered users
- Responsive and modern design

## Requirements

Before running the application, ensure you have the following installed:

- Docker
- Node.js (v16 or higher)
- npm (Node Package Manager)

## Environment Variables

The application requires the following environment variable to be set for proper configuration:

### Required Environment Variables

- `REACT_APP_BACKEND_URL`: URL of your backend API (e.g., `http://localhost:5000`)

## Running the Application

To run the application in a Docker container, use the following command:

```bash
docker build -t my-react-app .
docker run --rm -p 3000:80 --name frontend-app \
  -e REACT_APP_BACKEND_URL='http://localhost:5000' \
  my-react-app
```

To run the application locally, use the following commands:

```
    npm install
    npm start
```
