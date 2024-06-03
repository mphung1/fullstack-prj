package com.example.demo.dtos;
import com.example.demo.model.User;

public record SignUpDto(
        String login,
        String password,
        User.UserRole role) {
}
