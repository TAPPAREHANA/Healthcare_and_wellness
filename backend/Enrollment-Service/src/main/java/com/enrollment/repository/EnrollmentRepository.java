package com.enrollment.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.enrollment.entity.Enrollment;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByPatientId(Long patientId);
    List<Enrollment> findByServiceId(Long serviceId);
}
