package com.example.demo.specification;

import com.baeldung.openapi.model.PatientInfoCriteria;
import com.example.demo.models.entities.Patient;
import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;

@UtilityClass
public class PatientSpecification {

    public Specification<Patient> byCriteria(PatientInfoCriteria criteria) {
        if (criteria == null) {
            return Specification.where(null);
        }

        return Specification.where(hasId(criteria.getId()))
                .and(hasName(criteria.getName()))
                .and(hasGender(criteria.getGender()))
                .and(hasAge(criteria.getAge()))
                .and(hasEmail(criteria.getEmail()))
                .and(hasPhoneNumber(criteria.getPhoneNumber()));
    }

    private Specification<Patient> hasId(Long id) {
        return (root, query, criteriaBuilder) ->
                (id == null) ? criteriaBuilder.conjunction() : criteriaBuilder.equal(root.get("id"), id);
    }

    private Specification<Patient> hasName(String name) {
        return (root, query, criteriaBuilder) ->
                (name == null || name.isEmpty()) ? criteriaBuilder.conjunction() : criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    private Specification<Patient> hasGender(String gender) {
        return (root, query, criteriaBuilder) ->
                (gender == null || gender.isEmpty()) ? criteriaBuilder.conjunction() : criteriaBuilder.equal(root.get("gender"), gender);
    }

    private Specification<Patient> hasAge(String age) {
        return (root, query, criteriaBuilder) -> {
            if (age == null || age.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            try {
                return criteriaBuilder.equal(root.get("age"), Integer.parseInt(age));
            } catch (NumberFormatException e) {
                return criteriaBuilder.conjunction();
            }
        };
    }

    private Specification<Patient> hasEmail(String email) {
        return (root, query, criteriaBuilder) ->
                (email == null || email.isEmpty()) ? criteriaBuilder.conjunction() : criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%");
    }

    private Specification<Patient> hasPhoneNumber(String phoneNumber) {
        return (root, query, criteriaBuilder) ->
                (phoneNumber == null || phoneNumber.isEmpty()) ? criteriaBuilder.conjunction() : criteriaBuilder.like(criteriaBuilder.lower(root.get("phoneNumber")), "%" + phoneNumber.toLowerCase() + "%");
    }
}
