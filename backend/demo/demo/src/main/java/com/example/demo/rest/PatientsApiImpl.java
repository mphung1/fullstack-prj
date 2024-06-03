package com.example.demo.rest;

import com.baeldung.openapi.api.PatientsApiDelegate;
import com.baeldung.openapi.model.*;
import com.example.demo.service.PatientServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PatientsApiImpl implements PatientsApiDelegate {

    private final PatientServiceImpl patientService;

    @Override
    public ResponseEntity<PatientDto> createPatient(CreatePatientRequest patientDto) {
        try {
            return ResponseEntity.status(201).body(patientService.createPatient(patientDto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<Void> deletePatient(Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<PagePatientDto> getAllPatients(PatientInfoCriteria criteria, Pageable pageable) {
        Page<PatientDto> patientsPage = patientService.getAllPatients(PageRequest.of(pageable.getPage(), pageable.getSize()), criteria);
        PagePatientDto pagePatientDto = new PagePatientDto()
                .content(patientsPage.getContent())
                .totalElements((int) patientsPage.getTotalElements())
                .totalPages(patientsPage.getTotalPages())
                .number(patientsPage.getNumber())
                .size(patientsPage.getSize());

        return ResponseEntity.ok(pagePatientDto);
    }

    @Override
    public ResponseEntity<PatientDto> getPatientById(Long id) {
        return ResponseEntity.of(Optional.ofNullable(patientService.getPatientById(id)));
    }

    @Override
    public ResponseEntity<PatientDto> updatePatient(Long id, UpdatePatientRequest patientDto) {
        try {
            return ResponseEntity.ok(patientService.updatePatient(id, patientDto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
