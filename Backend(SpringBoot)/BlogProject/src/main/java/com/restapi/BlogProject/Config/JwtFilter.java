package com.restapi.BlogProject.Config;

import com.restapi.BlogProject.jwtutils.TokenManger;
import com.restapi.BlogProject.services.UserServices;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private UserServices userServices;
    @Autowired
    private TokenManger tokenManger;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String tokenHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;
        if(tokenHeader!=null && tokenHeader.startsWith("Bearer ")){
            token = tokenHeader.substring(7);
            try{
            username = tokenManger.getUsernameFromToken(token);
            }
            catch (IllegalArgumentException e){
                System.out.println("");
            }
            catch (ExpiredJwtException e){
                System.out.println("Token has expired");
//                throw new ExpiredJwtException();
//                response.sendError(401,"Expired token");
            }

            }
        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails = userServices.loadUserByUsername(username);
            if(tokenManger.validateToken(token,userDetails)){
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request,response);
    }
}
