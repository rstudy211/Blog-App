package com.restapi.BlogProject.Config;

//import com.restapi.BlogProject.services.RabbitMQMessageListener;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.MessageListenerContainer;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig  {

    @Value("${Rajeev.rabbitmq.queue}")
    private String queueName;

    @Value("${Rajeev.rabbitmq.exchange}")
    private String exchange;
    @Value("${Rajeev.rabbitmq.routingKey}")
    private String routingKey;

    @Bean
    Queue queue(){
        return new Queue(queueName,false);
    }
    @Bean
    DirectExchange exchange(){
        return new DirectExchange(exchange);
    }

    @Bean
    Binding binding(Queue queue,DirectExchange exchange){
        return BindingBuilder.bind(queue).to(exchange).with(routingKey);
    }
    @Bean
    public MessageConverter jsonMessageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate rabbitTemplates(ConnectionFactory connectionFactory){
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }
//    @Bean
//    MessageListenerContainer messageListenerContainer(ConnectionFactory connectionFactory){
//        SimpleMessageListenerContainer simpleMessageListenerContainer = new SimpleMessageListenerContainer();
//        simpleMessageListenerContainer.setConnectionFactory(connectionFactory);
//        simpleMessageListenerContainer.setQueues(queue());
//        simpleMessageListenerContainer.setMessageListener(new RabbitMQMessageListener());
//        return simpleMessageListenerContainer;
//    }
}
