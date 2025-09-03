package com.enrollment.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollmentDTO {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer progress;

    private Long patientId;
    private Long serviceId;

    private PatientDTO patient;   // fetched from patient-service
    private WellnessServiceDTO service; // fetched from wellness-service

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PatientDTO {
        private Long id;
        private String name;
        private String email;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class WellnessServiceDTO {
        private Long id;
        private String name;
        private String description;
    }
}
