# BlogConstructor
## About
Simple app for simple blog. Work in progress.
## Build jar file:  
`mvn package`  
## Run jar file:  
`java -jar "target/BlogConstructor-1.0-SNAPSHOT.jar"`  
If everything correct BlogConstructor start on port 8080 with in-memory database. **WARNING: all data will be lost after restart!**  
To save data you must set database connection. Example command to start BlogConstructor with database connection to MySQL:  
`java -jar "target/BlogConstructor-1.0-SNAPSHOT.jar" --spring.datasource.url="jdbc:mysql://localhost:3306/blog_constructor" --spring.datasource.username="admin" --spring.datasource.password="password"`  
## Jar command line parameters
### spring.datasource.url
Database url, example value: "jdbc:mysql://localhost:3306/blog_constructor"
### spring.datasource.username
Database username, example value: "admin"
### spring.datasource.password
Database password, example value: "password"
### server.port
Port to use. Default value - 8080 for release (default) build, 6101 - for debug build.