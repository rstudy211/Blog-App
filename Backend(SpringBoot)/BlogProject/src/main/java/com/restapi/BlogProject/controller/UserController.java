package com.restapi.BlogProject.controller;

import com.restapi.BlogProject.entity.*;
import com.restapi.BlogProject.error.EntityNotFound;
import com.restapi.BlogProject.error.LoginException;
import com.restapi.BlogProject.jwtutils.TokenManger;
import com.restapi.BlogProject.services.RabbitMQSender;
import com.restapi.BlogProject.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    @Autowired
    private UserServices userServices;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private RabbitMQSender rabbitMQSender;


    @Autowired
    private TokenManger tokenManger;
    @PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody JwtReq jwtReq) throws Exception {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtReq.getUsername(),jwtReq.getPassword()));

        }
        catch (DisabledException e){
            throw new Exception("USER_Disabled");
        }
        catch (BadCredentialsException e){
            throw new BadCredentialsException("Invalid Credentials");
        }
        UserDetails userDetails = userServices.loadUserByUsername(jwtReq.getUsername());

        String jwtToken = tokenManger.generateToken(userDetails);
        JwtRes response = new JwtRes(jwtToken);
        LogsDto logsDto = LogsDto.builder()
                .user(jwtReq.getUsername())
                .request(jwtReq)
                .response(response)
                .operation("/token")
                .type("RRL")
                .build();
//        rabbitMQSender.send(logsDto);
        return ResponseEntity.ok(new JwtRes(jwtToken));
    }
    @GetMapping("/user")
    public UserDto getUser(@RequestHeader (HttpHeaders.AUTHORIZATION) String token){
        String jwtToken = token.substring(7);
        String username = tokenManger.getUsernameFromToken(jwtToken);
        return userServices.getUser(username);
    }
    @GetMapping("/allUsers")
    public List<User> allUser(){
        return this.userServices.allUsers();
    }
    @PostMapping("/register")
    public ResponseEntity<JwtRes> register(@RequestBody User user) throws Exception {
        this.userServices.registerUser(user);
        UserDetails userDetails = userServices.loadUserByUsername(user.getUsername());
        String jwtToken = tokenManger.generateToken(userDetails);
//        JwtRes response = new JwtRes(jwtToken);
        return ResponseEntity.ok(new JwtRes(jwtToken));
    }

//    @PostMapping("/")
//    public List<Blog> login(@RequestBody String details) throws JSONException, LoginException {
//        return this.userServices.login(details);
//
//    }
    @PostMapping("/logout")
    public String logout(@RequestBody String details) throws JSONException,LoginException, EntityNotFound {

        this.userServices.logut(details);
        return "Logout Successfully";
    }

}
