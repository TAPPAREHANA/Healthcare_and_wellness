package com.patient.controller;

import com.patient.dto.AuthRequest;
import com.patient.dto.AuthResponse;
import com.patient.dto.PatientDTO;
import com.patient.entity.Patient;
import com.patient.security.JwtUtil;
import com.patient.service.PatientService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    private final PatientService patientService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public PatientController(PatientService patientService,
                             AuthenticationManager authenticationManager,
                             JwtUtil jwtUtil) {
        this.patientService = patientService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<PatientDTO> register(@RequestBody Patient patient) {
        Patient saved = patientService.register(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(saved));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            String token = jwtUtil.generateToken(auth.getName());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    // ======================
    // Patient info by ID
    // ======================

    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable Long id) {
        Patient patient = patientService.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        return ResponseEntity.ok(toDTO(patient));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientDTO> updatePatientProfile(
            @PathVariable Long id,
            @RequestBody PatientDTO dto) {

        Patient updated = patientService.updateProfile(id, dto);
        return ResponseEntity.ok(toDTO(updated));
    }

    // ======================
    // Health Records by ID
    // ======================

    public static class HealthRecordDTO {
        private String records;
        public String getRecords() { return records; }
        public void setRecords(String records) { this.records = records; }
    }

    @GetMapping("/{id}/records")
    public ResponseEntity<HealthRecordDTO> getRecordsById(@PathVariable Long id) {
        Patient patient = patientService.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        HealthRecordDTO dto = new HealthRecordDTO();
        dto.setRecords(patient.getHealthRecords() == null ? "" : patient.getHealthRecords());
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}/records")
    public ResponseEntity<PatientDTO> updateRecordsById(
            @PathVariable Long id,
            @RequestBody HealthRecordDTO dto) {

        Patient updated = patientService.updateHealthRecords(id, dto.getRecords());
        return ResponseEntity.ok(toDTO(updated));
    }

    // ======================
    // Helper method
    // ======================
    private PatientDTO toDTO(Patient p) {
        PatientDTO dto = new PatientDTO();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setEmail(p.getEmail());
        dto.setPhone(p.getPhone());
        dto.setAddress(p.getAddress());
        dto.setDob(p.getDob());
        dto.setHealthRecords(p.getHealthRecords());
        return dto;
    }
    @GetMapping
    public ResponseEntity<List<PatientDTO>> getAllPatients() {
        List<Patient> patients = patientService.findAll();
        List<PatientDTO> patientDTOs = patients.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(patientDTOs);
    }

}
