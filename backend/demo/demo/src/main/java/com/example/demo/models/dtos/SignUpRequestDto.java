package com.example.demo.models.dtos;

public record SignUpRequestDto(
        String username,
        String password,
        String role) {
}
