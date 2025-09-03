import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Container, Row, Col, Card, Button } from "react-bootstrap";

// Hero Data
const heroData = [
  {
    title: "Book Your Appointments Online",
    description: "Schedule visits with doctors anytime, anywhere.",
  },
  {
    title: "Manage Patient Records",
    description: "Easily track patient history, prescriptions, and treatments.",
  },
  {
    title: "Explore Wellness Programs",
    description: "Access wellness services for holistic health care.",
  },
];

// Feature cards
const featureData = [
  {
    key: "appointment",
    title: "Book Appointment",
    text: "Schedule visits with doctors quickly and securely.",
    link: "/appointments",
    buttonText: "Get Started",
  },
  {
    key: "patients",
    title: "Patients",
    text: "Manage patient records, prescriptions, and history.",
    link: "/patients",
    buttonText: "Manage",
  },
  {
    key: "providers",
    title: "Providers",
    text: "Doctors and wellness providers at your fingertips.",
    link: "/providers",
    buttonText: "View",
  },
  {
    key: "wellness",
    title: "Wellness Services",
    text: "Explore yoga, meditation, and health programs.",
    link: "/wellness",
    buttonText: "Explore",
  },
  {
    key: "enrollments",
    title: "Enrollments",
    text: "Join wellness and healthcare programs easily.",
    link: "/enrollments",
    buttonText: "Enroll",
  },
  {
    key: "payments",
    title: "Payments",
    text: "Securely manage transactions for services and bookings.",
    link: "/payments",
    buttonText: "Pay Now",
  },
];

const Welcome = () => {
  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #0f172a, #1e3a8a, #0ea5e9)",
        minHeight: "100vh",
        color: "#e2e8f0",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          color: "#38bdf8",
          padding: "18px 25px",
          textAlign: "center",
          fontSize: "1.6rem",
          fontWeight: "700",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          letterSpacing: "1px",
        }}
      >
        GM Hospital
      </header>

      {/* Hero Carousel */}
      <Carousel fade className="mb-5">
        {heroData.map((slide, index) => (
          <Carousel.Item key={index} interval={6000}>
            <div
              className="d-flex flex-column align-items-center justify-content-center text-center px-3"
              style={{
                height: "60vh",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                borderRadius: "16px",
                color: "#f1f5f9",
              }}
            >
              <h2 className="fw-bold" style={{ color: "#38bdf8" }}>
                {slide.title}
              </h2>
              <p className="lead">{slide.description}</p>
              <Button
                as={Link}
                to="/appointments"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                  border: "none",
                  padding: "10px 22px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Get Started
              </Button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Feature Section */}
      <Container className="pb-5">
        <h2
          className="text-center mb-5 fw-bold"
          style={{ color: "#38bdf8", letterSpacing: "0.5px" }}
        >
          Our Features
        </h2>
        <Row className="g-4">
          {featureData.slice(0, 3).map(({ title, text, link, buttonText }) => (
            <Col md={4} key={title}>
              <Card
                className="h-100 text-center shadow-lg border-0 hover-card p-3"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(14px)",
                  borderRadius: "16px",
                  color: "#e2e8f0",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: "#38bdf8" }}>
                    {title}
                  </Card.Title>
                  <Card.Text>{text}</Card.Text>
                  <Button
                    as={Link}
                    to={link}
                    style={{
                      background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                      border: "none",
                      padding: "8px 20px",
                      borderRadius: "10px",
                      fontWeight: "600",
                    }}
                  >
                    {buttonText}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="g-4 mt-4">
          {featureData.slice(3).map(({ title, text, link, buttonText }) => (
            <Col md={4} key={title}>
              <Card
                className="h-100 text-center shadow-lg border-0 hover-card p-3"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(14px)",
                  borderRadius: "16px",
                  color: "#e2e8f0",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: "#38bdf8" }}>
                    {title}
                  </Card.Title>
                  <Card.Text>{text}</Card.Text>
                  <Button
                    as={Link}
                    to={link}
                    style={{
                      background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                      border: "none",
                      padding: "8px 20px",
                      borderRadius: "10px",
                      fontWeight: "600",
                    }}
                  >
                    {buttonText}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          color: "#e2e8f0",
          padding: "25px",
          marginTop: "50px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <h5 style={{ color: "#38bdf8" }}>GM Hospital</h5>
        <p>
          123 Wellness Street, Green City, India <br />
          📞 +91 98765 43210 | ✉️ info@gmhospital.com
        </p>
        <p className="mb-0" style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
          © 2025 GM Hospital. All rights reserved.
        </p>
      </footer>

      {/* Hover effect */}
      <style>{`
        .hover-card {
          transition: all 0.3s ease-in-out;
        }
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 25px rgba(14,165,233,0.4);
        }
      `}</style>
    </div>
  );
};

export default Welcome;
