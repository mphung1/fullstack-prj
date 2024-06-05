package com.example.demo.services;

import com.baeldung.openapi.model.CreatePatientRequest;
import com.baeldung.openapi.model.PatientDto;
import com.baeldung.openapi.model.PatientInfoCriteria;
import com.baeldung.openapi.model.UpdatePatientRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PatientService {
    Page<PatientDto> getAllPatients(Pageable pageable, PatientInfoCriteria patientInfoCriteria);

    PatientDto getPatientById(Long id);

    PatientDto createPatient(CreatePatientRequest patientDto);

    PatientDto updatePatient(Long id, UpdatePatientRequest patientDto);

    void deletePatient(Long id);
}
