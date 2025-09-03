import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/Api";
import { useAuth } from "../context/AuthContext";

// ----- Inline Styles -----
const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #0f172a, #1e3a8a, #0ea5e9)", // deep navy → blue → cyan
  fontFamily: "'Poppins', sans-serif",
};

const glassCard = {
  background: "rgba(255, 255, 255, 0.12)",
  backdropFilter: "blur(18px)",
  borderRadius: "20px",
  padding: "3rem 2.5rem",
  width: "100%",
  maxWidth: "420px",
  boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
  color: "#f1f5f9",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

const headerStyle = {
  textAlign: "center",
  fontSize: "2.2rem",
  fontWeight: "700",
  marginBottom: "1.5rem",
  letterSpacing: "0.5px",
  color: "#e0f2fe", // light cyan text
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  marginBottom: "1.3rem",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.25)",
  outline: "none",
  fontSize: "1rem",
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  color: "#f8fafc",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "0.5rem",
  borderRadius: "12px",
  border: "none",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", // cyan → teal
  color: "#fff",
  transition: "all 0.3s ease",
};

const errorStyle = {
  background: "rgba(239, 68, 68, 0.2)",
  color: "#fecaca",
  padding: "0.7rem",
  borderRadius: "8px",
  fontWeight: "600",
  marginBottom: "1.2rem",
  textAlign: "center",
};

const footerText = {
  textAlign: "center",
  marginTop: "1.8rem",
  fontSize: "0.95rem",
  color: "#cbd5e1",
};

const linkStyle = {
  color: "#38bdf8", // bright cyan
  fontWeight: "700",
  textDecoration: "underline",
  marginLeft: "4px",
};

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser(form);
      const token = res.data.token;
      if (!token) throw new Error("No token received");

      localStorage.setItem("hc_token", token);
      login({ token, user: null });
      navigate("/");
    } catch {
      setError("Login failed — please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 👇 CSS injected here so placeholders show in white */}
      <style>
        {`
          input::placeholder {
            color: #ffffff;
            opacity: 0.85;
          }
        `}
      </style>

      <div style={containerStyle}>
        <div style={glassCard}>
          <h2 style={headerStyle}>Welcome Back 👋</h2>

          {error && <div style={errorStyle}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div style={footerText}>
            Don’t have an account?
            <a href="/register" style={linkStyle}>
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
