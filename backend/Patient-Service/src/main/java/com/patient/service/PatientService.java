package com.patient.service;

import com.patient.dto.PatientDTO;
import com.patient.entity.Patient;
import java.util.List;
import java.util.Optional;

public interface PatientService {
    Patient register(Patient patient);
    Optional<Patient> findById(Long id);
    Optional<Patient> findByEmail(String email);
    List<Patient> findAll();
    Patient updateProfile(Long id, PatientDTO dto);
    String getHealthRecords(Long id);
    Patient updateHealthRecords(Long id, String records);

}
