package com.provider.service;

import com.provider.dto.ProviderDto;
import com.provider.entity.Provider;
import com.provider.repository.ProviderRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProviderService {

    private final ProviderRepository repository;
    private final PasswordEncoder passwordEncoder;

    public ProviderService(ProviderRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public ProviderDto create(ProviderDto dto) {
        // in production: check if email exists and return appropriate error
        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Provider with that email already exists");
        }
        Provider p = Provider.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .specialization(dto.getSpecialization())
                .phone(dto.getPhone())
                .role(parseRole(dto.getRole()))
                .build();
        Provider saved = repository.save(p);
        return toDto(saved, false);
    }

    public List<ProviderDto> findAll() {
        return repository.findAll().stream().map(p -> toDto(p, false)).collect(Collectors.toList());
    }

    public Optional<ProviderDto> findById(Long id) {
        return repository.findById(id).map(p -> toDto(p, false));
    }

    public ProviderDto update(Long id, ProviderDto dto) {
        Provider updated = repository.findById(id).map(existing -> {
            existing.setName(dto.getName() != null ? dto.getName() : existing.getName());
            existing.setEmail(dto.getEmail() != null ? dto.getEmail() : existing.getEmail());
            if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
                existing.setPassword(passwordEncoder.encode(dto.getPassword()));
            }
            existing.setSpecialization(dto.getSpecialization() != null ? dto.getSpecialization() : existing.getSpecialization());
            existing.setPhone(dto.getPhone() != null ? dto.getPhone() : existing.getPhone());
            existing.setRole(parseRole(dto.getRole() != null ? dto.getRole() : existing.getRole().name()));
            return repository.save(existing);
        }).orElseThrow(() -> new IllegalArgumentException("Provider not found"));
        return toDto(updated, false);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private Provider.Role parseRole(String roleStr) {
        if (roleStr == null) return Provider.Role.DOCTOR;
        try {
            return Provider.Role.valueOf(roleStr.toUpperCase());
        } catch (Exception ex) {
            return Provider.Role.DOCTOR;
        }
    }

    private ProviderDto toDto(Provider p, boolean includePassword) {
        ProviderDto dto = ProviderDto.builder()
                .id(p.getId())
                .name(p.getName())
                .email(p.getEmail())
                .specialization(p.getSpecialization())
                .phone(p.getPhone())
                .role(p.getRole() != null ? p.getRole().name() : null)
                .build();
        if (includePassword) dto.setPassword(p.getPassword());
        return dto;
    }
}
