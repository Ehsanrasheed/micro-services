import { useEffect, useState } from "react";
import { createOrder, fetchOrders } from "../api";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ productId: "", quantity: "" });
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await createOrder({
        userId: "demo-user",
        items: [
          {
            productId: form.productId,
            quantity: Number(form.quantity)
          }
        ],
        totalAmount: Number(form.quantity) * 0
      });
      setForm({ productId: "", quantity: "" });
      loadOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="grid-layout">
      <div className="card">
        <h2>Place Order</h2>
        <form className="stack" onSubmit={handleSubmit}>
          <label>
            Product ID
            <input
              value={form.productId}
              onChange={(event) => setForm({ ...form, productId: event.target.value })}
              required
            />
          </label>
          <label>
            Quantity
            <input
              type="number"
              min="1"
              value={form.quantity}
              onChange={(event) => setForm({ ...form, quantity: event.target.value })}
              required
            />
          </label>
          <button type="submit">Create Order</button>
        </form>
        {error ? <p className="error">{error}</p> : null}
      </div>

      <div className="card">
        <h2>Orders</h2>
        <div className="list">
          {orders.map((order) => (
            <article className="list-item" key={order._id}>
              <div>
                <strong>Order {order._id.slice(-6)}</strong>
                <p className="muted">Items: {order.items?.length || 0}</p>
              </div>
              <span>${order.totalAmount}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OrdersPage;
