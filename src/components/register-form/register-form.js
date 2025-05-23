import { useState } from "react";
import './register-form.css';
import { useNavigate, NavLink } from "react-router-dom";
import { auth } from '../../firebase.js';
import { signInWithCustomToken } from "firebase/auth";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }

    try {
      const response = await fetch("https://serverweblab5.onrender.com/historical-platform/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Помилка реєстрації");
        return;
      }

      await signInWithCustomToken(auth, data.token);

      navigate("/");

    } catch (err) {
      setError("Помилка сервера: " + err.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h1>Реєстрація</h1>
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
      <input
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Підтвердження паролю"
        required
      />
      <button type="submit">Зареєструватися</button>
      <NavLink to="/login" style={{ textDecoration: "underline", color: "blue" }}>Увійти</NavLink>
      <p style={{ color: "red" }}>{error}</p>
    </form>
  );
};

export default RegisterForm;
