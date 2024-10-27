package com.omelentjeff.solteq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The entry point of the Solteq application.
 *
 * This class is marked with the {@link SpringBootApplication} annotation,
 * which enables auto-configuration, component scanning, and configuration
 * properties support in a Spring Boot application. The main method serves
 * as the starting point for the Spring application.
 */
@SpringBootApplication
public class SolteqApplication {

	/**
	 * The main method that starts the Spring Boot application.
	 *
	 * @param args command-line arguments passed to the application upon startup
	 */
	public static void main(String[] args) {
		SpringApplication.run(SolteqApplication.class, args);
	}

}
