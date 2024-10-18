package com.omelentjeff.solteq.auth;

import com.omelentjeff.solteq.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterRequest request) {
        return null;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        return null;
    }
}
