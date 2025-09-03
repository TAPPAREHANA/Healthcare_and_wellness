package com.enrollment.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.enrollment.dto.EnrollmentDTO;
import com.enrollment.entity.Enrollment;
import com.enrollment.repository.EnrollmentRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {

    private final EnrollmentRepository repository;
    private final RestTemplate restTemplate;

    public EnrollmentService(EnrollmentRepository repository, RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }

    public EnrollmentDTO getEnrollmentWithDetails(Long id) {
        Enrollment enrollment = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        // Fetch patient details
        EnrollmentDTO.PatientDTO patient = restTemplate.getForObject(
                "http://localhost:9091/patients/" + enrollment.getPatientId(),
                EnrollmentDTO.PatientDTO.class
        );

        // Fetch service details
        EnrollmentDTO.WellnessServiceDTO service = restTemplate.getForObject(
                "http://localhost:9094/services/" + enrollment.getServiceId(),
                EnrollmentDTO.WellnessServiceDTO.class
        );

        return EnrollmentDTO.builder()
                .id(enrollment.getId())
                .startDate(enrollment.getStartDate())
                .endDate(enrollment.getEndDate())
                .progress(enrollment.getProgress())
                .patientId(enrollment.getPatientId())
                .serviceId(enrollment.getServiceId())
                .patient(patient)
                .service(service)
                .build();
    }

    public List<EnrollmentDTO> getAllEnrollments() {
        return repository.findAll().stream()
                .map(e -> getEnrollmentWithDetails(e.getId()))
                .collect(Collectors.toList());
    }

    public EnrollmentDTO createEnrollment(EnrollmentDTO dto) {
        // Convert DTO to Entity
        Enrollment enrollment = Enrollment.builder()
                .patientId(dto.getPatientId())
                .serviceId(dto.getServiceId())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .progress(dto.getProgress())
                .build();

        // Save in DB
        Enrollment saved = repository.save(enrollment);

        // Fetch external details
        EnrollmentDTO.PatientDTO patient = restTemplate.getForObject(
                "http://localhost:9091/patients/" + saved.getPatientId(),
                EnrollmentDTO.PatientDTO.class
        );

        EnrollmentDTO.WellnessServiceDTO service = restTemplate.getForObject(
                "http://localhost:9094/services/" + saved.getServiceId(),
                EnrollmentDTO.WellnessServiceDTO.class
        );

        // Convert back to DTO
        return EnrollmentDTO.builder()
                .id(saved.getId())
                .startDate(saved.getStartDate())
                .endDate(saved.getEndDate())
                .progress(saved.getProgress())
                .patientId(saved.getPatientId())
                .serviceId(saved.getServiceId())
                .patient(patient)
                .service(service)
                .build();
    }

    public void deleteEnrollment(Long id) {
        Enrollment enrollment = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        repository.delete(enrollment);
    }
}
