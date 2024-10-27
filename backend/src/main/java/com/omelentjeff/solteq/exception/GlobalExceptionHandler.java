package com.omelentjeff.solteq.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Global exception handler for the application that handles exceptions
 * thrown by the application and returns structured error responses.
 *
 * This class uses Spring's {@link RestControllerAdvice} to intercept
 * exceptions at the controller level and provide custom responses.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles {@link ProductNotFoundException} and returns a
     * structured error response with HTTP status 404 (Not Found).
     *
     * @param ex the exception thrown when a product is not found
     * @return a ResponseEntity containing the error response
     */
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleProductNotFound(ProductNotFoundException ex) {

        var error = ErrorResponse
                .builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .timeStamp(System.currentTimeMillis())
                .build();
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles {@link UsernameInUseException} and returns a
     * structured error response with HTTP status 400 (Bad Request).
     *
     * @param ex the exception thrown when a username is already in use
     * @return a ResponseEntity containing the error response
     */
    @ExceptionHandler(UsernameInUseException.class)
    public ResponseEntity<ErrorResponse> handleUsernameInUse(UsernameInUseException ex) {
        var error = ErrorResponse
                .builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .timeStamp(System.currentTimeMillis())
                .build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles validation exceptions thrown during method argument validation
     * and returns a structured error response with HTTP status 400 (Bad Request).
     *
     * @param ex the exception thrown during validation
     * @return a ResponseEntity containing the error response with details of validation failures
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> details = ex.getBindingResult()
                .getAllErrors()
                .stream()
                .map(error -> {
                    String fieldName = ((FieldError) error).getField();
                    String errorMessage = error.getDefaultMessage();
                    return fieldName + ": " + errorMessage;
                })
                .collect(Collectors.toList());

        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message("Validation failed!")
                .timeStamp(System.currentTimeMillis())
                .details(details)
                .build();

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
