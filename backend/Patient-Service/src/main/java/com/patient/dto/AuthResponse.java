package com.patient.dto;

public class AuthResponse {
    private String token;

    // Default constructor
    public AuthResponse() {}

    // Parameterized constructor
    public AuthResponse(String token) {
        this.token = token;
    }

    // Getter & Setter
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
