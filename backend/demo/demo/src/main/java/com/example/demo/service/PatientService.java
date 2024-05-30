package com.example.demo.service;

import com.baeldung.openapi.model.PatientDto;
import com.baeldung.openapi.model.PatientInfoCriteria;
import com.example.demo.mapper.PatientMapper;
import com.example.demo.model.Patient;
import com.example.demo.specification.PatientSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

public interface PatientService {
    public Page<PatientDto> getFilteredPatients(Pageable pageable, PatientInfoCriteria patientInfoCriteria);

    public Page<PatientDto> getAllPatients(Pageable pageable);

    public PatientDto getPatientById(Long id);

    public PatientDto savePatient(PatientDto patientDto);

    public void deletePatient(Long id);
}
