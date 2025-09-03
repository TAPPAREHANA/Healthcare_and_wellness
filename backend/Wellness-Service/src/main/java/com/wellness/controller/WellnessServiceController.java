package com.wellness.controller;


import com.wellness.dto.WellnessServiceDTO;
import com.wellness.service.WellnessServiceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = "http://localhost:3000")
public class WellnessServiceController {

    private final WellnessServiceService service;

    public WellnessServiceController(WellnessServiceService service) {
        this.service = service;
    }

    @PostMapping
    public WellnessServiceDTO createService(@RequestBody WellnessServiceDTO dto) {
        return service.createService(dto);
    }

    @GetMapping("/{id}")
    public WellnessServiceDTO getService(@PathVariable Long id) {
        return service.getService(id);
    }

    @GetMapping
    public List<WellnessServiceDTO> getAllServices() {
        return service.getAllServices();
    }

    @PutMapping("/{id}")
    public WellnessServiceDTO updateService(@PathVariable Long id, @RequestBody WellnessServiceDTO dto) {
        return service.updateService(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteService(@PathVariable Long id) {
        service.deleteService(id);
        return "Service deleted successfully with id: " + id;
    }
}
