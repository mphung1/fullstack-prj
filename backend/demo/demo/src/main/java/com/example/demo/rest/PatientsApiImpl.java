package com.example.demo.rest;

import com.baeldung.openapi.api.PatientsApiDelegate;
import com.baeldung.openapi.model.PagePatientDto;
import com.baeldung.openapi.model.PatientDto;
import com.example.demo.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientsApiImpl implements PatientsApiDelegate {

    private final PatientService patientService;


    @Override
    public ResponseEntity<PatientDto> createPatient(PatientDto patientDto) {
        PatientDto savedPatient = patientService.savePatient(patientDto);
        return ResponseEntity.status(201).body(savedPatient);
    }

    @Override
    public ResponseEntity<Void> deletePatient(Integer id) {
        patientService.deletePatient(Long.valueOf(id));
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<PagePatientDto> getAllPatients(Integer page,
                                                         Integer size,
                                                         String patientId,
                                                         String name,
                                                         String gender,
                                                         String age,
                                                         String email,
                                                         String phoneNumber) {
        Page<PatientDto> patientsPage = patientService.getFilteredPatients(
                PageRequest.of(page, size),
                patientId,
                name,
                gender,
                age,
                email,
                phoneNumber
        );

        PagePatientDto pagePatientDto = new PagePatientDto()
                .content(patientsPage.getContent())
                .totalElements((int) patientsPage.getTotalElements())
                .totalPages(patientsPage.getTotalPages())
                .number(patientsPage.getNumber())
                .size(patientsPage.getSize())
                .numberOfElements(patientsPage.getNumberOfElements());

        return ResponseEntity.ok(pagePatientDto);
    }

    @Override
    public ResponseEntity<PatientDto> getPatientById(Integer id) {
        PatientDto patientDto = patientService.getPatientById(Long.valueOf(id));
        return ResponseEntity.of(Optional.ofNullable(patientDto));
    }

    @Override
    public ResponseEntity<PatientDto> updatePatient(Integer id, PatientDto patientDto) {
        PatientDto existingPatient = patientService.getPatientById(Long.valueOf(id));
        if (existingPatient != null) {
            patientDto.setPatientId(id);
            PatientDto updatedPatient = patientService.savePatient(patientDto);
            return ResponseEntity.ok(updatedPatient);
        }
        return ResponseEntity.notFound().build();
    }
}