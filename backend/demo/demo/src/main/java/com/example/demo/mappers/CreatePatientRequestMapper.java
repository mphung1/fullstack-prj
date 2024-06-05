package com.example.demo.mappers;

import com.baeldung.openapi.model.CreatePatientRequest;
import com.example.demo.models.entities.Patient;
import org.mapstruct.Mapper;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(componentModel = SPRING)
public interface CreatePatientRequestMapper {
    Patient toPatient(CreatePatientRequest dto);
}