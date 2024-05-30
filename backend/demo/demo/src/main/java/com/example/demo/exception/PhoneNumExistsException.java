package com.example.demo.exception;

public class PhoneNumExistsException extends RuntimeException {
    public PhoneNumExistsException(String message) {
        super(message);
    }
}
