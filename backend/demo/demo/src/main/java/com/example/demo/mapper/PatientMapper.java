package com.example.demo.mapper;

import com.example.demo.dto.PatientDto;
import com.example.demo.model.Patient;

import java.util.List;

public class PatientMapper {
    public static PatientDto toDto(Patient patient) {
        return new PatientDto(patient.getPatientId(), patient.getName(), patient.getGender(), patient.getAge(), patient.getEmail(), patient.getPhoneNumber(), patient.getCreatedAt(), patient.getUpdatedAt());
    }
    public static List<PatientDto> toDtos(List<Patient> patients) {
        return patients.stream().map(PatientMapper::toDto).toList();
    }
}
