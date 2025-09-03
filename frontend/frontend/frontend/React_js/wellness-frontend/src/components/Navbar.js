import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const getNavLinkClass = ({ isActive }) =>
  isActive
    ? "fw-semibold text-primary bg-light rounded px-3 py-2 d-flex align-items-center"
    : "text-primary px-3 py-2 d-flex align-items-center";

const NavigationBar = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          end
          className="me-5 fw-bold fs-4 text-primary text-decoration-none d-flex align-items-center"
        >
          🏥GM Hospital
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav>
            <Nav.Link as={NavLink} to="/patients" end className={getNavLinkClass}>
              🚹 Patients
            </Nav.Link>
            <Nav.Link as={NavLink} to="/providers" end className={getNavLinkClass}>
              👩‍⚕Providers
            </Nav.Link>
            <Nav.Link as={NavLink} to="/appointments" className={getNavLinkClass}>
              📝 Appointments
            </Nav.Link>
            <NavDropdown
              title={
                <div className="d-flex align-items-center" style={{ gap: "6px" }}>
                  <span>💁 Services & Enrollments</span>
                </div>
              }
              id="services-enrollments-dropdown"
              className="mx-2"
            >
              <NavDropdown.Item as={NavLink} to="/wellness" className="d-flex align-items-center" style={{ gap: "4px" }}>
                Wellness Services
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/enrollments" className="d-flex align-items-center" style={{ gap: "4px" }}>
                Enrollments
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/payments" className={getNavLinkClass}>
             💲Payments
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/login" className={getNavLinkClass}>
            ⚕Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register" className={getNavLinkClass}>
              ®Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
