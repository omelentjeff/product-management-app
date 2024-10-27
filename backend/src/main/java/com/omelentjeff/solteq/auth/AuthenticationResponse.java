package com.omelentjeff.solteq.auth;

/**
 * DTO for authentication responses.
 * This class represents the response returned after a successful authentication.
 */
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    
    private String token;
}