package com.restapi.BlogProject.entity;

import lombok.*;
import org.springframework.http.HttpStatus;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ErrorMessage {
    private HttpStatus status;
    private String message;

}
