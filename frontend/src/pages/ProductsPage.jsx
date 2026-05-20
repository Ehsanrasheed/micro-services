import { useEffect, useState } from "react";
import { createProduct, fetchProducts } from "../api";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await createProduct({
        name: form.name,
        price: Number(form.price)
      });
      setForm({ name: "", price: "" });
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="grid-layout">
      <div className="card">
        <h2>Add Product</h2>
        <form className="stack" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
          <label>
            Price
            <input
              type="number"
              step="0.01"
              value={form.price}
              onChange={(event) => setForm({ ...form, price: event.target.value })}
              required
            />
          </label>
          <button type="submit">Save Product</button>
        </form>
        {error ? <p className="error">{error}</p> : null}
      </div>

      <div className="card">
        <h2>Products</h2>
        <div className="list">
          {products.map((product) => (
            <article className="list-item" key={product._id}>
              <strong>{product.name}</strong>
              <span>${product.price}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;
