package com.restapi.BlogProject.repository;

import com.restapi.BlogProject.entity.Blog;
import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link com.restapi.BlogProject.entity.Blog} entity
 */
@Data
public class BlogDto implements Serializable {
    private final String title;
    private final Long id;
    private final String body;
    private final Boolean published ;
    private final Long userId;
    private final String username;

    public BlogDto(Blog blog){
        this.id = blog.getId();
        this.title = blog.getTitle();
        this.body = blog.getBody();
        this.published = blog.getPublished();
        this.userId = blog.getUser().getId();
        this.username = blog.getUser().getUsername();
    }
}