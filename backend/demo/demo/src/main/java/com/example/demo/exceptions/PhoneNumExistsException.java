package com.example.demo.exceptions;

public class PhoneNumExistsException extends RuntimeException {
    public PhoneNumExistsException(String message) {
        super(message);
    }
}
