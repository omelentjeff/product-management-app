package com.omelentjeff.solteq.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web configuration class that implements Spring MVC configurations.
 * This class is responsible for configuring CORS settings and resource
 * handling for serving static resources like images.
 */
@Configuration
@EnableWebSecurity
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configures CORS (Cross-Origin Resource Sharing) mappings.
     * This method allows specified origins and methods to access the resources.
     *
     * @param registry the CorsRegistry used to configure CORS settings
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:8080")
                .allowedMethods("GET", "POST", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    /**
     * Configures resource handlers for serving static resources.
     * This method sets up a resource handler for serving images from
     * the uploads directory.
     *
     * @param registry the ResourceHandlerRegistry used to configure resource handling
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve images from the uploads directory
        registry.addResourceHandler("/uploads/images/**")
                .addResourceLocations("file:/uploads/images/");
    }


}
