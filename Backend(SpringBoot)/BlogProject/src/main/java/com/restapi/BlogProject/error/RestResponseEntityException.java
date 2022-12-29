package com.restapi.BlogProject.error;

import com.restapi.BlogProject.entity.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
@ControllerAdvice
@ResponseStatus
public class RestResponseEntityException extends ResponseEntityExceptionHandler {

    @ExceptionHandler(EmailException.class)
    public ResponseEntity<ErrorMessage> EmailException(Exception e,WebRequest request){
        ErrorMessage errorMessage = ErrorMessage.builder()
                .message(e.getMessage())
                .status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }
    @ExceptionHandler(EntityNotFound.class)
    public ResponseEntity<ErrorMessage> BlogNotFound(Exception e, WebRequest request){
        ErrorMessage errorMessage = ErrorMessage.builder()
                .message(e.getMessage())
                .status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }
//    @ExceptionHandler(EntityNotFound.class)
//    public ResponseEntity<ErrorMessage> UserNotFound(Exception e, WebRequest request){
//        ErrorMessage errorMessage = ErrorMessage.builder()
//                .message(e.getMessage())
//                .status(HttpStatus.NOT_FOUND).build();
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
//    }
 @ExceptionHandler(LoginException.class)
    public ResponseEntity<ErrorMessage> LoginException(Exception e, WebRequest request){
        ErrorMessage errorMessage = ErrorMessage.builder()
                .message(e.getMessage())
                .status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorMessage> IllegalException(Exception e, WebRequest request){
        ErrorMessage errorMessage = ErrorMessage.builder()
                .message(e.getMessage())
                .status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
    }

}
