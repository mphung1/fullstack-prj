package com.example.demo.service;

import com.example.demo.dtos.SignUpRequestDto;
import com.example.demo.exception.InvalidJwtException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
}