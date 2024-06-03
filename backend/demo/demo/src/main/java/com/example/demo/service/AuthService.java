package com.example.demo.service;

import com.example.demo.dtos.SignUpDto;
import com.example.demo.exception.InvalidJwtException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        return repository.findByUsername(username);
    }

    public UserDetails signUp(SignUpDto data) throws InvalidJwtException {
        if (repository.findByUsername(data.username()) != null) {
            throw new InvalidJwtException("Username already exists");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.username(), encryptedPassword, data.role());
        return repository.save(newUser);
    }
}
