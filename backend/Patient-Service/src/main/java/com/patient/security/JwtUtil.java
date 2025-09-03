package com.patient.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key;
    private final long expirationMs;

    // ✅ Fixed: Make sure property names match application.properties
    public JwtUtil(
            @Value("${security.jwt.secret}") String secret,
            @Value("${security.jwt.expiration-ms}") long expirationMs) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationMs = expirationMs;
    }

    // ✅ Generate JWT
    public String generateToken(String subject) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ Extract username from JWT
    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    // ✅ Validate JWT token
    public boolean validateToken(String token, String username) {
        try {
            Claims claims = parseClaims(token);
            return claims.getSubject().equals(username) &&
                   !claims.getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    // ✅ Parse JWT claims
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(key)
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }
}
