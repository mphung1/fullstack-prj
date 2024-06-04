package com.example.demo.rest;

import com.baeldung.openapi.api.PatientsApiDelegate;
import com.baeldung.openapi.model.*;
import com.example.demo.service.PatientServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;

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
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    @Override
    public ResponseEntity<Void> deletePatient(Long id) {
        try {
            patientService.deletePatient(id);
            return ResponseEntity.noContent().build();
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    @Override
    public ResponseEntity<PagePatientDto> getAllPatients(PatientInfoCriteria criteria, Pageable pageable) {
        int page = pageable.getPage() >= 0 ? pageable.getPage() : 0;
        int size = pageable.getSize() > 0 ? pageable.getSize() : 5;
        Page<PatientDto> patientsPage = patientService.getAllPatients(PageRequest.of(page, size), criteria);
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
        } catch (AccessDeniedException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDenied(
            AccessDeniedException e
    ) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Access denied");
    }
}