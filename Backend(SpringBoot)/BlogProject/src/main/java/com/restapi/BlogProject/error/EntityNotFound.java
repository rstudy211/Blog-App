package com.restapi.BlogProject.error;

public class EntityNotFound extends Exception{
    public EntityNotFound() {
        super();
    }

    public EntityNotFound(String message) {
        super(message);
    }

    public EntityNotFound(String message, Throwable cause) {
        super(message, cause);
    }

    public EntityNotFound(Throwable cause) {
        super(cause);
    }

    protected EntityNotFound(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
