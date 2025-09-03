package com.payment.service;

import com.payment.dto.PaymentDTO;
import com.payment.entity.Payment;
import com.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository repository;
    private final RestTemplate restTemplate;

    // 🔹 Convert Entity → DTO
    private PaymentDTO mapToDTO(Payment payment) {
        PaymentDTO.PatientDTO patient = restTemplate.getForObject(
                "http://localhost:9091/patients/" + payment.getPatientId(),
                PaymentDTO.PatientDTO.class
        );
        PaymentDTO.AppointmentDTO appointment = restTemplate.getForObject(
                "http://localhost:9093/appointments/" + payment.getAppointmentId(),
                PaymentDTO.AppointmentDTO.class
        );
        PaymentDTO.WellnessServiceDTO service = restTemplate.getForObject(
                "http://localhost:9094/services/" + payment.getServiceId(),
                PaymentDTO.WellnessServiceDTO.class
        );
        return PaymentDTO.builder()
                .id(payment.getId())
                .paymentStatus(payment.getPaymentStatus())
                .paymentDate(payment.getPaymentDate())
                .transactionId(payment.getTransactionId())
                .amount(payment.getAmount())  
                .patient(patient)
                .appointment(appointment)
                .service(service)
                .build();
    }

    public PaymentDTO getPayment(Long id) {
        Payment payment = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return mapToDTO(payment);
    }

    public List<PaymentDTO> getAllPayments() {
        return repository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public PaymentDTO createPayment(Payment payment) {
        Payment saved = repository.save(payment);
        return mapToDTO(saved);
    }

    public PaymentDTO updatePayment(Long id, Payment paymentDetails) {
        Payment payment = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setPatientId(paymentDetails.getPatientId());
        payment.setAppointmentId(paymentDetails.getAppointmentId());
        payment.setServiceId(paymentDetails.getServiceId());
        payment.setPaymentStatus(paymentDetails.getPaymentStatus());
        payment.setPaymentDate(paymentDetails.getPaymentDate());
        payment.setTransactionId(paymentDetails.getTransactionId());
        payment.setAmount(paymentDetails.getAmount());
        Payment updated = repository.save(payment);
        return mapToDTO(updated);
    }

    public void deletePayment(Long id) {
        Payment payment = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        repository.delete(payment);
    }
}
