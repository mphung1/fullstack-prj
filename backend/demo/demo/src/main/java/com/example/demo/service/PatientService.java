// package com.example.demo.service;

// import com.example.demo.dto.DemoPatientDto;
// import com.example.demo.mapper.PatientMapper;
// import com.example.demo.model.Patient;
// import com.example.demo.repository.PatientRepository;
// import com.example.demo.specification.PatientSpecification;


// import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service;

// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.data.domain.Pageable;
// import org.springframework.data.jpa.domain.Specification;
// import org.springframework.data.domain.Sort;

// import java.util.List;
// import java.util.Objects;


// @Service
// @RequiredArgsConstructor
// public class PatientService {
//     private final PatientRepository patientRepository;
            
//     public Page<DemoPatientDto> getFilteredPatients(Pageable pageable, String patientId, String name, String gender, String age, String email, String phoneNumber) {
//            Specification<Patient> spec = Specification.where(PatientSpecification.hasPatientId(patientId))
//                .and(PatientSpecification.hasName(name))
//                .and(PatientSpecification.hasGender(gender))
//                .and(PatientSpecification.hasAge(age))
//                .and(PatientSpecification.hasEmail(email))
//                .and(PatientSpecification.hasPhoneNumber(phoneNumber));
    
//         Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("patientId").ascending());

//         Page<Patient> patientPage = patientRepository.findAll(spec, sortedPageable);
//         return PatientMapper.toDtoPage(patientPage);
//     }

//     public Page<DemoPatientDto> getAllPatients(Pageable pageable) {
//         Page<Patient> patientPage = patientRepository.findAll(pageable);
//          return PatientMapper.toDtoPage(patientPage);
//     }

//     public DemoPatientDto getPatientById(Long id) {
//         return PatientMapper.toDto(Objects.requireNonNull(patientRepository.findById(id).orElse(null)));
//     }

//     public DemoPatientDto savePatient(DemoPatientDto patient) {
//         return PatientMapper.toDto(patientRepository.save(PatientMapper.toEntity(patient)));
//     }

//     public void deletePatient(Long id) {
//         patientRepository.deleteById(id);
//     }
// }


package com.example.demo.service;

import com.baeldung.openapi.model.PatientDto;
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

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;

    public Page<PatientDto> getFilteredPatients(Pageable pageable, String patientId, String name, String gender, String age, String email, String phoneNumber) {
        Specification<Patient> spec = Specification.where(PatientSpecification.hasPatientId(patientId))
                .and(PatientSpecification.hasName(name))
                .and(PatientSpecification.hasGender(gender))
                .and(PatientSpecification.hasAge(age))
                .and(PatientSpecification.hasEmail(email))
                .and(PatientSpecification.hasPhoneNumber(phoneNumber));

        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("patientId").ascending());
        Page<Patient> patientPage = patientRepository.findAll(spec, sortedPageable);
        return PatientMapper.toDtoPage(patientPage);
    }

    public Page<PatientDto> getAllPatients(Pageable pageable) {
        Page<Patient> patientPage = patientRepository.findAll(pageable);
        return PatientMapper.toDtoPage(patientPage);
    }

    public PatientDto getPatientById(Long id) {
        return PatientMapper.toDto(patientRepository.findById(id).orElse(null));
    }

    public PatientDto savePatient(PatientDto patient) {
        return PatientMapper.toDto(patientRepository.save(PatientMapper.toEntity(patient)));
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}
