package com.restapi.BlogProject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "blog_sequence")
    @SequenceGenerator(name = "blog_sequence",sequenceName = "blog_sequence",allocationSize = 1)
    @Column(name = "blog_id", nullable = false)
    private Long id;

    @NotNull
    private String title;
    @NotNull
    private String body;
    @NotNull
    @Column(nullable = false)
    private Boolean published=false;
    @ManyToOne
//    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;



}