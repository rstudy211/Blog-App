package com.restapi.BlogProject.services;

import com.restapi.BlogProject.entity.LogsDto;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQConsumer {
    @Autowired
    private LogService logService;
//    @RabbitListener(queues = "${Rajeev.rabbitmq.queue}")
//    public void receiveMessage(LogsDto logsDto){
//        logService.saveLog(logsDto);
//        System.out.println(logsDto.toString());
//    }
}
