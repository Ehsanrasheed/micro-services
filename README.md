# Microservices Demo

This project contains 3 simple Node.js microservices:

- `user-service` (port 3001): registration/login with JWT
- `product-service` (port 3002): product CRUD
- `order-service` (port 3003): create and view orders
- `frontend` (Vite React app): login, products, and orders UI

## Folder Structure

```text
microservices-demo/
├── user-service/
├── product-service/
├── order-service/
└── frontend/
```

## Run Instructions

1. Start MongoDB locally.
2. Install dependencies in each service folder:

```bash
cd user-service && npm install
cd ../product-service && npm install
cd ../order-service && npm install
```

3. Run each service in separate terminals:

```bash
cd user-service && npm run dev
cd product-service && npm run dev
cd order-service && npm run dev
```

4. Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

## Basic API Endpoints

### User Service

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile` (Bearer token required)

### Product Service

- `POST /api/products`
- `GET /api/products`
- `GET /api/products/:id`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Order Service

- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
