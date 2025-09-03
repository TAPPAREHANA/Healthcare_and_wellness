package com.appointment.service;

import com.appointment.dto.AppointmentDTO;
import com.appointment.entity.Appointment;
import com.appointment.repository.AppointmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    private final AppointmentRepository repository;
    private final RestTemplate restTemplate;

    public AppointmentService(AppointmentRepository repository, RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }

    public AppointmentDTO getAppointmentWithDetails(Long id) {
        Appointment appointment = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        // Fetch patient
        AppointmentDTO.PatientDTO patient = restTemplate.getForObject(
                "http://localhost:9091/patients/" + appointment.getPatientId(),
                AppointmentDTO.PatientDTO.class
        );

        // Fetch provider
        AppointmentDTO.ProviderDTO provider = restTemplate.getForObject(
                "http://localhost:9092/api/providers/" + appointment.getProviderId(),
                AppointmentDTO.ProviderDTO.class
        );

        return AppointmentDTO.builder()
                .id(appointment.getId())
                .appointmentDate(appointment.getAppointmentDate())
                .status(appointment.getStatus().name())
                .notes(appointment.getNotes())
                .patient(patient)
                .provider(provider)
                .build();
    }

    public List<AppointmentDTO> getAllAppointments() {
        return repository.findAll().stream()
                .map(a -> getAppointmentWithDetails(a.getId()))
                .collect(Collectors.toList());
    }
    public AppointmentDTO createAppointment(AppointmentDTO dto) {
        // Convert DTO to Entity
        Appointment appointment = Appointment.builder()
                .appointmentDate(dto.getAppointmentDate())
                .notes(dto.getNotes())
                .status(Appointment.Status.valueOf(dto.getStatus()))
                .patientId(dto.getPatient().getId())
                .providerId(dto.getProvider().getId())
                .build();

        // Save in DB
        Appointment saved = repository.save(appointment);

        // Optionally, fetch patient and provider details again
        AppointmentDTO.PatientDTO patient = restTemplate.getForObject(
                "http://localhost:9091/patients/" + saved.getPatientId(),
                AppointmentDTO.PatientDTO.class
        );

        AppointmentDTO.ProviderDTO provider = restTemplate.getForObject(
                "http://localhost:9092/api/providers/" + saved.getProviderId(),
                AppointmentDTO.ProviderDTO.class
        );

        // Convert back to DTO
        return AppointmentDTO.builder()
                .id(saved.getId())
                .appointmentDate(saved.getAppointmentDate())
                .status(saved.getStatus().name())
                .notes(saved.getNotes())
                .patient(patient)
                .provider(provider)
                .build();
    }
    public AppointmentDTO updateAppointment(Long id, AppointmentDTO dto) {
        // Fetch existing appointment
        Appointment appointment = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        // Update fields
        if (dto.getAppointmentDate() != null) {
            appointment.setAppointmentDate(dto.getAppointmentDate());
        }
        if (dto.getNotes() != null) {
            appointment.setNotes(dto.getNotes());
        }
        if (dto.getStatus() != null) {
            appointment.setStatus(Appointment.Status.valueOf(dto.getStatus()));
        }
        if (dto.getPatient() != null && dto.getPatient().getId() != null) {
            appointment.setPatientId(dto.getPatient().getId());
        }
        if (dto.getProvider() != null && dto.getProvider().getId() != null) {
            appointment.setProviderId(dto.getProvider().getId());
        }

        // Save updated appointment
        Appointment updated = repository.save(appointment);

        // Fetch patient and provider details again
        AppointmentDTO.PatientDTO patient = restTemplate.getForObject(
                "http://localhost:9091/patients/" + updated.getPatientId(),
                AppointmentDTO.PatientDTO.class
        );

        AppointmentDTO.ProviderDTO provider = restTemplate.getForObject(
                "http://localhost:9092/api/providers/" + updated.getProviderId(),
                AppointmentDTO.ProviderDTO.class
        );

        // Return updated DTO
        return AppointmentDTO.builder()
                .id(updated.getId())
                .appointmentDate(updated.getAppointmentDate())
                .status(updated.getStatus().name())
                .notes(updated.getNotes())
                .patient(patient)
                .provider(provider)
                .build();
    }
 // DELETE
    public void deleteAppointment(Long id) {
        Appointment appointment = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        repository.delete(appointment);
    }


}
