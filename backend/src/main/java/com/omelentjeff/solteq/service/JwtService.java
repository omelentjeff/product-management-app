package com.omelentjeff.solteq.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Service class for handling JSON Web Token (JWT) operations.
 *
 * This class provides methods to generate JWTs, extract claims, and
 * validate tokens. It uses a secret key for signing the tokens and
 * ensures secure token management.
 */
@Service
public class JwtService {

    private static final String SECRET_KEY = "43dc757aad3c96d0b3ab62faef57d3768924502fc9054e7de402b19b8e70667e3a19d6a3c4790c3fb17f1bf9cdf4a6245477243a1353cba087f7323119afd5d708232c93e33bb651bc89431f60a783b0864cc505559942788d35be4903a16cef5ed12585f4372acebc54a753272f0d910d3730de2fad24480c97468f94e2164b8f16f4f6cd5b28af2483c42dc9f88c155cda70437ebc96e0d6ac3468d218f608c5cdf5b9889ec24135a476be9a3d69349e56e9c2075f96f64c1d30d8c8faf89d6120328388898d7e2cd8ca3cd0b826f80713d06a7b395f48b4aa0bbe51806d6e447fa76437cb576373fc486bc11fb024aa376c5d145e5a3d2dfbb5eb78012fec";

    /**
     * Generates a JWT for the specified user.
     *
     * @param userDetails the details of the user for whom the token is to be generated
     * @return a JWT as a String
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * Generates a JWT with additional claims for the specified user.
     *
     * @param extraClaims additional claims to include in the JWT
     * @param userDetails the details of the user for whom the token is to be generated
     * @return a JWT as a String
     */
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .claim("role", userDetails.getAuthorities())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Extracts the username from the JWT.
     *
     * @param token the JWT from which to extract the username
     * @return the username contained in the JWT
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts a specific claim from the JWT.
     *
     * @param token the JWT from which to extract the claim
     * @param claimsResolver a function to resolve the claim from the Claims object
     * @param <T> the type of the claim to extract
     * @return the extracted claim
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extracts all claims from the JWT.
     *
     * @param token the JWT from which to extract all claims
     * @return the claims contained in the JWT
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Retrieves the signing key used to sign the JWTs.
     *
     * @return a SecretKey object used for signing
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Validates the JWT against the specified user details.
     *
     * @param token the JWT to validate
     * @param userDetails the user details against which to validate the token
     * @return true if the token is valid, false otherwise
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    /**
     * Checks if the JWT has expired.
     *
     * @param token the JWT to check
     * @return true if the token is expired, false otherwise
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extracts the expiration date from the JWT.
     *
     * @param token the JWT from which to extract the expiration date
     * @return the expiration date as a Date object
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
