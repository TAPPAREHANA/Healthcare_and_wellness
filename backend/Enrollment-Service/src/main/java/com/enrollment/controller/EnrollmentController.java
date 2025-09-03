package com.enrollment.controller;


import org.springframework.web.bind.annotation.*;

import com.enrollment.dto.EnrollmentDTO;
import com.enrollment.repository.EnrollmentRepository;
import com.enrollment.service.EnrollmentService;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrollmentController {

    private final EnrollmentService service;
    private final EnrollmentRepository repository;

    public EnrollmentController(EnrollmentService service, EnrollmentRepository repository) {
        this.service = service;
        this.repository = repository;
    }

    // Create enrollment
    @PostMapping
    public EnrollmentDTO createEnrollment(@RequestBody EnrollmentDTO enrollmentDTO) {
        return service.createEnrollment(enrollmentDTO);
    }

    // Get single enrollment with details
    @GetMapping("/{id}")
    public EnrollmentDTO getEnrollment(@PathVariable Long id) {
        return service.getEnrollmentWithDetails(id);
    }

    // Get all enrollments
    @GetMapping
    public List<EnrollmentDTO> getAllEnrollments() {
        return service.getAllEnrollments();
    }

    // Update enrollment
    @PutMapping("/{id}")
    public EnrollmentDTO updateEnrollment(@PathVariable Long id, @RequestBody EnrollmentDTO dto) {
        var enrollment = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        if (dto.getPatient() != null) enrollment.setPatientId(dto.getPatient().getId());
        if (dto.getService() != null) enrollment.setServiceId(dto.getService().getId());
        if (dto.getStartDate() != null) enrollment.setStartDate(dto.getStartDate());
        if (dto.getEndDate() != null) enrollment.setEndDate(dto.getEndDate());
        if (dto.getProgress() != null) enrollment.setProgress(dto.getProgress());

        repository.save(enrollment);
        return service.getEnrollmentWithDetails(enrollment.getId());
    }

    // Delete enrollment
    @DeleteMapping("/{id}")
    public void deleteEnrollment(@PathVariable Long id) {
        var enrollment = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        repository.delete(enrollment);
    }

    // Get enrollments by patientId
    @GetMapping("/patient/{patientId}")
    public List<EnrollmentDTO> getByPatient(@PathVariable Long patientId) {
        return repository.findByPatientId(patientId).stream()
                .map(e -> service.getEnrollmentWithDetails(e.getId()))
                .toList();
    }

    // Get enrollments by serviceId
    @GetMapping("/service/{serviceId}")
    public List<EnrollmentDTO> getByService(@PathVariable Long serviceId) {
        return repository.findByServiceId(serviceId).stream()
                .map(e -> service.getEnrollmentWithDetails(e.getId()))
                .toList();
    }
    
}
