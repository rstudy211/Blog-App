package com.restapi.BlogProject.services;

import com.restapi.BlogProject.entity.Blog;
import com.restapi.BlogProject.entity.User;
import com.restapi.BlogProject.entity.UserDto;
import com.restapi.BlogProject.error.EmailException;
import com.restapi.BlogProject.error.EntityNotFound;
import com.restapi.BlogProject.error.LoginException;
import com.restapi.BlogProject.repository.BlogRepository;
import com.restapi.BlogProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServicesImpls implements UserServices {
    @Autowired
    private  BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BlogRepository blogRepository;
    public List<User> allUsers(){

        return userRepository.findAll();
    }
    @Override
    public void registerUser(User user) throws Exception {
        try {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        }
        catch (Exception e){
            throw new EmailException("Username Already Exists");
        }


    }

@Override
    public void logut(String details) throws JSONException, EntityNotFound, LoginException {
        JSONObject userDetails = new JSONObject(details);
        Optional<User> user = Optional.ofNullable(userRepository.findByUsername(String.valueOf(userDetails.get("username"))));
        if(user.isEmpty()){
            throw new EntityNotFound("User is not Found");
        }
        if(!user.get().getLoggedIn()){
            throw new LoginException("You have to be Login First");
        }
        user.get().setLoggedIn(Boolean.FALSE);
        userRepository.save(user.get());
    }

    @Override
    public UserDto getUser(String username) {
        User userDetails = userRepository.findByUsername(username);

        return new UserDto(userDetails.getId(),userDetails.getUsername(),userDetails.getEmail());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        User user = userRepository.findByUsername(username);
        System.out.println(user);
        if(user==null){
            throw new UsernameNotFoundException("User is not Found");
        }
        else {
            user.setLoggedIn(Boolean.TRUE);
            userRepository.save(user);
            return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),new ArrayList<>());
        }
    }
}
