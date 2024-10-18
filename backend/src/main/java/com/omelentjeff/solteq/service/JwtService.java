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

@Service
public class JwtService {

    private static final String SECRET_KEY = "43dc757aad3c96d0b3ab62faef57d3768924502fc9054e7de402b19b8e70667e3a19d6a3c4790c3fb17f1bf9cdf4a6245477243a1353cba087f7323119afd5d708232c93e33bb651bc89431f60a783b0864cc505559942788d35be4903a16cef5ed12585f4372acebc54a753272f0d910d3730de2fad24480c97468f94e2164b8f16f4f6cd5b28af2483c42dc9f88c155cda70437ebc96e0d6ac3468d218f608c5cdf5b9889ec24135a476be9a3d69349e56e9c2075f96f64c1d30d8c8faf89d6120328388898d7e2cd8ca3cd0b826f80713d06a7b395f48b4aa0bbe51806d6e447fa76437cb576373fc486bc11fb024aa376c5d145e5a3d2dfbb5eb78012fec";


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getSigningKey())
                .compact();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
