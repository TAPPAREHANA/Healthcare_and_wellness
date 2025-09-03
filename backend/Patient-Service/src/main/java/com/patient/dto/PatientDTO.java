package com.patient.dto;


import java.time.LocalDate;

public class PatientDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDate dob;
    private String healthRecords;
    // getters & setters
    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }
    public String getName(){ return name; }
    public void setName(String name){ this.name = name; }
    public String getEmail(){ return email; }
    public void setEmail(String email){ this.email = email; }
    public String getPhone(){ return phone; }
    public void setPhone(String phone){ this.phone = phone; }
    public String getAddress(){ return address; }
    public void setAddress(String address){ this.address = address; }
    public LocalDate getDob(){ return dob; }
    public void setDob(LocalDate dob){ this.dob = dob; }
    public String getHealthRecords(){ return healthRecords; }
    public void setHealthRecords(String healthRecords){ this.healthRecords = healthRecords; }
}
