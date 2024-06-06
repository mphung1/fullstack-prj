package com.example.demo.services;

import com.example.demo.models.dtos.JwtResponseDto;
import com.example.demo.models.dtos.SignInRequestDto;
import com.example.demo.models.dtos.SignUpRequestDto;
import com.example.demo.config.auth.TokenProvider;
import com.example.demo.exceptions.InvalidJwtException;
import com.example.demo.models.entities.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private TokenProvider tokenService;

    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    public User signUp(SignUpRequestDto data) throws InvalidJwtException {
        if (repository.findByUsername(data.username()) != null) {
            throw new InvalidJwtException("Username already exists");
        }
        User.UserRole role = User.UserRole.valueOf(data.role().toUpperCase());
        String encryptedPassword = passwordEncoder.encode(data.password());
        User newUser = new User(data.username(), encryptedPassword, role);
        return repository.save(newUser);
    }

    public JwtResponseDto signIn(SignInRequestDto data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var authUser = authenticationManager.authenticate(usernamePassword);
        var accessToken = tokenService.generateAccessToken((com.example.demo.models.entities.User) authUser.getPrincipal());
        var userRole = ((User) authUser.getPrincipal()).getRole().name();
        return new JwtResponseDto(accessToken, userRole);
    }
}