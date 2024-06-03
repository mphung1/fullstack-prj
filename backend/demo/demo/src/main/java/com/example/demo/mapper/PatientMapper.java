package com.example.demo.mapper;

import com.baeldung.openapi.model.CreatePatientRequest;
import com.baeldung.openapi.model.PatientDto;
import com.example.demo.model.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

public interface PatientMapper {

    public static Patient toEntity(CreatePatientRequest request) {
        if (request == null) {
            return null;
        }
        Patient patient = new Patient();

        patient.setName(request.getName());
        patient.setGender(request.getGender());
        patient.setAge(Integer.parseInt(request.getAge()));
        patient.setEmail(request.getEmail());
        patient.setPhoneNumber(String.valueOf(request.getPhoneNumber()));

        return patient;
    }

    public static PatientDto toDto(Patient patient) {
        if (patient == null) {
            return null;
        }
        return new PatientDto()
                .id(patient.getId())
                .name(patient.getName())
                .gender(patient.getGender())
                .age(String.valueOf(patient.getAge()))
                .email(patient.getEmail())
                .phoneNumber(patient.getPhoneNumber())
                .createdAt(patient.getCreatedAt() != null ? OffsetDateTime.of(patient.getCreatedAt(), OffsetDateTime.now().getOffset()) : null)
                .updatedAt(patient.getUpdatedAt() != null ? OffsetDateTime.of(patient.getUpdatedAt(), OffsetDateTime.now().getOffset()) : null);
    }

    public static List<PatientDto> toDtos(List<Patient> patients) {
        return patients.stream().map(PatientMapper::toDto).collect(Collectors.toList());
    }

    public static Page<PatientDto> toDtoPage(Page<Patient> patientPage) {
        List<PatientDto> patientDtoList = patientPage.getContent().stream().map(PatientMapper::toDto).collect(Collectors.toList());
        return new PageImpl<>(patientDtoList, patientPage.getPageable(), patientPage.getTotalElements());
    }
}
