package com.example.demo;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

@ComponentScan({"com.example.demo", "com.baeldung.openapi.api"})
@SpringBootApplication
@PropertySource("file:${user.dir}/.env")
public class DemoApplication {

	public static void main(String[] args) {
		// Load .env file
		Dotenv dotenv = Dotenv.configure()
				.directory(System.getProperty("user.dir"))
				.load();

		// Set system properties for Spring to pick up
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(DemoApplication.class, args);
	}
}

//package com.example.demo;
//
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.context.annotation.PropertySource;
//
//@ComponentScan({"com.example.demo", "com.baeldung.openapi.api"})
//@SpringBootApplication
//@PropertySource("file:${user.dir}/.env")
//public class DemoApplication {
//
//	public static void main(String[] args) {
//		SpringApplication.run(DemoApplication.class, args);
//	}
//
//}
