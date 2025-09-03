package com.patient.service;

import com.patient.dto.PatientDTO;
import com.patient.entity.Patient;
import com.patient.repository.PatientRepository;
import com.patient.service.PatientService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository repository;
    private final PasswordEncoder passwordEncoder;

    public PatientServiceImpl(PatientRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Patient register(Patient patient) {
        // encode password before saving
        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        return repository.save(patient);
    }

    @Override
    public Optional<Patient> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Patient> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public List<Patient> findAll() {
        return repository.findAll();
    }

    @Override
    public Patient updateProfile(Long id, PatientDTO dto) {
        Patient patient = repository.findById(id).orElseThrow(() -> new RuntimeException("Patient not found"));
        if (dto.getName() != null) patient.setName(dto.getName());
        if (dto.getPhone() != null) patient.setPhone(dto.getPhone());
        if (dto.getAddress() != null) patient.setAddress(dto.getAddress());
        if (dto.getDob() != null) patient.setDob(dto.getDob());
        return repository.save(patient);
    }

    @Override
    public String getHealthRecords(Long id) {
        return repository.findById(id).map(Patient::getHealthRecords).orElse(null);
    }

    @Override
    public Patient updateHealthRecords(Long id, String records) {
        Patient patient = repository.findById(id).orElseThrow(() -> new RuntimeException("Patient not found"));
        patient.setHealthRecords(records);
        return repository.save(patient);
    }
}
