package com.example.demo.repository;

import com.example.demo.model.Patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
@EnableJpaRepositories
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>, JpaSpecificationExecutor<Patient> {
    Page<Patient> findAll(Pageable pageable);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
}
