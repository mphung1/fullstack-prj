// //
// package com.example.demo.controller;

// import com.example.demo.dto.DemoPatientDto;
// import com.example.demo.model.Patient;
// import com.example.demo.service.PatientService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/patients")
// public class PatientController {

//     @Autowired
//     private PatientService patientService;

//     @GetMapping
//     public Page<DemoPatientDto> getAllPatients(
//         @RequestParam(defaultValue = "0") int page,
//         @RequestParam(defaultValue = "5") int size,
//         @RequestParam(required = false) String patientId,
//         @RequestParam(required = false) String name,
//         @RequestParam(required = false) String gender,
//         @RequestParam(required = false) String age,
//         @RequestParam(required = false) String email,
//         @RequestParam(required = false) String phoneNumber    

//     ) {
//         return patientService.getFilteredPatients(PageRequest.of(page, size), patientId, name, gender, age, email, phoneNumber);
//     }


//     @GetMapping("/{id}")
//     public DemoPatientDto getPatientById(@PathVariable Long id) {
//         return patientService.getPatientById(id);
//     }

//     @PostMapping
//     public DemoPatientDto createPatient(@RequestBody DemoPatientDto patient) {
//         return patientService.savePatient(patient);
//     }

//     @PutMapping("/{id}")
//     public DemoPatientDto updatePatient(@PathVariable Long id, @RequestBody DemoPatientDto patient) {
//         DemoPatientDto existingPatient = patientService.getPatientById(id);
//         if (existingPatient != null) {
//             patient.setPatientId(id);
//             return patientService.savePatient(patient);
//         }
//         return null;
//     }

//     @DeleteMapping("/{id}")
//     public void deletePatient(@PathVariable Long id) {
//         patientService.deletePatient(id);
//     }
// }
