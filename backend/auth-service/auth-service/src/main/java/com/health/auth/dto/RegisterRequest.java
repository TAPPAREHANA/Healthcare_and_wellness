package com.health.auth.dto;

import com.health.auth.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String Name;
    private String email;
    private String password;
    private Role role;
}
