# Blog-App
Project - Blog Application(Monolithic Architecture):
- The Rest APIs are built with the Java-Spring boot following MVC structure throughout the project.
- User can login and register with fully secured way using Spring Security.
- On login with registered email and password, the user will get a JWT(Json Web Token) which will be used in all other APIs, this is achieved with the help of spring security.
- For password security BcryptPasswordEncoder is used.
- For Authorisation JWT Authentication is done with User details encrypted with the token.
- After login, users can create blogs by providing json data in the body and JWT token in header, as a key-value pair (Authorisation : Bearer <token>).
- User can perform all the CRUD operations on Blogs.
- User can mark their blog as published.
- Error handling is done using Rest entity error handler with Custom Exception like EmailAlreadyExistsException.
- Whole data is stored on the local server of MySQL and managed using MySQL workbench.
- JPA(Java Persistence API) is used to map classes into the database and Hibernate as ORM(Object Relationship Mapping) .
- RabbitMQ Message broker is used to save all the logs of request comes in with the required details in a queue.
- Another Spring boot application is created as log manager which will listen to the queue in RabbitMQ.
- Log manager application will save all the logs in Database.

## Tech Stack

**Frontend:** React, Redux, TailwindCSS

**Backend:** SpringBoot, Java, REST Api

**DataBase:** MySql
