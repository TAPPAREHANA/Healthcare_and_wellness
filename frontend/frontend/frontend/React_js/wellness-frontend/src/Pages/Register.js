import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/Api"; // your API register function

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your inputs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #0f172a, #1e3a8a, #0ea5e9)", // dark navy → indigo → cyan
      }}
    >
      <div
        className="p-4 shadow"
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(255, 255, 255, 0.12)", // glassmorphism
          backdropFilter: "blur(16px)",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#f1f5f9",
        }}
      >
        <h3
          className="mb-4 text-center"
          style={{
            color: "#38bdf8", // cyan heading
            fontWeight: "700",
            letterSpacing: "1.2px",
          }}
        >
          Register
        </h3>

        {error && (
          <div
            className="alert"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.25)",
              color: "#fecaca",
              borderRadius: "6px",
              padding: "12px 16px",
              marginBottom: "20px",
              fontWeight: "600",
              fontSize: "0.9rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label"
              style={{ fontWeight: "600", color: "#e2e8f0" }}
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
              }}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{ fontWeight: "600", color: "#e2e8f0" }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ fontWeight: "600", color: "#e2e8f0" }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="Choose a strong password"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
              }}
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="form-label"
              style={{ fontWeight: "600", color: "#e2e8f0" }}
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
              required
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#28292aff",
              }}
            >
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
              <option value="WELLNESS_PROVIDER">Wellness Provider</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn w-100"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
              color: "white",
              fontWeight: "600",
              fontSize: "1rem",
              padding: "12px 0",
              borderRadius: "10px",
              border: "none",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
