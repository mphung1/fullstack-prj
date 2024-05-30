package com.example.demo.service;

import com.example.demo.dto.DemoPatientDto;
import com.example.demo.exception.DuplicateFieldException;
import com.example.demo.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientValidationService {

    @Autowired
    private PatientRepository patientRepository;

    public void validatePatient(DemoPatientDto patientDto) {
        if (patientDto.getEmail() != null && patientRepository.existsByEmail(patientDto.getEmail())) {
            throw new DuplicateFieldException("Email is already in use");
        }

        if (patientDto.getPhoneNumber() != null && patientRepository.existsByPhoneNumber(patientDto.getPhoneNumber())) {
            throw new DuplicateFieldException("Phone number is already in use");
        }
    }
}
