import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = await loginUser(form);
      localStorage.setItem("jwtToken", data.token);
      navigate("/products");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card auth-card">
      <h2>Login</h2>
      <form className="stack" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {error ? <p className="error">{error}</p> : null}
      <p className="muted">
        New here? <Link to="/register">Register</Link>
      </p>
    </section>
  );
}

export default LoginPage;
