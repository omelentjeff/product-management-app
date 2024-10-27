package com.omelentjeff.solteq.exception;

/**
 * Exception thrown when a product is not found in the system.
 * This is a runtime exception that indicates a missing resource
 * in the context of product operations.
 */
public class ProductNotFoundException extends RuntimeException {

    /**
     * Constructs a new ProductNotFoundException with the specified detail message.
     *
     * @param msg the detail message, which is saved for later retrieval
     *            by the {@link Throwable#getMessage()} method
     */
    public ProductNotFoundException(String msg) {
        super(msg);
    }
}
