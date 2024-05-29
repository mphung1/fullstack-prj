package com.example.demo.service;

import com.example.demo.dto.PatientDto;
import com.example.demo.mapper.PatientMapper;
import com.example.demo.model.Patient;
import com.example.demo.repository.PatientRepository;
import com.example.demo.specification.PatientSpecification;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;
    
    
    // public List<PatientDto> getAllPatients() {
        //     return PatientMapper.toDtos(patientRepository.findAll());
        // }
        
    public Page<PatientDto> getFilteredPatients(Pageable pageable, String patientId, String name, String gender, String age, String email, String phoneNumber
    // , Boolean isActive
    ) {
           Specification<Patient> spec = Specification.where(PatientSpecification.hasPatientId(patientId))
               .and(PatientSpecification.hasName(name))
               .and(PatientSpecification.hasGender(gender))
               .and(PatientSpecification.hasAge(age))
               .and(PatientSpecification.hasEmail(email))
               .and(PatientSpecification.hasPhoneNumber(phoneNumber));
            //    .and(PatientSpecification.isActive(isActive));
    
           Page<Patient> patientPage = patientRepository.findAll(spec, pageable);
           return PatientMapper.toDtoPage(patientPage);
    }

    public Page<PatientDto> getAllPatients(Pageable pageable) {
        Page<Patient> patientPage = patientRepository.findAll(pageable);
        return PatientMapper.toDtoPage(patientPage);
    }

    public PatientDto getPatientById(Long id) {
        return PatientMapper.toDto(Objects.requireNonNull(patientRepository.findById(id).orElse(null)));
    }

    public PatientDto savePatient(PatientDto patient) {
        return PatientMapper.toDto(patientRepository.save(PatientMapper.toEntity(patient)));
    }

    public void deletePatient(Long id) {
        // Patient deletePatient = patientRepository.findById(id).orElse(null);
        // if (deletePatient == null) {
        //     System.out.println("Patient not found");
        // }
        // deletePatient.setActive(false);
        // patientRepository.save(deletePatient)
        patientRepository.deleteById(id);
    }

    public Page<PatientDto> getActivePatients(Pageable pageable) {
        Specification<Patient> spec = Specification.where(PatientSpecification.isActive(true));
        Page<Patient> patientPage = patientRepository.findAll(spec, pageable);
        return PatientMapper.toDtoPage(patientPage);
    }
}
