package com.appointment.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // IDs coming from patient-service and provider-service
    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private Long providerId;

    @Column(nullable = false)
    private LocalDateTime appointmentDate;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    @Column(columnDefinition = "TEXT")
    private String notes;

    public enum Status {
        PENDING, CONFIRMED, COMPLETED, CANCELLED
    }
}
