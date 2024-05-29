package com.example.demo.mapper;

import com.example.demo.dto.PatientDto;
import com.example.demo.model.Patient;

import org.springframework.data.domain.Page;


import java.util.List;
// import java.util.stream.Collectors;

public class PatientMapper {

    public static Patient toEntity(PatientDto dto) {
        return new Patient(dto.getPatientId(), dto.getName(), dto.getGender(), dto.getAge(), dto.getEmail(), dto.getPhoneNumber(), dto.getCreatedAt(), dto.getUpdatedAt()
        
        // , dto.isActive()
        );
    }

    public static PatientDto toDto(Patient patient) {
        return new PatientDto(patient.getPatientId(), patient.getName(), patient.getGender(), patient.getAge(), patient.getEmail(), patient.getPhoneNumber(), patient.getCreatedAt(), patient.getUpdatedAt()
        // , patient.isActive()
        );
    }
    public static List<PatientDto> toDtos(List<Patient> patients) {
        return patients.stream().map(PatientMapper::toDto).toList();
    }
    public static Page<PatientDto> toDtoPage(Page<Patient> patientPage) {
        return patientPage.map(PatientMapper::toDto);
    }

}
