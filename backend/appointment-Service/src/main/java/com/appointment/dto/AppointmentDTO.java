package com.appointment.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDTO {

    private Long id;
    private LocalDateTime appointmentDate;
    private String status;
    private String notes;

    private PatientDTO patient;
    private ProviderDTO provider;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PatientDTO {
        private Long id;
        private String name;
        private String email;
        private String phone;
        private String address;
        private LocalDate dob;
        private String healthRecords;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ProviderDTO {
        private Long id;
        private String name;
        private String email;
        private String phone;
        private String specialization;
        private String role;
    }
}
