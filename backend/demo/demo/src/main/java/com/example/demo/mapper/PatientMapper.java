package com.example.demo.mapper;

import com.baeldung.openapi.model.PatientDto;
import com.example.demo.model.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.List;
import java.util.stream.Collectors;

public class PatientMapper {

    public static Patient toEntity(PatientDto dto) {
        if (dto == null) {
            return null;
        }
        Patient patient = new Patient();
        patient.setPatientId(Long.valueOf(dto.getPatientId()));
        patient.setName(dto.getName());
        patient.setGender(dto.getGender());
        patient.setAge(Integer.parseInt(dto.getAge()));
        patient.setEmail(dto.getEmail());
        patient.setPhoneNumber(dto.getPhoneNumber());
//         patient.setCreatedAt(dto.getCreatedAt());
//         patient.setUpdatedAt(dto.getUpdatedAt());
        return patient;
    }

    public static PatientDto toDto(Patient patient) {
        if (patient == null) {
            return null;
        }
        return new PatientDto()
                .patientId(Math.toIntExact(patient.getPatientId()))
                .name(patient.getName())
                .gender(patient.getGender())
                .age(String.valueOf(patient.getAge()))
                .email(patient.getEmail())
                .phoneNumber(patient.getPhoneNumber());
        // .createdAt(patient.getCreatedAt())
        // .updatedAt(patient.getUpdatedAt());
    }

    public static List<PatientDto> toDtos(List<Patient> patients) {
        return patients.stream().map(PatientMapper::toDto).collect(Collectors.toList());
    }

    public static Page<PatientDto> toDtoPage(Page<Patient> patientPage) {
        List<PatientDto> patientDtoList = patientPage.getContent().stream().map(PatientMapper::toDto).collect(Collectors.toList());
        return new PageImpl<>(patientDtoList, patientPage.getPageable(), patientPage.getTotalElements());
    }
}