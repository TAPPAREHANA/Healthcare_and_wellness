package com.provider.controller;

import com.provider.dto.ProviderDto;
import com.provider.service.ProviderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "http://localhost:3000")
public class ProviderController {

    private final ProviderService service;

    public ProviderController(ProviderService service) {
        this.service = service;
    }

    // Create provider
    @PostMapping
    public ResponseEntity<ProviderDto> create(@Valid @RequestBody ProviderDto dto) {
        ProviderDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/api/providers/" + created.getId())).body(created);
    }

    // List providers
    @GetMapping
    public ResponseEntity<List<ProviderDto>> list() {
        return ResponseEntity.ok(service.findAll());
    }

    // Get by id
    @GetMapping("/{id}")
    public ResponseEntity<ProviderDto> get(@PathVariable Long id) {
        return service.findById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<ProviderDto> update(@PathVariable Long id, @Valid @RequestBody ProviderDto dto) {
        try {
            ProviderDto updated = service.update(id, dto);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
