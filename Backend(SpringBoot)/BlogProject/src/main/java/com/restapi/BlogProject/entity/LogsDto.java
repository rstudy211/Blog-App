package com.restapi.BlogProject.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * A DTO for the {@link Logs} entity
 */
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class LogsDto  {
    private String user;
    private Object request;
    private Object response;
    private String operation;
    private String type;
    @Builder.Default
    private String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());


}