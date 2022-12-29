package com.restapi.BlogProject.services;

import com.restapi.BlogProject.entity.Blog;
import com.restapi.BlogProject.entity.UserBlogStats;
import com.restapi.BlogProject.error.EntityNotFound;
import com.restapi.BlogProject.error.LoginException;
import com.restapi.BlogProject.repository.BlogDto;

import java.util.List;

public interface BlogServices {
    List<BlogDto> getAllBlogs(String searchString,int pageNumber,int pageSize);

    BlogDto getBlog(Long id) throws EntityNotFound, LoginException;

    void addBlog(Blog blog) throws EntityNotFound, LoginException;

    void updateBlog(Blog updateBlog) throws EntityNotFound, LoginException;


    void deleteBlog(Long id) throws EntityNotFound, LoginException;

    List<BlogDto> allBlogsOfUser(Long userId, String s,int pageNumber, int pageSize);

    void publishBlog(Long blogId);

    UserBlogStats userBlogStats(Long userId, String searchString);
}
