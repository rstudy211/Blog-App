package com.restapi.BlogProject.services;

import com.restapi.BlogProject.entity.Logs;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQSender {
    @Autowired
    private AmqpTemplate rabbitTemplate;

    @Value("${Rajeev.rabbitmq.exchange}")
    private String exchange;
    @Value("${Rajeev.rabbitmq.routingKey}")
    private String routingKey;

    public void send(String message){
        rabbitTemplate.convertAndSend(exchange,routingKey,message);
    }
    public void send(Object message){
        rabbitTemplate.convertAndSend(exchange,routingKey,message);
    }

}
