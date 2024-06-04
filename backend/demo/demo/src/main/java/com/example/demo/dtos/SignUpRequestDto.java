package com.example.demo.dtos;

public record SignUpRequestDto(
        String username,
        String password,
        String role) {
}
