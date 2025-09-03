import React, { useState, useEffect } from "react";
import {
  registerPatient,
  loginPatient,
  getPatientById,
  updatePatientProfile,
  getHealthRecords,
  updateHealthRecords,
} from "../services/Api";

const styles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a, #0ea5e9)", // dark navy → indigo → cyan
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "'Poppins', sans-serif",
  },
  cardSplit: {
    width: "520px",
    borderRadius: "22px",
    background: "rgba(255, 255, 255, 0.12)", // glassmorphism
    backdropFilter: "blur(18px)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
    overflow: "hidden",
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#f8fafc",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem",
    justifyContent: "center",
    gap: "10px",
  },
  logoText: {
    fontWeight: "700",
    color: "#38bdf8",
    fontSize: "1.6rem",
  },
  hospitalText: {
    fontWeight: "600",
    fontSize: "1.3rem",
    color: "#e2e8f0",
  },
  tabContainer: {
    display: "flex",
    marginBottom: "2rem",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
  },
  tab: (active) => ({
    flex: 1,
    padding: "12px 0",
    cursor: "pointer",
    fontWeight: active ? "700" : "500",
    color: active ? "#38bdf8" : "#94a3b8",
    borderBottom: active ? "3px solid #38bdf8" : "3px solid transparent",
    textAlign: "center",
    fontSize: "1.1rem",
    transition: "all 0.3s ease",
  }),
  input: {
    width: "100%",
    borderRadius: "10px",
    border: "1.5px solid rgba(255,255,255,0.25)",
    background: "rgba(255,255,255,0.12)",
    padding: "12px 14px",
    fontSize: "1rem",
    fontWeight: "500",
    marginBottom: "1.2rem",
    outline: "none",
    transition: "all 0.3s ease",
    color: "#f8fafc",
  },
  inputFocus: {
    borderColor: "#38bdf8",
    boxShadow: "0 0 10px rgba(56,189,248,0.6)",
  },
  textarea: {
    width: "100%",
    height: "130px",
    resize: "vertical",
    borderRadius: "10px",
    border: "1.5px solid rgba(255,255,255,0.25)",
    background: "rgba(255,255,255,0.12)",
    padding: "12px 14px",
    fontSize: "1rem",
    fontWeight: "500",
    marginBottom: "1.6rem",
    outline: "none",
    transition: "all 0.3s ease",
    color: "#f8fafc",
  },
  button: {
    width: "100%",
    borderRadius: "12px",
    border: "none",
    padding: "14px 0",
    fontWeight: "700",
    fontSize: "1.1rem",
    background: "linear-gradient(135deg, #0ea5e9, #14b8a6)", // cyan → teal
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(14,165,233,0.6)",
    transition: "all 0.3s ease",
    marginTop: "0.5rem",
  },
  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(14,165,233,0.8)",
  },
  alertMessage: {
    marginBottom: "1rem",
    fontWeight: "600",
    backgroundColor: "rgba(239, 68, 68, 0.25)",
    padding: "10px",
    borderRadius: "6px",
    color: "#fecaca",
    fontSize: "0.9rem",
    textAlign: "center",
  },
  passwordRow: {
    position: "relative",
  },
  showPasswordBtn: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    fontSize: "1.2rem",
    cursor: "pointer",
    color: "#cbd5e1",
  },
};

const Patients = () => {
  const [activeTab, setActiveTab] = useState("register");
  const [patientId, setPatientId] = useState(null);
  const [token, setToken] = useState("");
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    password: "",
  });
  const [healthRecords, setHealthRecords] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [focusedTextarea, setFocusedTextarea] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const fetchPatient = async () => {
    if (!patientId || !token) return;
    try {
      const response = await getPatientById(patientId, token);
      setPatient(response.data);
      const recordsRes = await getHealthRecords(patientId, token);
      setHealthRecords(recordsRes.data.records);
    } catch {
      setErrorMessage("Failed to fetch patient data.");
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [patientId, token]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await registerPatient(patient);
      setPatientId(response.data.id);
      setActiveTab("login");
      alert("Registered successfully! Please login.");
      setPatient((prev) => ({ ...prev, password: "" }));
    } catch {
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await loginPatient({
        email: patient.email,
        password: patient.password,
      });
      setToken(response.data.token);
      if (response.data.patientId) {
        setPatientId(response.data.patientId);
      }
      alert("Login successful!");
    } catch {
      setErrorMessage("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await updatePatientProfile(patientId, patient, token);
      setPatient(response.data);
      alert("Profile updated!");
    } catch {
      setErrorMessage("Profile update failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHealthRecords = async () => {
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await updateHealthRecords(patientId, healthRecords, token);
      setHealthRecords(response.data.healthRecords);
      alert("Health records updated!");
    } catch {
      setErrorMessage("Failed to update health records.");
    } finally {
      setLoading(false);
    }
  };

  const getInputStyle = (name) =>
    focusedInput === name
      ? { ...styles.input, ...styles.inputFocus }
      : styles.input;

  return (
    <div style={styles.root}>
      <div style={styles.cardSplit}>
        <div style={styles.logoRow}>
          <span style={styles.logoText}>GM Hospital</span>
        </div>

        {/* Tabs */}
        <div style={styles.tabContainer}>
          <div
            style={styles.tab(activeTab === "register")}
            onClick={() => setActiveTab("register")}
          >
            Register
          </div>
          <div
            style={styles.tab(activeTab === "login")}
            onClick={() => setActiveTab("login")}
          >
            Login
          </div>
        </div>

        {errorMessage && <div style={styles.alertMessage}>{errorMessage}</div>}

        {/* Register form */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister} autoComplete="off">
            <input
              style={getInputStyle("registerName")}
              placeholder="Name"
              value={patient.name}
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
              onFocus={() => setFocusedInput("registerName")}
              onBlur={() => setFocusedInput(null)}
              disabled={loading}
              required
            />
            <input
              type="email"
              style={getInputStyle("registerEmail")}
              placeholder="Email"
              value={patient.email}
              onChange={(e) => setPatient({ ...patient, email: e.target.value })}
              onFocus={() => setFocusedInput("registerEmail")}
              onBlur={() => setFocusedInput(null)}
              disabled={loading}
              required
            />
            <div style={styles.passwordRow}>
              <input
                style={getInputStyle("registerPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={patient.password}
                onChange={(e) =>
                  setPatient({ ...patient, password: e.target.value })
                }
                onFocus={() => setFocusedInput("registerPassword")}
                onBlur={() => setFocusedInput(null)}
                disabled={loading}
                required
              />
              <button
                type="button"
                style={styles.showPasswordBtn}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={
                hoveredButton === "register"
                  ? { ...styles.button, ...styles.buttonHover }
                  : styles.button
              }
              onMouseEnter={() => setHoveredButton("register")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}

        {/* Login form */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} autoComplete="off">
            <input
              type="email"
              style={getInputStyle("loginEmail")}
              placeholder="Email"
              value={patient.email}
              onChange={(e) => setPatient({ ...patient, email: e.target.value })}
              onFocus={() => setFocusedInput("loginEmail")}
              onBlur={() => setFocusedInput(null)}
              disabled={loading}
              required
            />
            <div style={styles.passwordRow}>
              <input
                style={getInputStyle("loginPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={patient.password}
                onChange={(e) =>
                  setPatient({ ...patient, password: e.target.value })
                }
                onFocus={() => setFocusedInput("loginPassword")}
                onBlur={() => setFocusedInput(null)}
                disabled={loading}
                required
              />
              <button
                type="button"
                style={styles.showPasswordBtn}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={
                hoveredButton === "login"
                  ? { ...styles.button, ...styles.buttonHover }
                  : styles.button
              }
              onMouseEnter={() => setHoveredButton("login")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* Profile */}
        {token && patientId && (
          <>
            <div style={{ marginTop: "2.5rem" }}>
              <h3
                style={{
                  fontWeight: "700",
                  fontSize: "1.3rem",
                  color: "#38bdf8",
                  marginBottom: "1rem",
                  borderBottom: "2px solid rgba(255,255,255,0.2)",
                  paddingBottom: "0.5rem",
                }}
              >
                Profile
              </h3>
              <input
                style={getInputStyle("profileName")}
                placeholder="Name"
                value={patient.name}
                onChange={(e) =>
                  setPatient({ ...patient, name: e.target.value })
                }
                onFocus={() => setFocusedInput("profileName")}
                onBlur={() => setFocusedInput(null)}
                disabled={loading}
              />
              <input
                style={getInputStyle("profilePhone")}
                placeholder="Phone"
                value={patient.phone}
                onChange={(e) =>
                  setPatient({ ...patient, phone: e.target.value })
                }
                onFocus={() => setFocusedInput("profilePhone")}
                onBlur={() => setFocusedInput(null)}
                disabled={loading}
              />
              <input
                style={getInputStyle("profileAddress")}
                placeholder="Address"
                value={patient.address}
                onChange={(e) =>
                  setPatient({ ...patient, address: e.target.value })
                }
                onFocus={() => setFocusedInput("profileAddress")}
                onBlur={() => setFocusedInput(null)}
                disabled={loading}
              />
              <input
                style={getInputStyle("profileDob")}
                type="date"
                value={patient.dob || ""}
                onChange={(e) => setPatient({ ...patient, dob: e.target.value })}
                onFocus={() => setFocusedInput("profileDob")}
                onBlur={() => setFocusedInput(null)}
                disabled={loading}
              />
              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                style={
                  hoveredButton === "updateProfile"
                    ? { ...styles.button, ...styles.buttonHover }
                    : styles.button
                }
                onMouseEnter={() => setHoveredButton("updateProfile")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Update Profile
              </button>
            </div>

            {/* Health Records */}
            <div style={{ marginTop: "2.5rem" }}>
              <h3
                style={{
                  fontWeight: "700",
                  fontSize: "1.3rem",
                  color: "#38bdf8",
                  marginBottom: "1rem",
                  borderBottom: "2px solid rgba(255,255,255,0.2)",
                  paddingBottom: "0.5rem",
                }}
              >
                Health Records
              </h3>
              <textarea
                style={
                  focusedTextarea
                    ? { ...styles.textarea, ...styles.inputFocus }
                    : styles.textarea
                }
                value={healthRecords}
                onChange={(e) => setHealthRecords(e.target.value)}
                onFocus={() => setFocusedTextarea(true)}
                onBlur={() => setFocusedTextarea(false)}
                rows={6}
                disabled={loading}
              />
              <button
                onClick={handleUpdateHealthRecords}
                disabled={loading}
                style={
                  hoveredButton === "updateHealth"
                    ? { ...styles.button, ...styles.buttonHover }
                    : styles.button
                }
                onMouseEnter={() => setHoveredButton("updateHealth")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Update Health Records
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Patients;
