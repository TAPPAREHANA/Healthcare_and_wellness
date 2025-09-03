import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {
  PencilSquare,
  Trash,
  PersonFill,
  TelephoneFill,
  EnvelopeFill,
  BriefcaseFill,
} from "react-bootstrap-icons";
import {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider,
} from "../services/Api";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    password: "",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [showProviders, setShowProviders] = useState(false);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    const res = await getProviders();
    setProviders(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editId) {
        await updateProvider(editId, form);
        setEditId(null);
      } else {
        await createProvider(form);
      }
      setForm({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        password: "",
      });
      fetchProviders();
    } catch (err) {
      setError(err.response?.data || "Submission failed. Please try again.");
    }
  };

  const handleEdit = (provider) => {
    setEditId(provider.id);
    setForm({
      name: provider.name || "",
      email: provider.email || "",
      phone: provider.phone || "",
      specialization: provider.specialization || "",
      password: "",
    });
  };

  const handleDelete = async (id) => {
    await deleteProvider(id);
    fetchProviders();
  };

  // Premium theme styles
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
    fontSize: "2.2rem",
    color: "#67e8f9",
    textShadow: "0 0 14px rgba(103, 232, 249, 0.8)",
    letterSpacing: "1px",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
    marginBottom: "25px",
    color: "#e2e8f0",
  };

  const titleStyle = {
    fontWeight: "600",
    fontSize: "1.4rem",
    marginBottom: "20px",
    color: "#67e8f9",
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
      <div className="container" style={{ maxWidth: "1000px" }}>
        {/* Header */}
        <div style={headerStyle}>Manage Providers</div>

        {/* Form Card */}
        <Card style={cardStyle} className="p-4">
          <Card.Body>
            <Card.Title style={titleStyle}>
              {editId ? "Update Provider" : "Add New Provider"}
            </Card.Title>
            <Form onSubmit={handleSubmit} className="row g-3">
              <Form.Group className="col-md-6">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Control
                  type="text"
                  name="specialization"
                  placeholder="Specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required={!editId}
                  style={inputStyle}
                />
              </Form.Group>
              <div className="d-grid">
                <Button
                  type="submit"
                  style={buttonPrimary}
                  className="py-2 rounded"
                >
                  {editId ? "Update Provider" : "Add Provider"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Toggle Providers */}
        <div className="text-center mb-3">
          <Button
            onClick={() => setShowProviders((prev) => !prev)}
            style={buttonSecondary}
            className="px-4 py-2 rounded"
          >
            {showProviders ? "Hide Providers ▲" : "View Providers ▼"}
          </Button>
        </div>

        {/* Providers Table */}
        {showProviders && (
          <Card style={cardStyle} className="p-3">
            <Card.Body>
              <h5
                className="fw-bold mb-4 text-center"
                style={{ color: "#67e8f9" }}
              >
                Registered Providers
              </h5>
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
                    <th>#</th>
                    <th>
                      <PersonFill /> Name
                    </th>
                    <th>
                      <EnvelopeFill /> Email
                    </th>
                    <th>
                      <TelephoneFill /> Phone
                    </th>
                    <th>
                      <BriefcaseFill /> Specialization
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No providers found.
                      </td>
                    </tr>
                  ) : (
                    providers.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td className="fw-semibold">{p.name}</td>
                        <td>{p.email}</td>
                        <td>{p.phone}</td>
                        <td>
                          <span
                            className="badge"
                            style={{
                              background: "linear-gradient(90deg,#06b6d4,#3b82f6)",
                              color: "white",
                            }}
                          >
                            {p.specialization}
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
                            onClick={() => handleEdit(p)}
                          >
                            <PencilSquare /> Edit
                          </Button>
                          <Button
                            size="sm"
                            style={{
                              background: "rgba(239,68,68,0.15)",
                              border: "1px solid rgba(239,68,68,0.5)",
                              color: "#f87171",
                            }}
                            onClick={() => handleDelete(p.id)}
                          >
                            <Trash /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        {error && (
          <div className="text-danger mt-3 text-center fw-semibold">{error}</div>
        )}
      </div>
    </div>
  );
};

export default Providers;
