package com.example.demo.models.dtos;

public record JwtResponseDto(
        String accessToken,
        String role
) {
}
