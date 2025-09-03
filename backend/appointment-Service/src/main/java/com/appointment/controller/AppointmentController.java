package com.appointment.controller;

import com.appointment.dto.AppointmentDTO;

import com.appointment.service.AppointmentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/appointments")

public class AppointmentController {

    private final AppointmentService service;
    
    @PostMapping
    public AppointmentDTO createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        return service.createAppointment(appointmentDTO);
    }

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public AppointmentDTO getAppointment(@PathVariable Long id) {
        return service.getAppointmentWithDetails(id);
    }

    @GetMapping
    public List<AppointmentDTO> getAllAppointments() {
        return service.getAllAppointments();
    }
    @PutMapping("/{id}")
    public AppointmentDTO updateAppointment(@PathVariable Long id, @RequestBody AppointmentDTO dto) {
        return service.updateAppointment(id, dto);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        service.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

}
