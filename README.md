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

## Kubernetes Deployment (Local)

Use the manifests under `k8s/` to deploy MongoDB, all services, and frontend.

```bash
kubectl apply -f k8s/mongodb/
kubectl apply -f k8s/user/
kubectl apply -f k8s/product/product-all.yaml
kubectl apply -f k8s/order/order-all.yaml
kubectl apply -f k8s/frontend/frontend-all.yaml
kubectl apply -f k8s/ingress.yaml
```

To verify resources:

```bash
kubectl get pods
kubectl get svc
kubectl get ingress
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
