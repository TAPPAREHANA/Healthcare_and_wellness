import React, { useEffect, useState } from "react";
import {
  getEnrollments,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getAllPatients,
  getWellnessServices,
} from "../services/Api";

// 🌌 Premium Theme Styles
const containerStyle = {
  maxWidth: "900px",
  margin: "2rem auto",
  padding: "2rem",
  borderRadius: "20px",
  background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0ea5e9 100%)",
  color: "#092e54ff",
  fontFamily: "'Poppins', sans-serif",
  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
};

const cardStyle = {
  background: "rgba(255,255,255,0.12)",
  borderRadius: "16px",
  padding: "2rem",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

const headingStyle = {
  fontSize: "2rem",
  fontWeight: "700",
  marginBottom: "1.5rem",
  textAlign: "center",
  color: "#38bdf8",
};

const formStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5rem",
  marginBottom: "2rem",
};

const labelStyle = {
  flex: "1 1 45%",
  display: "flex",
  flexDirection: "column",
  fontSize: "1rem",
  fontWeight: "600",
  color: "#e2e8f0",
};

const inputStyle = {
  marginTop: "6px",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.2)",
  fontSize: "1rem",
  background: "rgba(255,255,255,0.08)",
  color: "#f8fafc",
  outline: "none",
  transition: "all 0.3s ease",
};

const numberInputStyle = {
  ...inputStyle,
  maxWidth: "120px",
};

const buttonContainerStyle = {
  flex: "1 1 100%",
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
};

const buttonStyle = {
  padding: "12px 24px",
  borderRadius: "14px",
  fontWeight: "600",
  fontSize: "1rem",
  backgroundImage: "linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 8px 24px rgba(14,165,233,0.5)",
  transition: "transform 0.2s ease, box-shadow 0.3s ease",
};

const cancelBtnStyle = {
  ...buttonStyle,
  backgroundImage: "linear-gradient(135deg, #6c757d 0%, #495057 100%)",
};

const tableCardStyle = {
  background: "rgba(255,255,255,0.08)",
  padding: "1.5rem",
  borderRadius: "16px",
  boxShadow: "0 8px 36px rgba(0,0,0,0.25)",
  overflowX: "auto",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "1rem",
  color: "#f8fafc",
};

const thStyle = {
  backgroundColor: "rgba(14,165,233,0.6)",
  color: "#fff",
  padding: "12px 15px",
  textAlign: "left",
  fontWeight: "600",
};

const tdStyle = {
  padding: "12px 15px",
  borderBottom: "1px solid rgba(255,255,255,0.15)",
};

const actionBtn = {
  padding: "8px 14px",
  borderRadius: "10px",
  fontWeight: "600",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const editBtnStyle = {
  ...actionBtn,
  backgroundColor: "#22c55e",
  color: "#fff",
};

const deleteBtnStyle = {
  ...actionBtn,
  backgroundColor: "#ef4444",
  color: "#fff",
};

const errorStyle = {
  color: "#f87171",
  marginBottom: "1rem",
  fontWeight: "600",
  textAlign: "center",
};

const successStyle = {
  color: "#4ade80",
  marginBottom: "1rem",
  fontWeight: "600",
  textAlign: "center",
};

// 🌐 Component
const EnrollmentsCRUD = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    id: null,
    patientId: "",
    serviceId: "",
    startDate: "",
    endDate: "",
    progress: 0,
  });

  const [loading, setLoading] = useState(false);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingEnrollments(true);
      try {
        const [enrRes, patRes, serRes] = await Promise.all([
          getEnrollments(),
          getAllPatients(),
          getWellnessServices(),
        ]);
        setEnrollments(enrRes.data);
        setPatients(patRes.data);
        setServices(serRes.data);
      } catch (err) {
        setError("Failed to load data.");
        console.error(err);
      } finally {
        setLoadingEnrollments(false);
      }
    };
    fetchInitialData();
  }, []);

  const clearForm = () => {
    setForm({
      id: null,
      patientId: "",
      serviceId: "",
      startDate: "",
      endDate: "",
      progress: 0,
    });
    setError(null);
    setSuccess(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "progress" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        patientId: Number(form.patientId),
        serviceId: Number(form.serviceId),
        startDate: form.startDate,
        endDate: form.endDate,
        progress: form.progress,
      };

      if (form.id) {
        await updateEnrollment(form.id, payload);
        setSuccess("Enrollment updated successfully!");
      } else {
        await createEnrollment(payload);
        setSuccess("Enrollment created successfully!");
      }

      clearForm();

      const res = await getEnrollments();
      setEnrollments(res.data);
    } catch (err) {
      setError("Failed to save enrollment.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (enroll) => {
    setForm({
      id: enroll.id,
      patientId: enroll.patientId || "",
      serviceId: enroll.serviceId || "",
      startDate: enroll.startDate || "",
      endDate: enroll.endDate || "",
      progress: enroll.progress || 0,
    });
    setError(null);
    setSuccess(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this enrollment?")) return;
    setLoading(true);
    try {
      await deleteEnrollment(id);
      setSuccess("Enrollment deleted.");
      if (form.id === id) clearForm();
      const res = await getEnrollments();
      setEnrollments(res.data);
    } catch (err) {
      setError("Failed to delete enrollment.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>
          {form.id ? "Edit Enrollment" : "New Enrollment"}
        </h2>
        {(error || success) && (
          <div style={error ? errorStyle : successStyle}>{error || success}</div>
        )}

        <form style={formStyle} onSubmit={handleSubmit}>
          <label style={labelStyle}>
            Patient:
            <select
              name="patientId"
              value={form.patientId}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.email})
                </option>
              ))}
            </select>
          </label>

          <label style={labelStyle}>
            Wellness Service:
            <select
              name="serviceId"
              value={form.serviceId}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select service</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>

          <label style={labelStyle}>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            End Date:
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Progress (%):
            <input
              type="number"
              name="progress"
              min="0"
              max="100"
              value={form.progress}
              onChange={handleChange}
              required
              style={numberInputStyle}
            />
          </label>

          <div style={buttonContainerStyle}>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                ...(loading ? { cursor: "not-allowed", opacity: 0.6 } : {}),
              }}
            >
              {loading
                ? form.id
                  ? "Updating..."
                  : "Creating..."
                : form.id
                ? "Update Enrollment"
                : "Create Enrollment"}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={clearForm}
                style={cancelBtnStyle}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3 style={{ ...headingStyle, fontSize: "1.5rem" }}>
          Enrollments List
        </h3>
        {loadingEnrollments ? (
          <p>Loading enrollments...</p>
        ) : enrollments.length === 0 ? (
          <p>No enrollments found.</p>
        ) : (
          <div style={tableCardStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Patient</th>
                  <th style={thStyle}>Service</th>
                  <th style={thStyle}>Start Date</th>
                  <th style={thStyle}>End Date</th>
                  <th style={thStyle}>Progress</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enroll) => (
                  <tr key={enroll.id}>
                    <td style={tdStyle}>{enroll.id}</td>
                    <td style={tdStyle}>
                      {enroll.patient?.name || "Unknown Patient"}
                    </td>
                    <td style={tdStyle}>
                      {enroll.service?.name || "Unknown Service"}
                    </td>
                    <td style={tdStyle}>{enroll.startDate}</td>
                    <td style={tdStyle}>{enroll.endDate}</td>
                    <td style={tdStyle}>{enroll.progress} %</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => handleEdit(enroll)}
                        disabled={loading}
                        style={editBtnStyle}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(enroll.id)}
                        disabled={loading}
                        style={deleteBtnStyle}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentsCRUD;
