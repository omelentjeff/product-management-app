package com.omelentjeff.solteq.exception;

public class UsernameInUseException extends RuntimeException {

    public UsernameInUseException(String msg) {
        super(msg);
    }
}
