import axios from "axios";

// ====== Base URLs ======
const AUTH_API = "http://localhost:8080/api/auth";
const PATIENT_API = "http://localhost:9091/patients";
const PROVIDER_API = "http://localhost:9092/api/providers";
const WELLNESS_API = "http://localhost:9094/services";
const ENROLLMENT_API = "http://localhost:9095/enrollments";
const APPOINTMENT_API = "http://localhost:9093/appointments";
const PAYMENT_API = "http://localhost:9096/payments";

// ====== Authentication Microservice ======
export const loginUser = (data) => axios.post(`${AUTH_API}/login`, data);
export const registerUser = (data) => axios.post(`${AUTH_API}/register`, data);

// ====== Patient (with JWT) ======
export const registerPatient = (data) => axios.post(`${PATIENT_API}/register`, data);

export const loginPatient = (data) => axios.post(`${PATIENT_API}/login`, data);

export const getPatientById = (id, token) =>
  axios.get(`${PATIENT_API}/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const updatePatientProfile = (id, data, token) =>
  axios.put(`${PATIENT_API}/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const getHealthRecords = (id, token) =>
  axios.get(`${PATIENT_API}/${id}/records`, { headers: { Authorization: `Bearer ${token}` } });

export const updateHealthRecords = (id, records, token) =>
  axios.put(`${PATIENT_API}/${id}/records`, { records }, { headers: { Authorization: `Bearer ${token}` } });

export const getAllPatients = () => axios.get("http://localhost:9091/patients");
export const getProviders = () => axios.get("http://localhost:9092/api/providers");
export const getAppointments = () => axios.get("http://localhost:9093/appointments");
export const getWellnessServices = () => axios.get("http://localhost:9094/services");
export const getEnrollments = () => axios.get("http://localhost:9095/enrollments");
export const getPayments = () => axios.get("http://localhost:9096/payments");

// ====== Providers (no JWT) ======
export const createProvider = (data) => axios.post(PROVIDER_API, data);
export const updateProvider = (id, data) => axios.put(`${PROVIDER_API}/${id}`, data);
export const deleteProvider = (id) => axios.delete(`${PROVIDER_API}/${id}`);

// ====== Wellness Services (no JWT) ======
export const createWellnessService = (data) => axios.post(WELLNESS_API, data);
export const updateWellnessService = (id, data) => axios.put(`${WELLNESS_API}/${id}`, data);
export const deleteWellnessService = (id) => axios.delete(`${WELLNESS_API}/${id}`);

// ====== Enrollments (no JWT) ======
export const createEnrollment = (data) => axios.post(ENROLLMENT_API, data);
export const updateEnrollment = (id, data) => axios.put(`${ENROLLMENT_API}/${id}`, data);
export const deleteEnrollment = (id) => axios.delete(`${ENROLLMENT_API}/${id}`);


// ====== Appointments (no JWT) ======

export const getAppointmentById = (id) =>
  axios.get(`${APPOINTMENT_API}/${id}`);

export const createAppointment = (data) => axios.post(APPOINTMENT_API, data);

export const updateAppointment = (id, data) => axios.put(`${APPOINTMENT_API}/${id}`, data);

export const deleteAppointment = (id) => axios.delete(`${APPOINTMENT_API}/${id}`);
// ====== Payments (no JWT) ======

export const createPayment = (data) => axios.post(PAYMENT_API, data);
export const updatePayment = (id, data) => axios.put(`${PAYMENT_API}/${id}`, data);
export const deletePayment = (id) => axios.delete(`${PAYMENT_API}/${id}`);
