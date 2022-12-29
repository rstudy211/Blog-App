package com.restapi.BlogProject.services;

import com.restapi.BlogProject.entity.Blog;
import com.restapi.BlogProject.entity.UserBlogStats;
import com.restapi.BlogProject.error.EntityNotFound;
import com.restapi.BlogProject.error.LoginException;
import com.restapi.BlogProject.repository.BlogDto;
import com.restapi.BlogProject.repository.BlogRepository;
import com.restapi.BlogProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BlogServicesImpls implements BlogServices {
    @Autowired
    private BlogRepository blogRepository;
@Autowired
    private UserRepository userRepository;

    @Override
    public List<BlogDto> getAllBlogs(String searchString,int pageNumber, int pageSize){
        List<BlogDto> blogDtoList = new ArrayList<>();
        List<Blog> blogs = new ArrayList<>();
        Pageable p = PageRequest.of(pageNumber,pageSize);


        System.out.println("in get all logs"+ pageSize + " "+pageNumber);
        if (!searchString.equals("")){
            Page<Blog> blogPage = blogRepository.findBySearchPublishedTrue(searchString,p);
            System.out.println(blogPage.getContent());
            blogs = blogPage.getContent();
        }
        else {
            System.out.println("empty string");
            Page<Blog> blogPage = blogRepository.findAllByPublishedTrue(p);
            System.out.println(blogPage.getContent());
            System.out.println(blogRepository.findAllByPublishedTrue());
            blogs = blogPage.getContent();
        }

        blogs.forEach(blog -> blogDtoList.add(new BlogDto(blog)));
        return blogDtoList;
    }


    @Override
    public List<BlogDto> allBlogsOfUser(Long userId, String s,int pageNumber, int pageSize) {
        List<BlogDto> blogDtoList = new ArrayList<>();
        Pageable p = PageRequest.of(pageNumber,pageSize);
        List<Blog> blogs = new ArrayList<>();
        if (!s.equals("")){
            Page<Blog> blogPage = blogRepository.searchInUser(userId,s,p);
            blogs = blogPage.getContent();
        }
        else {
            System.out.println("empty string");
            Page<Blog> blogPage = blogRepository.findAllByUserId(userId,p);
            blogs = blogPage.getContent();
        }
        blogs.forEach(blog -> blogDtoList.add(new BlogDto(blog)));
        return blogDtoList;
    }

    @Override
    public void publishBlog(Long blogId) {
        Optional<Blog> blog = blogRepository.findById(blogId);
        System.out.println(blog.toString());
        blog.get().setPublished(Boolean.TRUE);
        blogRepository.save(blog.get());
    }

    @Override
    public UserBlogStats userBlogStats(Long userId,String searchString) {
        UserBlogStats userBlogStats = new UserBlogStats();
        if(!searchString.equals("")){
            userBlogStats.setTotalBlogs(blogRepository.countAllSearchPublishedBlogs(searchString));
        }else {
            userBlogStats.setTotalBlogs(blogRepository.countAllByPublishedTrue());
        }
        if(!searchString.equals("")){
            userBlogStats.setUserPublishedBlogs(blogRepository.countUserPublishedSearchBlogs(userId,searchString));
        }else{
        userBlogStats.setUserPublishedBlogs(blogRepository.countUserPublishedBlogs(userId));
        }
        if(!searchString.equals("")){
            userBlogStats.setUserUnpublishedBlogs(blogRepository.countUserUnpublishedSearchBlogs(userId,searchString));
        }
        else {
            userBlogStats.setUserUnpublishedBlogs(blogRepository.countUserUnpublishedBlogs(userId));
        }
        System.out.println(userBlogStats.toString());
        return userBlogStats;
    }

    @Override
    public BlogDto getBlog(Long blogId) throws EntityNotFound, LoginException {

        Optional<Blog> blog =  blogRepository.findById(blogId);
//
        return new BlogDto(blog.get());
    }
    @Override
    public void addBlog(Blog blog) throws LoginException {
//        System.out.println(blog.getUser());
//        Optional<User> user =  userRepository.findById(blog.getUserId());

//        System.out.println(user.get().getLoggedIn());

        blogRepository.save(blog);
    }



    @Override
    public void updateBlog(Blog updateBlog) throws EntityNotFound, LoginException {

//        Long id = updateBlog.getId();

//        updateBlog.setId();

//       Blog updatedBlog = new Blog();
//       updatedBlog.setId(id);jj
//       updatedBlog.setTitle(updateBlog.getTitle());
//       updatedBlog.setBody(updateBlog.getBody());
       blogRepository.save(updateBlog);
    }
    @Override
    public void deleteBlog(Long id) throws EntityNotFound, LoginException {

        Optional<Blog> blog =  blogRepository.findById(id);
//        User user =  userRepository.findById(blog.get().getUser().getId()).get();

        blogRepository.deleteById(id);
    }




}
