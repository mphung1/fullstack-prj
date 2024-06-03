package com.example.demo.mapper;
import com.example.demo.model.Patient;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import com.baeldung.openapi.model.UpdatePatientRequest;
import static org.mapstruct.MappingConstants.ComponentModel.SPRING;
@Mapper(componentModel = SPRING)
public interface UpdatePatientRequestMapper {
    Patient toEntity(UpdatePatientRequest updatePatientRequest);
    @Named("partialUpdate")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void partialUpdate(@MappingTarget Patient entity, UpdatePatientRequest dto);
}
