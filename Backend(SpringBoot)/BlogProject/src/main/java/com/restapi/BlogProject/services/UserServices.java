package com.restapi.BlogProject.services;

import com.restapi.BlogProject.entity.Blog;
import com.restapi.BlogProject.entity.User;
import com.restapi.BlogProject.entity.UserDto;
import com.restapi.BlogProject.error.EntityNotFound;
import com.restapi.BlogProject.error.LoginException;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserServices extends UserDetailsService {
    void registerUser(User user) throws Exception;

//    List<Blog> login(String details) throws JSONException, LoginException;

    List<User> allUsers();

    void logut(String details) throws JSONException, EntityNotFound, LoginException;

    UserDto getUser(String username);
}
