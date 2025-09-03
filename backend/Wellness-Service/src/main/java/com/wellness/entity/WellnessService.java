package com.wellness.entity;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "wellness_services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WellnessService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer duration; // in days or weeks

    @Column(nullable = false)
    private Double fee;
}
