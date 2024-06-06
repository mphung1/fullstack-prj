package com.example.demo.controllers;

import com.example.demo.models.dtos.JwtResponseDto;
import com.example.demo.models.dtos.SignInRequestDto;
import com.example.demo.models.dtos.SignUpRequestDto;
import com.example.demo.services.UserService;
import com.example.demo.services.TokenBlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {


    @Autowired
    private UserService userService;

    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto data) {
        try {
            userService.signUp(data);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequestDto data) {
        try {
            JwtResponseDto jwtResponse = userService.signIn(data);
            return ResponseEntity.ok(jwtResponse);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password");
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        tokenBlacklistService.blacklistToken(token);
        return ResponseEntity.ok("Logged out successfully");
    }
}
