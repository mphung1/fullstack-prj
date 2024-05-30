package com.example.demo.rest;

import com.baeldung.openapi.api.PatientsApiDelegate;
import com.baeldung.openapi.model.PagePatientDto;
import com.baeldung.openapi.model.Pageable;
import com.baeldung.openapi.model.PatientDto;
import com.baeldung.openapi.model.PatientInfoCriteria;
import com.example.demo.service.PatientServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PatientsApiImpl implements PatientsApiDelegate {

    private final PatientServiceImpl patientService;


    @Override
    public ResponseEntity<PatientDto> createPatient(PatientDto patientDto) {  try {
        PatientDto savedPatient = patientService.savePatient(patientDto);
        return ResponseEntity.status(201).body(savedPatient);
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(null);
    }
    }

    @Override
    public ResponseEntity<Void> deletePatient(Integer id) {
        patientService.deletePatient(Long.valueOf(id));
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<PagePatientDto> getAllPatients(PatientInfoCriteria criteria, Pageable pageable) {
        Page<PatientDto> patientsPage = patientService.getFilteredPatients(
                PageRequest.of(pageable.getPage(), pageable.getSize()),
                criteria
        );

        PagePatientDto pagePatientDto = new PagePatientDto()
                .content(patientsPage.getContent())
                .totalElements((int) patientsPage.getTotalElements())
                .totalPages(patientsPage.getTotalPages())
                .number(patientsPage.getNumber())
                .size(patientsPage.getSize());
//                .numberOfElements(patientsPage.getNumberOfElements());

        return ResponseEntity.ok(pagePatientDto);
    }

    @Override
    public ResponseEntity<PatientDto> getPatientById(Integer id) {
        PatientDto patientDto = patientService.getPatientById(Long.valueOf(id));
        return ResponseEntity.of(Optional.ofNullable(patientDto));
    }

    @Override
    public ResponseEntity<PatientDto> updatePatient(Integer id, PatientDto patientDto) {
        try {
            PatientDto existingPatient = patientService.getPatientById(Long.valueOf(id));
            if (existingPatient != null) {
                patientDto.setPatientId(id);
                PatientDto updatedPatient = patientService.savePatient(patientDto);
                return ResponseEntity.ok(updatedPatient);
            }
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}