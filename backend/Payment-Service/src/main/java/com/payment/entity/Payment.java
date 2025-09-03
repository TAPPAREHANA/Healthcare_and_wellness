package com.payment.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private Long appointmentId;

    @Column(nullable = false)
    private Long serviceId;
    @Column(nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)   // Saves as 'PENDING', 'SUCCESS', 'FAILED'
    @Column(nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(nullable = false, updatable = false)
    private LocalDateTime paymentDate = LocalDateTime.now();

    @Column(nullable = false, unique = true)
    private String transactionId;
    
    

    
    public enum PaymentStatus {
        PENDING,
        SUCCESS,
        FAILED
    }
}
