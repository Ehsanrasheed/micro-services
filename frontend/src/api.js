const API_BASES = {
  auth: "http://localhost:3001/api/users",
  products: "http://localhost:3002/api/products",
  orders: "http://localhost:3003/api/orders"
};

async function request(url, options = {}) {
  const { headers: customHeaders, ...restOptions } = options;
  
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(customHeaders || {})
    },
    ...restOptions
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function registerUser(payload) {
  return request(`${API_BASES.auth}/register`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function loginUser(payload) {
  return request(`${API_BASES.auth}/login`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function fetchProducts() {
  return request(API_BASES.products, {
    headers: authHeaders()
  });
}

export async function createProduct(payload) {
  return request(API_BASES.products, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function fetchOrders() {
  return request(API_BASES.orders, {
    headers: authHeaders()
  });
}

export async function createOrder(payload) {
  return request(API_BASES.orders, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload)
  });
}

export function authHeaders() {
  const token = localStorage.getItem("jwtToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
