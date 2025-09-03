package com.payment.controller;


import com.payment.dto.PaymentDTO;
import com.payment.entity.Payment;
import com.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService service;

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> getPayment(@PathVariable Long id) {
        return ResponseEntity.ok(service.getPayment(id));
    }

    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        return ResponseEntity.ok(service.getAllPayments());
    }

    @PostMapping
    public ResponseEntity<PaymentDTO> createPayment(@RequestBody Payment payment) {
        return new ResponseEntity<>(service.createPayment(payment), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentDTO> updatePayment(@PathVariable Long id, @RequestBody Payment payment) {
        return ResponseEntity.ok(service.updatePayment(id, payment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        service.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}

