package com.example.react;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ReactServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReactServiceApplication.class, args);
    }
}