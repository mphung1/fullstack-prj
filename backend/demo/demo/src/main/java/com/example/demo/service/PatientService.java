package com.example.demo.service;

import com.example.demo.dto.PatientDto;
import com.example.demo.mapper.PatientMapper;
import com.example.demo.model.Patient;
import com.example.demo.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;

    public List<PatientDto> getAllPatients() {
        return PatientMapper.toDtos(patientRepository.findAll());
    }

    public PatientDto getPatientById(Long id) {
        return PatientMapper.toDto(Objects.requireNonNull(patientRepository.findById(id).orElse(null)));
    }

    public PatientDto savePatient(Patient patient) {
        return PatientMapper.toDto(patientRepository.save(patient));
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}
