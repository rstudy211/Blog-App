package com.restapi.BlogProject.repository;

import com.restapi.BlogProject.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    Page<Blog> findAllByUserId(Long id,Pageable p);
    Page<Blog> findAllByPublishedTrue(Pageable p);
    List<Blog> findAllByPublishedTrue();
    int countAllByPublishedTrue();
    List<Blog> findAllByPublishedFalse();



    @Query(
            value = "SELECT COUNT(blog_id) FROM blog WHERE user_id =:userId AND published =true",
            nativeQuery = true)
    long countUserPublishedBlogs(@Param("userId") Long userId);
    @Query(
            value = "SELECT COUNT(blog_id) FROM blog WHERE user_id = :userId AND published=false",
            nativeQuery = true)
    Integer countUserUnpublishedBlogs(@Param("userId")Long userId);

    @Query(
            value = "SELECT * FROM blog where published=true and (title  like %:searchString% or body like %:searchString%)",
            nativeQuery = true)
    Page<Blog> findBySearchPublishedTrue(@Param("searchString") String searchString,Pageable p);

    @Query(
            value = "SELECT * FROM blog where user_id=:userId and (title  like %:searchString% or body like %:searchString%)",
            nativeQuery = true)
    Page<Blog> searchInUser(@Param("userId") Long userId, @Param("searchString") String searchString,Pageable p);
    @Query(
            value = "SELECT COUNT(blog_id) FROM blog where user_id=:userId and published=true and (title  like %:searchString% or body like %:searchString%)",
            nativeQuery = true)
    long countUserPublishedSearchBlogs(Long userId, String searchString);
    @Query(
            value = "SELECT COUNT(blog_id) FROM blog where user_id=:userId and published=false and (title  like %:searchString% or body like %:searchString%)",
            nativeQuery = true)
    long countUserUnpublishedSearchBlogs(Long userId, String searchString);
@Query(
        value = "Select Count(blog_id) From blog where published=true and (title like %:searchString% or body  like %:searchString%)",
        nativeQuery = true)
    long countAllSearchPublishedBlogs(String searchString);
}
