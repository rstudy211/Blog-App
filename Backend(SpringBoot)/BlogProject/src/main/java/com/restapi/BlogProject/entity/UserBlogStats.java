package com.restapi.BlogProject.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserBlogStats {
    private long totalBlogs;
    private long userPublishedBlogs;
    private long userUnpublishedBlogs;


}
