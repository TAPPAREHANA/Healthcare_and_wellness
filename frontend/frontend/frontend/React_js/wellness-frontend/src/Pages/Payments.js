import React, { useEffect, useState } from "react";
import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getAllPatients,
  getAppointments,
  getWellnessServices,
} from "../services/Api";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { Dropdown, ButtonGroup } from "react-bootstrap";

const PaymentsCRUD = () => {
  const [payments, setPayments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    id: null,
    patientId: "",
    appointmentId: "",
    serviceId: "",
    paymentStatus: "PENDING",
    paymentDate: "",
    transactionId: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetchDropdownData();
    fetchPayments();
  }, []);

  async function fetchDropdownData() {
    try {
      const [patientsData, appointmentsData, servicesData] = await Promise.all([
        getAllPatients(),
        getAppointments(),
        getWellnessServices(),
      ]);
      setPatients(patientsData.data);
      setAppointments(appointmentsData.data);
      setServices(servicesData.data);
    } catch {
      setError("Failed to fetch dropdown data");
    }
  }

  async function fetchPayments() {
    setLoadingPayments(true);
    try {
      const res = await getPayments();
      setPayments(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Failed to fetch payments");
    } finally {
      setLoadingPayments(false);
    }
  }

  function clearForm() {
    setForm({
      id: null,
      patientId: "",
      appointmentId: "",
      serviceId: "",
      paymentStatus: "PENDING",
      paymentDate: "",
      transactionId: "",
      amount: "",
    });
    setError("");
    setSuccess("");
  }

  function generateTransactionId() {
    return `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? (value === "" ? "" : parseFloat(value)) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.patientId || !form.appointmentId || !form.serviceId || !form.amount) {
      setError("Please fill all required fields");
      return;
    }
    if (form.amount <= 0) {
      setError("Amount must be positive");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      patientId: Number(form.patientId),
      appointmentId: Number(form.appointmentId),
      serviceId: Number(form.serviceId),
      paymentStatus: form.paymentStatus,
      paymentDate: form.paymentDate ? new Date(form.paymentDate) : new Date(),
      transactionId: form.id ? form.transactionId : generateTransactionId(),
      amount: Number(form.amount),
    };

    try {
      if (form.id) {
        await updatePayment(form.id, payload);
        setSuccess("Payment updated successfully!");
      } else {
        await createPayment(payload);
        setSuccess("Payment added successfully!");
      }
      clearForm();
      fetchPayments();
    } catch {
      setError("Failed to save payment");
    }
    setLoading(false);
  }

  function handleEdit(payment) {
    setForm({
      id: payment.id,
      patientId: payment.patient?.id || payment.patientId || "",
      appointmentId: payment.appointment?.id || payment.appointmentId || "",
      serviceId: payment.service?.id || payment.serviceId || "",
      paymentStatus: payment.paymentStatus || "PENDING",
      paymentDate: payment.paymentDate ? payment.paymentDate.substring(0, 16) : "",
      transactionId: payment.transactionId,
      amount: payment.amount,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
    setLoading(true);
    try {
      await deletePayment(id);
      if (form.id === id) clearForm();
      setSuccess("Payment deleted");
      fetchPayments();
    } catch {
      setError("Failed to delete payment");
    }
    setLoading(false);
  }

  function handleView(payment) {
    setSelectedPayment(payment);
    setShowModal(true);
  }

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e3a8a, #0ea5e9)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="container">
        {/* Add / Edit Form */}
        <Card
          className="mb-4 border-0 shadow-lg"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
          }}
        >
          <Card.Header
            className="fw-bold text-white"
            style={{
              background: "linear-gradient(90deg, #0ea5e9, #14b8a6)",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            {form.id ? "Edit Payment" : "Add Payment"}
          </Card.Header>
          <Card.Body className="text-white">
            {error && (
              <div
                className="p-2 mb-3 rounded"
                style={{ background: "rgba(220,38,38,0.3)", color: "#fecaca" }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className="p-2 mb-3 rounded"
                style={{ background: "rgba(22,163,74,0.3)", color: "#bbf7d0" }}
              >
                {success}
              </div>
            )}
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Patient</Form.Label>
                    <Form.Select
                      name="patientId"
                      value={form.patientId}
                      onChange={handleChange}
                      required
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                      }}
                    >
                      <option value="">Select Patient</option>
                      {patients.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Appointment</Form.Label>
                    <Form.Select
                      name="appointmentId"
                      value={form.appointmentId}
                      onChange={handleChange}
                      required
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                      }}
                    >
                      <option value="">Select Appointment</option>
                      {appointments.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.appointmentDate}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Service</Form.Label>
                    <Form.Select
                      name="serviceId"
                      value={form.serviceId}
                      onChange={handleChange}
                      required
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                      }}
                    >
                      <option value="">Select Service</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      required
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      name="paymentStatus"
                      value={form.paymentStatus}
                      onChange={handleChange}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                      }}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="SUCCESS">SUCCESS</option>
                      <option value="FAILED">FAILED</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Payment Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="paymentDate"
                      value={form.paymentDate}
                      onChange={handleChange}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex gap-2">
                <Button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: "linear-gradient(90deg, #0ea5e9, #14b8a6)",
                    border: "none",
                    borderRadius: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {form.id ? "Update Payment" : "Add Payment"}
                </Button>
                <Button
                  variant="light"
                  onClick={clearForm}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    borderRadius: "12px",
                    color: "white",
                  }}
                >
                  Clear
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Payments Table */}
        <Card
          className="shadow-lg border-0"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
          }}
        >
          <Card.Header
            className="fw-bold text-white"
            style={{
              background: "linear-gradient(90deg, #0ea5e9, #14b8a6)",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            Payment Records
          </Card.Header>
          <Card.Body className="text-white">
            {loadingPayments ? (
              <p>Loading payments...</p>
            ) : payments.length === 0 ? (
              <p>No payment records found.</p>
            ) : (
              <div className="table-responsive">
                <table
                  className="table align-middle text-white"
                  style={{ background: "transparent" }}
                >
                  <thead>
                    <tr style={{ color: "#38bdf8" }}>
                      <th>ID</th>
                      <th>Patient</th>
                      <th>Appointment</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Transaction ID</th>
                      <th>Amount</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>{payment.patient?.name || payment.patientId}</td>
                        <td>
                          {payment.appointment?.appointmentDate ||
                            payment.appointmentId}
                        </td>
                        <td>{payment.service?.name || payment.serviceId}</td>
                        <td>
                          <span
                            className={`badge ${
                              payment.paymentStatus === "SUCCESS"
                                ? "bg-success"
                                : payment.paymentStatus === "FAILED"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {payment.paymentStatus}
                          </span>
                        </td>
                        <td>
                          {payment.paymentDate
                            ? new Date(payment.paymentDate).toLocaleString()
                            : "-"}
                        </td>
                        <td>{payment.transactionId}</td>
                        <td>{payment.amount?.toFixed(2)}</td>
                        <td className="text-center">
                          <Dropdown as={ButtonGroup}>
                            <Button
                              size="sm"
                              style={{
                                background:
                                  "linear-gradient(90deg, #0ea5e9, #14b8a6)",
                                border: "none",
                              }}
                            >
                              Actions
                            </Button>
                            <Dropdown.Toggle
                              split
                              variant="secondary"
                              id={`dropdown-${payment.id}`}
                              style={{
                                background:
                                  "linear-gradient(90deg, #0ea5e9, #14b8a6)",
                                border: "none",
                              }}
                            />
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleView(payment)}>
                                👁️ View
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => handleEdit(payment)}>
                                ✏️ Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleDelete(payment.id)}
                                className="text-danger"
                              >
                                🗑️ Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* View Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        contentClassName="text-white"
        style={{ backdropFilter: "blur(6px)" }}
      >
        <Modal.Header
          closeButton
          style={{
            background: "linear-gradient(90deg, #0ea5e9, #14b8a6)",
            color: "white",
          }}
        >
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: "rgba(255,255,255,0.1)",
          }}
        >
          {selectedPayment ? (
            <>
              <p>
                <strong>ID:</strong> {selectedPayment.id}
              </p>
              <p>
                <strong>Patient:</strong> {selectedPayment.patient?.name}
              </p>
              <p>
                <strong>Appointment:</strong>{" "}
                {selectedPayment.appointment?.appointmentDate}
              </p>
              <p>
                <strong>Service:</strong> {selectedPayment.service?.name}
              </p>
              <p>
                <strong>Status:</strong> {selectedPayment.paymentStatus}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedPayment.paymentDate).toLocaleString()}
              </p>
              <p>
                <strong>Transaction ID:</strong>{" "}
                {selectedPayment.transactionId}
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                {selectedPayment.amount?.toFixed(2)}
              </p>
            </>
          ) : (
            <p>No data</p>
          )}
        </Modal.Body>
        <Modal.Footer
          style={{
            background: "rgba(255,255,255,0.1)",
          }}
        >
          <Button
            onClick={() => setShowModal(false)}
            style={{
              background: "linear-gradient(90deg, #0ea5e9, #14b8a6)",
              border: "none",
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentsCRUD;
