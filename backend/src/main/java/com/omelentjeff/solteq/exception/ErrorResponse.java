package com.omelentjeff.solteq.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Represents a structured error response for the application.
 *
 * This class is used to encapsulate error details that are returned
 * to the client when an error occurs during request processing.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {

    /**
     * The HTTP status code associated with the error.
     */
    private int status;

    /**
     * A message providing additional information about the error.
     */
    private String message;

    /**
     * The timestamp when the error occurred.
     */
    private long timeStamp;

    /**
     * A list of details providing specific information about the error.
     * This can include validation errors or other contextual information.
     */
    private List<String> details;
}
