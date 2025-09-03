package com.patient.security;


import com.patient.entity.Patient;
import com.patient.repository.PatientRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final PatientRepository repository;

    public CustomUserDetailsService(PatientRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Patient p = repository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Patient not found: " + email));
        return new CustomUserDetails(p);
    }
}
