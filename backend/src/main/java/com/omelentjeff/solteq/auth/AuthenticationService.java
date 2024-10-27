package com.omelentjeff.solteq.auth;

import com.omelentjeff.solteq.entity.Role;
import com.omelentjeff.solteq.entity.UserEntity;
import com.omelentjeff.solteq.exception.UsernameInUseException;
import com.omelentjeff.solteq.repository.UserRepository;
import com.omelentjeff.solteq.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service for handling authentication operations.
 * This service provides functionality for user registration and authentication.
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Registers a new user in the system.
     *
     * @param request the registration request containing user details
     * @return an AuthenticationResponse containing the generated JWT token
     * @throws UsernameInUseException if the username is already taken
     */
    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new UsernameInUseException("Username is already taken");
        }

        var user = UserEntity.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole().toUpperCase()))
                .build();

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    /**
     * Authenticates a user and returns a JWT token.
     *
     * @param request the authentication request containing user credentials
     * @return an AuthenticationResponse containing the generated JWT token
     * @throws UsernameNotFoundException if the username is not found
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
