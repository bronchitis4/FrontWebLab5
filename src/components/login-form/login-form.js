import { useState } from "react";
import './login-form.css';
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from '../../firebase.js';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://serverweblab5.onrender.com/historical-platform/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Невірна пошта або пароль");
        return;
      }

      await signInWithCustomToken(auth, data.token);

      navigate("/");
    } catch (err) {
      setError("Помилка входу: " + err.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h1>Вхід</h1>

      <input
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Пошта"
        required
      />

      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        required
      />

      <button type="submit">Увійти</button>
      <NavLink to="/register" style={{ textDecoration: "underline", color: "blue" }}>Зареєструватися</NavLink>
      <p style={{ color: "red" }}>{error}</p>
    </form>
  );
};

export default LoginForm;
