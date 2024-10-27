package com.omelentjeff.solteq.exception;

/**
 * Exception thrown when an attempt is made to register or use a username
 * that is already in use by another user.
 * This is a runtime exception that indicates a conflict in username
 * registration.
 */
public class UsernameInUseException extends RuntimeException {

    /**
     * Constructs a new UsernameInUseException with the specified detail message.
     *
     * @param msg the detail message, which is saved for later retrieval
     *            by the {@link Throwable#getMessage()} method
     */
    public UsernameInUseException(String msg) {
        super(msg);
    }
}
