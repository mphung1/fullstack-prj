package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class DemoPatientDto {
    private Long patientId;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Gender is mandatory")
    private String gender;

    @NotBlank(message = "Age is mandatory")
    private int age;

    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Phone number is mandatory")
    private String phoneNumber;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
