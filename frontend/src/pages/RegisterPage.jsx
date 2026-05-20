import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await registerUser(form);
      setMessage("Registration successful. You can now log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card auth-card">
      <h2>Register</h2>
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
        <button type="submit">Create Account</button>
      </form>
      {message ? <p className="success">{message}</p> : null}
      {error ? <p className="error">{error}</p> : null}
      <p className="muted">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
