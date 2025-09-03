package com.payment.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.payment.entity.Payment.PaymentStatus;

import jakarta.persistence.Column;
import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDTO {
    private Long id;
    private PaymentStatus paymentStatus;
    private LocalDateTime paymentDate;
    private String transactionId;
    private Double amount;

    private PatientDTO patient;
    private AppointmentDTO appointment;
    private WellnessServiceDTO service;

    // Nested DTOs (only minimal fields we want)
    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class PatientDTO {
        private Long id;
        private String name;
        private String email;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class AppointmentDTO {
        private Long id;
        private String appointmentDate;
        private String status;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class WellnessServiceDTO {
        private Long id;
        private String name;
    }
}
