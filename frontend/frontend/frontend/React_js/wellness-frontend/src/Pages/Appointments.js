import React, { useEffect, useState } from "react";
import {
  getAllPatients,
  getProviders,
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../services/Api";
import { Form, Button, Table, Card, Alert, Spinner } from "react-bootstrap";

const AppointmentBooking = () => {
  const [patients, setPatients] = useState([]);
  const [providers, setProviders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    id: null,
    patient_id: "",
    provider_id: "",
    appointment_date: "",
    notes: "",
    status: "PENDING",
  });
  const [loading, setLoading] = useState(false);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAppointments, setShowAppointments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, providersRes] = await Promise.all([
          getAllPatients(),
          getProviders(),
        ]);
        setPatients(patientsRes.data);
        setProviders(providersRes.data);
      } catch {
        setError("Failed to load dropdown data.");
      }
    };
    fetchData();
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    setError(null);
    try {
      const response = await getAppointments();
      setAppointments(response.data);
    } catch {
      setError("Failed to fetch appointments.");
    } finally {
      setLoadingAppointments(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setForm({
      id: null,
      patient_id: "",
      provider_id: "",
      appointment_date: "",
      notes: "",
      status: "PENDING",
    });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      appointmentDate: form.appointment_date,
      notes: form.notes,
      status: form.status,
      patient: { id: Number(form.patient_id) },
      provider: { id: Number(form.provider_id) },
    };

    try {
      if (form.id) {
        await updateAppointment(form.id, payload);
        setSuccess("Appointment updated successfully.");
      } else {
        await createAppointment(payload);
        setSuccess("Appointment booked successfully.");
      }
      clearForm();
      fetchAppointments();
    } catch {
      setError("Failed to save appointment.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (appt) => {
    setForm({
      id: appt.id,
      patient_id: appt.patient?.id || "",
      provider_id: appt.provider?.id || "",
      appointment_date: appt.appointmentDate
        ? appt.appointmentDate.slice(0, 16)
        : "",
      notes: appt.notes || "",
      status: appt.status || "PENDING",
    });
    setShowAppointments(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;
    setLoading(true);
    try {
      await deleteAppointment(id);
      setSuccess("Deleted successfully.");
      if (form.id === id) clearForm();
      fetchAppointments();
    } catch {
      setError("Failed to delete appointment.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setLoading(true);
    try {
      await updateAppointment(id, { status });
      setSuccess("Status updated.");
      setAppointments((appointments) =>
        appointments.map((appt) =>
          appt.id === id ? { ...appt, status } : appt
        )
      );
    } catch {
      setError("Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  // THEME STYLES
  const containerStyle = {
    background: "linear-gradient(135deg, #0f172a, #1e293b, #0ea5e9)",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "'Poppins', sans-serif",
    color: "#f1f5f9",
  };

  const cardStyle = {
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    color: "#f1f5f9",
  };

  const headerStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    textAlign: "center",
    background: "linear-gradient(90deg, #bfcbd0ff, #b6bec5ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1.2rem",
  };

  const buttonPrimary = {
    background: "linear-gradient(90deg, #0ea5e9, #38bdf8)",
    border: "none",
    borderRadius: "10px",
    padding: "0.6rem 1.4rem",
    fontWeight: "600",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(14,165,233,0.4)",
    transition: "all 0.3s ease",
  };

  const buttonSecondary = {
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "10px",
    padding: "0.6rem 1.4rem",
    fontWeight: "600",
    color: "#f1f5f9",
  };

  const tableHeaderStyle = {
    background: "linear-gradient(90deg, #1877a3ff, #38bdf8)",
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <div className="container" style={{ maxWidth: "900px" }}>
        <Card style={cardStyle} className="p-4 mb-5">
          <h3 style={headerStyle}>
            {form.id ? "✏️ Edit Appointment" : "🗓 Book Appointment"}
          </h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-white">Patient</Form.Label>
              <Form.Select
                name="patient_id"
                value={form.patient_id}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Patient --</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-white">Provider</Form.Label>
              <Form.Select
                name="provider_id"
                value={form.provider_id}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Provider --</option>
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.specialization})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-white">Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="appointment_date"
                value={form.appointment_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-white">Status</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-white">Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={form.notes}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex gap-3">
              <Button
                type="submit"
                disabled={loading}
                style={buttonPrimary}
                className="text-white"
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    {form.id ? "Updating..." : "Booking..."}
                  </>
                ) : form.id ? (
                  "Update Appointment"
                ) : (
                  "Book Appointment"
                )}
              </Button>

              {form.id && (
                <Button onClick={clearForm} style={buttonSecondary}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </Card>

        <div className="text-center">
          <Button
            onClick={() => setShowAppointments((prev) => !prev)}
            style={buttonPrimary}
          >
            {showAppointments ? "Hide Appointments" : "View Appointments"}
          </Button>
        </div>

        {showAppointments && (
          <Card style={cardStyle} className="p-3 mt-4">
            <h4
              className="fw-bold mb-3 text-center"
              style={{
                background: "linear-gradient(90deg, #0ea5e9, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              📋 Appointments
            </h4>

            {loadingAppointments ? (
              <p className="text-center">Loading appointments...</p>
            ) : appointments.length === 0 ? (
              <p className="text-center">No appointments found.</p>
            ) : (
              <Table hover responsive bordered className="align-middle">
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Patient</th>
                    <th style={tableHeaderStyle}>Provider</th>
                    <th style={tableHeaderStyle}>Date & Time</th>
                    <th style={tableHeaderStyle}>Notes</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.id}>
                      <td>{appt.patient?.name || "Unknown"}</td>
                      <td>{appt.provider?.name || "Unknown"}</td>
                      <td>{new Date(appt.appointmentDate).toLocaleString()}</td>
                      <td>{appt.notes || "-"}</td>
                      <td>
                        <Form.Select
                          value={appt.status}
                          onChange={(e) =>
                            handleStatusChange(appt.id, e.target.value)
                          }
                          disabled={loading}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </Form.Select>
                      </td>
                      <td className="d-flex gap-2 justify-content-center">
                        <Button
                          size="sm"
                          variant="outline-warning"
                          onClick={() => handleEdit(appt)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(appt.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
