To start all service, we need:
- spring framework setup
- java version 21
- maven to manage dependencies

How to start:
- cd to every service folders (account-service, conversation-service, eureka-server, message-service, react-service)
- run: mvn clean package : to build and package service into jar file. Then you can deploy them on containers. Be careful with application*.yaml file for configurations
- Or after run mvn clean package, you can run : mvn spring-boot:run to run it on local. Be careful with application*.yaml files for configurations, too.
- Always start euraka server first, then services
