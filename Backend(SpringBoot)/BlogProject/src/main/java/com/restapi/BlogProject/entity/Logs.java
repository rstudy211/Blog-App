package com.restapi.BlogProject.entity;

import lombok.*;

import javax.persistence.*;
@Getter
@ToString
@AllArgsConstructor
@Setter
@Entity
@NoArgsConstructor
public class Logs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id", nullable = false)
    private Long logId;

    private String request;
    private String user;

    private String response;
    private String operation;

    private String type;
    private String timestamp;


    public Logs (LogsDto log){
        this.user = log.getUser();
        this.request = log.getRequest() == null ? null:log.getRequest().toString();
        this.response = log.getResponse()==null ? null:log.getResponse().toString();
        this.operation = log.getOperation();
        this.type = log.getType().equals("RRL") ? "Request-Response-Log":"Exception-Log";
        this.timestamp = log.getTimestamp();
    }
}
