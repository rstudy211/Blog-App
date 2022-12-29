package com.restapi.BlogProject.entity;

import lombok.*;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "user_table",uniqueConstraints = @UniqueConstraint(name="username",columnNames = "username"))
public class User {
    @Id
    @SequenceGenerator(name = "user_seq",sequenceName = "user_seq",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "user_seq")
    @Column(name = "user_id", nullable = false)
    private Long id;
    @Column(name = "username",nullable = false)
    private String username;
    @Column(name = "email",nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private Boolean loggedIn=false;



}
