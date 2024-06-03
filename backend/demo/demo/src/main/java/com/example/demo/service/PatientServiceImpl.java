package com.example.demo.service;

import com.baeldung.openapi.model.CreatePatientRequest;
import com.baeldung.openapi.model.PatientDto;
import com.baeldung.openapi.model.PatientInfoCriteria;
import com.baeldung.openapi.model.UpdatePatientRequest;
import com.example.demo.exception.PatientNotFoundException;
import com.example.demo.exception.EmailExistsException;
import com.example.demo.exception.PhoneNumExistsException;
import com.example.demo.exception.PhoneNumFormatException;
import com.example.demo.mapper.PatientMapper;
import com.example.demo.mapper.CreatePatientRequestMapper;
import com.example.demo.mapper.UpdatePatientRequestMapper;
import com.example.demo.model.Patient;
import com.example.demo.repository.PatientRepository;
import com.example.demo.specification.PatientSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final CreatePatientRequestMapper createPatientRequestMapper;
    private final UpdatePatientRequestMapper updatePatientRequestMapper;


    @Override
    public Page<PatientDto> getAllPatients(Pageable pageable, PatientInfoCriteria criteria) {

        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").ascending());
        Page<Patient> patientPage = patientRepository.findAll(PatientSpecification.byCriteria(criteria), sortedPageable);
        return PatientMapper.toDtoPage(patientPage);
    }

    @Override
    public PatientDto createPatient(@Valid CreatePatientRequest patientDto) {
        validatePatientInfo(patientDto.getEmail(), patientDto.getPhoneNumber(), null);
        Patient patient = createPatientRequestMapper.toPatient(patientDto);
        return PatientMapper.toDto(patientRepository.save(patient));
    }

    @Override
    public PatientDto updatePatient(Long id, @Valid UpdatePatientRequest patientDto) {
        Patient existingPatient = patientRepository.findById(id).orElse(null);
        if (existingPatient == null) {
            throw new PatientNotFoundException("Patient not found with id: " + id);
        }

        validatePatientInfo(patientDto.getEmail(), patientDto.getPhoneNumber(), id);

        updatePatientRequestMapper.partialUpdate(existingPatient, patientDto);
        return PatientMapper.toDto(patientRepository.save(existingPatient));
    }

    @Override
    public PatientDto getPatientById(Long id) {
        return PatientMapper.toDto(patientRepository.findById(id).orElse(null));
    }

    @Override
    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new PatientNotFoundException("Patient not found with id: " + id);
        }
        patientRepository.deleteById(id);
    }

    private void validatePatientInfo(String email, String phoneNumber, Long currentId) {
        if (email != null && !email.isEmpty()) {
            checkEmailAvailability(email, currentId);
        }

        if (phoneNumber != null && !phoneNumber.isEmpty()) {
            if (!phoneNumber.matches("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$")) {
                throw new PhoneNumFormatException("Phone number must contain only numeric characters");
            }

            checkPhoneNumberAvailability(phoneNumber, currentId);
        }
    }

    private void checkEmailAvailability(String email, Long currentId) {
        Patient existingPatient = patientRepository.findByEmail(email).orElse(null);
        if (existingPatient != null && (!(Objects.equals(existingPatient.getId(), currentId)) || currentId == 0)) {
            throw new EmailExistsException("Email already in use");
        }
    }

    private void checkPhoneNumberAvailability(String phoneNumber, Long currentId) {
        Patient existingPatient = patientRepository.findByPhoneNumber(phoneNumber).orElse(null);
        if (existingPatient != null && (!(Objects.equals(existingPatient.getId(), currentId)) || currentId == 0 )) {
            throw new PhoneNumExistsException("Phone number already in use");
        }
    }
}
