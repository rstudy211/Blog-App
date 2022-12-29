package com.restapi.BlogProject.jwtutils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class TokenManger {
    private static final long serialVersionUID = 7008375124389347049L; public static final long TOKEN_VALIDITY = 10 * 60 * 60;
    @Value("${secret}")
    private String jwtSecret;

    public String generateToken(UserDetails userDetails){
        Map<String,Object> claims = new HashMap<>();
        return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY*1000))
                .signWith(SignatureAlgorithm.HS256,jwtSecret).compact();
    }
    public Boolean validateToken(String token,UserDetails userDetails){
        String username = getUsernameFromToken(token);
        Claims claim = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        boolean isTokenValidate = claim.getExpiration().before(new Date());
        return username.equals(userDetails.getUsername()) && !isTokenValidate;

    }

    public String getUsernameFromToken(String token) {
        Claims claim = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return claim.getSubject();
    }
}
