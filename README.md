# Health Care and Wellness Service

This project is a **Capstone Project for Wipro Training**, designed to provide a seamless **Health Care and Wellness Service** platform for patients, doctors, and administrators.

## Project Overview
The system provides:
- Patient registration, authentication, and profile management
- Appointment booking and tracking
- Doctor management and availability
- Secure authentication using JWT tokens
- Full integration between Backend (Spring Boot) and Frontend (React.js)

## Technology Stack
- **Frontend:** React.js, Bootstrap, Axios, React Router (developed in VS Code)
- **Backend:** Spring Boot (Java 17, developed in Eclipse IDE), Spring Data JPA, REST APIs
- **Database:** MySQL (H2 used for testing)
- **API Testing:** Postman (for CRUD operations)
- **Security:** Spring Security with JWT Authentication
- **Build Tool:** Maven
- **Testing:** JUnit, Mockito

## How It Works
1. **User Authentication:**
   - Patients and doctors log in using their credentials.
   - A **JWT token is generated** after successful login.
   - All future API requests use this token for secure access.

2. **Data Flow & Connections:**
   - Frontend communicates with Backend using REST APIs.
   - Backend interacts with MySQL to store and retrieve data.
   - JWT token ensures only authorized users can access sensitive data.

3. **Appointment & Health Records:**
   - Patients can book appointments with available doctors.
   - Doctors can manage appointments.
   - Health records are linked to patient profiles securely.

## Steps to Run Locally

### 1. Backend (Spring Boot in Eclipse)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
- Runs on: `http://localhost:8080`

### 2. Frontend (React.js in VS Code)
```bash
cd frontend
npm install
npm start
```
- Runs on: `http://localhost:3000`

### 3. API Testing with Postman
- Import Postman collection (if provided).
- For secured endpoints, set header:
```
Authorization: Bearer <your_jwt_token>
```

## API Authentication (JWT)
- Login API generates a JWT token after successful login.
- Token must be sent in the `Authorization` header for every secure API call.

## Database Setup (MySQL)
- Create a database:
```sql
CREATE DATABASE healthcare_wellness;
```
- Update `application.properties` or `application.yml` in the backend project:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/healthcare_wellness
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```
- Run the Spring Boot backend — tables will be created automatically via JPA.

## Future Enhancements
- Integration with external health APIs
- Doctor dashboard with analytics
- Notifications for appointment reminders
- Enhanced user roles (admin panel)

## Author
- **TAPPA REHANA**  
Capstone Project for Wipro Training 2025
