package com.restapi.BlogProject.entity;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class JwtReq {
    private String username;
    private String password;

}
