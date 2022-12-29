package com.restapi.BlogProject.services;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQMessageListener implements MessageListener {
    @Autowired
    private RabbitMQSender rabbitMQSender;

    @Override
    public void onMessage(Message message) {
//        rabbitMQSender.send(message.toString());

        System.out.println(new String(message.getBody()));
    }
}
