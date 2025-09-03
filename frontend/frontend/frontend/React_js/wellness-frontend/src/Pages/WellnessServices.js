import React, { useState, useEffect } from "react";
import {
  getWellnessServices,
  createWellnessService,
  updateWellnessService,
  deleteWellnessService,
} from "../services/Api";
import {
  Container,
  Card,
  Form,
  Button,
  Table,
  Alert,
  Spinner,
  Collapse,
} from "react-bootstrap";

const WellnessServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    serviceName: "",
    description: "",
    duration: "",
    fee: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setError("");
    try {
      const response = await getWellnessServices();
      setServices(response.data);
    } catch {
      setError("Failed to load services.");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.serviceName || !form.description || !form.duration || !form.fee) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    const payload = {
      name: form.serviceName,
      description: form.description,
      duration: form.duration,
      fee: form.fee,
    };
    try {
      if (editId) {
        await updateWellnessService(editId, payload);
        setSuccess("Service updated successfully.");
        setEditId(null);
      } else {
        await createWellnessService(payload);
        setSuccess("Service created successfully.");
      }
      setForm({ serviceName: "", description: "", duration: "", fee: "" });
      fetchServices();
    } catch {
      setError("Failed to save service.");
    }
    setLoading(false);
  }

  function handleEdit(service) {
    setEditId(service.id);
    setForm({
      serviceName: service.name || "",
      description: service.description || "",
      duration: service.duration || "",
      fee: service.fee || "",
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await deleteWellnessService(id);
      if (editId === id) setEditId(null);
      setSuccess("Service deleted successfully.");
      fetchServices();
    } catch {
      setError("Failed to delete service.");
    }
    setLoading(false);
  }

  // Premium Theme Styles
  const containerStyle = {
    minHeight: "100vh",
    padding: "40px 15px",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #0f172a, #1e293b, #164e63)",
    color: "#e2e8f0",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "30px",
    fontWeight: "700",
    fontSize: "2rem",
    color: "#67e8f9",
    textShadow: "0 0 12px rgba(103, 232, 249, 0.7)",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
    color: "#e2e8f0",
  };

  const inputStyle = {
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(103, 232, 249, 0.3)",
    color: "#e2e8f0",
  };

  const buttonPrimary = {
    background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
    border: "none",
    fontWeight: "600",
    boxShadow: "0 6px 14px rgba(6,182,212,0.6)",
  };

  const buttonSecondary = {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(103,232,249,0.4)",
    color: "#67e8f9",
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      <Container style={{ maxWidth: "900px" }}>
        <Card style={cardStyle} className="p-4">
          <Card.Body>
            {/* Header */}
            <div className="text-center mb-4">
              <img
                src="https://cdn-icons-gif.flaticon.com/19015/19015898.gif"
                alt="Wellness Icon"
                style={{ width: "90px", marginBottom: "10px" }}
              />
              <h2 style={headerStyle}>Wellness Services</h2>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {/* Form */}
            <Form onSubmit={handleSubmit} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="serviceName"
                  placeholder="Service Name"
                  value={form.serviceName}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="duration"
                  placeholder="Duration (e.g., 5 days, 2 weeks)"
                  value={form.duration}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  step="0.01"
                  name="fee"
                  placeholder="Fee (e.g., 100.00)"
                  value={form.fee}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                style={buttonPrimary}
                className="w-100 py-2 rounded"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" animation="border" /> Saving...
                  </>
                ) : editId ? (
                  "Update Service"
                ) : (
                  "Create Service"
                )}
              </Button>
            </Form>

            {/* Toggle Button */}
            <div className="text-center mb-3">
              <Button
                onClick={() => setShowServices((prev) => !prev)}
                style={buttonSecondary}
                className="px-4 py-2 rounded"
              >
                {showServices ? "Hide Services ▲" : "View Services ▼"}
              </Button>
            </div>

            {/* Services Table */}
            <Collapse in={showServices}>
              <div>
                <Table
                  responsive
                  hover
                  bordered
                  className="align-middle"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "12px",
                    color: "#e2e8f0",
                  }}
                >
                  <thead style={{ background: "rgba(103,232,249,0.15)" }}>
                    <tr>
                      <th>ID</th>
                      <th>Service Name</th>
                      <th>Description</th>
                      <th>Duration</th>
                      <th>Fee</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center p-4">
                          No wellness services found.
                        </td>
                      </tr>
                    ) : (
                      services.map((service) => (
                        <tr key={service.id}>
                          <td>{service.id}</td>
                          <td className="fw-semibold">{service.name}</td>
                          <td>{service.description}</td>
                          <td>{service.duration}</td>
                          <td>
                            <span
                              className="badge"
                              style={{
                                background: "linear-gradient(90deg,#06b6d4,#3b82f6)",
                                color: "white",
                              }}
                            >
                              {service.fee}
                            </span>
                          </td>
                          <td>
                            <Button
                              size="sm"
                              style={{
                                background: "rgba(234,179,8,0.15)",
                                border: "1px solid rgba(234,179,8,0.5)",
                                color: "#facc15",
                              }}
                              className="me-2"
                              onClick={() => handleEdit(service)}
                              disabled={loading}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              style={{
                                background: "rgba(239,68,68,0.15)",
                                border: "1px solid rgba(239,68,68,0.5)",
                                color: "#f87171",
                              }}
                              onClick={() => handleDelete(service.id)}
                              disabled={loading}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Collapse>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default WellnessServices;
