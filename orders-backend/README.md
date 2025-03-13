# Orders Management Backend

This project is the backend service for managing orders. It provides APIs for creating, updating, retrieving, and deleting orders.

## Features

- Create new orders
- Update existing orders
- Retrieve order details
- Delete orders
- Create new products
- Update existing products
- Retrieve product details
- Delete products

## Technologies Used

- Node.js
- Express.js
- MySQL

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL

### Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/david-rosval/orders-backend.git
  ```
2. Navigate to the project directory:
  ```sh
  cd orders-backend
  ```
3. Install dependencies:
  ```sh
  npm install
  ```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
  ```env
  DB_HOST=dbhost
  DB_MYSQL_PORT=dbport
  DB_USER=dbuser
  DB_PASSWORD=dbpassword
  DB_DATABASE=dbname
  ```

### Running the Application

1. Start the server:
  ```sh
  npm start
  ```
2. The server will be running at `http://localhost:3001` by default.

### Folder Structure

```
orders-backend/
├──src/
  ├── controllers/        # Route controllers for all the endpoints
  ├── models/             # Database models 
  ├── routes/             # Route definitions
  ├── utils/              # Utility functions
  ├── .env                # Environment variables
├── app.js                # Creating of the Express app
├── config.js             # Environment variables configuration
├── db.js                 # Dabatase connection
├── index.js              # Entry point of the application

```

## API Endpoints

- `GET /api/orders` - Retrieve all orders
- `GET /api/orders/:id` - Retrieve a specific order by ID
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id/products` - Update an existing order products
- `PATCH /api/orders/:id/status` - Update an order status
- `DELETE /api/orders/:id` - Delete an order

- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Retrieve a specific product by ID
- `POST /api/products` - Create a new order
- `PUT /api/products/:id` - Update an existing product
- `DELETE /api/products/:id` - Delete a product

