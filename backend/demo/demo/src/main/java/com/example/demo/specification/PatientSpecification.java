package com.example.demo.specification;

import com.example.demo.model.Patient;
import org.springframework.data.jpa.domain.Specification;

public class PatientSpecification {
    public static Specification<Patient> hasPatientId(String patientId) {
        return (root, query, criteriaBuilder) -> 
            (patientId == null || patientId.isEmpty()) ? criteriaBuilder.conjunction() : criteriaBuilder.equal(root.get("patientId"), patientId);
    }

    public static Specification<Patient> hasName(String name) {
        return (root, query, criteriaBuilder) -> 
            (name == null || name.isEmpty()) ? criteriaBuilder.conjunction() : criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Patient> hasGender(String gender) {
        return (root, query, criteriaBuilder) -> 
            (gender == null || gender.isEmpty()) ? criteriaBuilder.conjunction() : criteriaBuilder.equal(root.get("gender"), gender);
    }

    public static Specification<Patient> hasAge(String age) {
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

    public static Specification<Patient> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> 
            (email == null || email.isEmpty()) ? criteriaBuilder.conjunction() : criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%");
    }

    public static Specification<Patient> hasPhoneNumber(String phoneNumber) {
        return (root, query, criteriaBuilder) -> 
            (phoneNumber == null || phoneNumber.isEmpty()) ? criteriaBuilder.conjunction() : criteriaBuilder.like(criteriaBuilder.lower(root.get("phoneNumber")), "%" + phoneNumber.toLowerCase() + "%");
    }

    public static Specification<Patient> isActive(boolean isActive) {
        return (root, query, criteriaBuilder) -> 
            (Boolean.FALSE.equals(isActive)) ? criteriaBuilder.conjunction() : criteriaBuilder.equal(root.get("isActive"), isActive);
    }
}
