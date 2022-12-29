package com.restapi.BlogProject.controller;

import com.restapi.BlogProject.entity.Blog;
import com.restapi.BlogProject.entity.UserBlogStats;
import com.restapi.BlogProject.error.EntityNotFound;
import com.restapi.BlogProject.error.LoginException;
import com.restapi.BlogProject.repository.BlogDto;
import com.restapi.BlogProject.repository.BlogRepository;
import com.restapi.BlogProject.services.BlogServices;
import com.restapi.BlogProject.services.RabbitMQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BlogController {
    @Autowired
    private BlogServices blogServices;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private RabbitMQSender rabbitMQSender;

    @GetMapping("/home")
    public String Home(){
        return "this is blog";
    }
    @GetMapping(value={"/publishedBlogs/{searchString}","/publishedBlogs/"})

    public List<BlogDto> allBlogs(
            @PathVariable(required = false) String searchString,@RequestParam(value = "pageNumber",defaultValue = "0",required = false)int pageNumber,@RequestParam(value = "pageSize",defaultValue = "6",required = false)int pageSize){
        System.out.println("in published blogs");
        if (searchString==null){
            System.out.println("/published ");
            return this.blogServices.getAllBlogs("",pageNumber,pageSize);
        }
        return this.blogServices.getAllBlogs(searchString,pageNumber,pageSize);
    }

        @GetMapping(value={"user/blogs/{userId}/","user/blogs/{userId}/{searchString}"})
    public List<BlogDto> allBlogsWithUserId(@PathVariable Long userId,@PathVariable(required = false) String searchString,@RequestParam(value = "pageNumber",defaultValue = "0",required = false)int pageNumber,@RequestParam(value = "pageSize",defaultValue = "6",required = false)int pageSize){
        if(searchString == null){
            return this.blogServices.allBlogsOfUser(userId,"" ,pageNumber,pageSize);
        }
        return this.blogServices.allBlogsOfUser(userId,searchString,pageNumber,pageSize);
    }
        @GetMapping("/blogs/{blogId}")
    public BlogDto getBlog(@PathVariable Long blogId) throws EntityNotFound, LoginException {
        System.out.println(blogId);
        return this.blogServices.getBlog(blogId);
    }
    @GetMapping(value={"userBlogStats/{userId}/{searchString}","userBlogStats/{userId}"})
    public UserBlogStats userBlogStats(@PathVariable Long userId,@PathVariable(required = false) String searchString){
        if(searchString == null){
            return this.blogServices.userBlogStats(userId,"");
        }
        return this.blogServices.userBlogStats(userId,searchString);
    }

//    @GetMapping("search/{string}")
//    public UserBlogStats userSearchFilter(@PathVariable String userId){
//        return this.blogServices.userBlogStats(userId);
//    }
    @PostMapping("/publish/blog/{blogId}")
    public String publishBlog(@PathVariable Long blogId ){
        System.out.println("publish rout");
        this.blogServices.publishBlog(blogId);
        return "Blog Published Successfully";
    }
    @PostMapping("/addBlog")
    public String addBlog(@RequestBody Blog newBlog) throws EntityNotFound, LoginException {

        this.blogServices.addBlog(newBlog);
        return "blog Added Succesfully";
    }

    @PutMapping("/updateBlog")
    public String updateBlog(@RequestBody Blog blog) throws EntityNotFound, LoginException {
        this.blogServices.updateBlog(blog);
        return "Blog Updated Successfully";

    }
    @DeleteMapping("/deleteBlog/{id}")
    public String deletedBlog(@PathVariable Long id) throws EntityNotFound, LoginException {
        System.out.println(id);
        this.blogServices.deleteBlog(id);
        return "Blog Deleted Successfully";
    }


}
