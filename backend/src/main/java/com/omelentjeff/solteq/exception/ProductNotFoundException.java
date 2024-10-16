package com.omelentjeff.solteq.exception;

public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(String msg) {
        super(msg);
    }
}
