package com.provider.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "providers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Provider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    // store only hashed password
    @Column(nullable = false)
    private String password;

    private String specialization;

    private String phone;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        DOCTOR, WELLNESS_PROVIDER, ADMIN
    }
}
