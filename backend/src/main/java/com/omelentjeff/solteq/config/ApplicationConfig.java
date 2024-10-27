package com.omelentjeff.solteq.config;

import com.omelentjeff.solteq.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Configuration class for security-related beans.
 * This class defines the beans for user details service, authentication provider,
 * authentication manager, and password encoder.
 */
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository repository;

    /**
     * Provides a UserDetailsService implementation that loads user details from the database.
     *
     * @return a UserDetailsService that fetches user details by username
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    /**
     * Configures an AuthenticationProvider that uses a UserDetailsService and a PasswordEncoder.
     *
     * @return an AuthenticationProvider for handling authentication
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvided = new DaoAuthenticationProvider();
        authProvided.setUserDetailsService(userDetailsService());
        authProvided.setPasswordEncoder(passwordEncoder());
        return authProvided;
    }

    /**
     * Provides the AuthenticationManager used for authenticating users.
     *
     * @param config the AuthenticationConfiguration to create the manager from
     * @return the AuthenticationManager
     * @throws Exception if an error occurs during manager creation
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Provides a PasswordEncoder implementation that uses BCrypt for hashing passwords.
     *
     * @return a PasswordEncoder for encoding passwords
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
