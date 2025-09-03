package com.wellness.repository;


import com.wellness.entity.WellnessService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WellnessServiceRepository extends JpaRepository<WellnessService, Long> {
}
