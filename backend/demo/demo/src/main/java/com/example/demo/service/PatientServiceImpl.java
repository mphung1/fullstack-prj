 package com.example.demo.service;

 import com.baeldung.openapi.model.PatientDto;
 import com.baeldung.openapi.model.PatientInfoCriteria;
 import com.example.demo.exception.PatientNotFoundException;
 import com.example.demo.exception.EmailExistsException;
 import com.example.demo.exception.PhoneNumExistsException;
 import com.example.demo.mapper.PatientMapper;
 import com.example.demo.model.Patient;
 import com.example.demo.repository.PatientRepository;
 import com.example.demo.specification.PatientSpecification;
 import lombok.RequiredArgsConstructor;
 import org.springframework.data.domain.Page;
 import org.springframework.data.domain.PageRequest;
 import org.springframework.data.domain.Pageable;
 import org.springframework.data.domain.Sort;
 import org.springframework.data.jpa.domain.Specification;
 import org.springframework.stereotype.Service;

 import java.util.Optional;

 @Service
 @RequiredArgsConstructor
 public class PatientServiceImpl implements PatientService {
     private final PatientRepository patientRepository;

     private void checkEmailAvailability(String email, Long currentPatientId) {
         Optional<Patient> existingPatient = patientRepository.findByEmail(email);
         if (existingPatient.isPresent() && !existingPatient.get().getPatientId().equals(currentPatientId)) {
             throw new EmailExistsException("Email already in use");
         }
     }

     private void checkPhoneNumberAvailability(String phoneNumber, Long currentPatientId) {
         Optional<Patient> existingPatient = patientRepository.findByPhoneNumber(phoneNumber);
         if (existingPatient.isPresent() && !existingPatient.get().getPatientId().equals(currentPatientId)) {
             throw new PhoneNumExistsException("Phone number already in use");
         }
     }

     @Override
     public Page<PatientDto> getFilteredPatients(Pageable pageable, PatientInfoCriteria criteria) {
         Specification<Patient> spec = Specification.where(PatientSpecification.hasPatientId(criteria.getPatientId()))
                 .and(PatientSpecification.hasName(criteria.getName()))
                 .and(PatientSpecification.hasGender(criteria.getGender()))
                 .and(PatientSpecification.hasAge(criteria.getAge()))
                 .and(PatientSpecification.hasEmail(criteria.getEmail()))
                 .and(PatientSpecification.hasPhoneNumber(criteria.getPhoneNumber()));

         Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("patientId").ascending());
         Page<Patient> patientPage = patientRepository.findAll(spec, sortedPageable);
         return PatientMapper.toDtoPage(patientPage);
     }

     @Override
     public Page<PatientDto> getAllPatients(Pageable pageable) {
         Page<Patient> patientPage = patientRepository.findAll(pageable);
         return PatientMapper.toDtoPage(patientPage);
     }

     @Override
     public PatientDto getPatientById(Long id) {
         return PatientMapper.toDto(patientRepository.findById(id).orElse(null));
     }

     @Override
     public PatientDto savePatient(PatientDto patientDto) {
         if (patientDto.getPatientId() == null) { // Creation
             checkEmailAvailability(patientDto.getEmail(), null);
             checkPhoneNumberAvailability(patientDto.getPhoneNumber(), null);
         } else { // Update
             Optional<Patient> existingPatient = patientRepository.findById(patientDto.getPatientId().longValue());
             if (existingPatient.isPresent()) {
                 Patient existing = existingPatient.get();
                 if (!existing.getEmail().equals(patientDto.getEmail())) {
                     checkEmailAvailability(patientDto.getEmail(), patientDto.getPatientId().longValue());
                 }
                 if (!existing.getPhoneNumber().equals(patientDto.getPhoneNumber())) {
                     checkPhoneNumberAvailability(patientDto.getPhoneNumber(), patientDto.getPatientId().longValue());
                 }
             } else {
                 throw new IllegalArgumentException("Patient not found");
             }
         }

         Patient patient = PatientMapper.toEntity(patientDto);
         return PatientMapper.toDto(patientRepository.save(patient));
     }

     @Override
     public void deletePatient(Long id) {
         if (!patientRepository.existsById(id)) {
             throw new PatientNotFoundException("Patient not found with id: " + id);
         }
         patientRepository.deleteById(id);
     }
 }

