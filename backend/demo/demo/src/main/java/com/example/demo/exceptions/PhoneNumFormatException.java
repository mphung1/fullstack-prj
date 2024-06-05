package com.example.demo.exceptions;

public class PhoneNumFormatException extends RuntimeException {
    public PhoneNumFormatException(String message) {
        super(message);
    }
}
