package com.example.demo.exception;

public class PhoneNumFormatException extends RuntimeException {
    public PhoneNumFormatException(String message) {
        super(message);
    }
}
