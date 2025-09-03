package com.provider.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProviderDto {
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;

    // For create/update requests, password is required; not returned on responses
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private String specialization;
    private String phone;
    private String role; // DOCTOR, WELLNESS_PROVIDER, ADMIN
}
