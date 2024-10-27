package com.omelentjeff.solteq.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Data Transfer Object (DTO) representing a product.
 * This class is used to transfer product information between different layers of the application.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Long id;
    @NotBlank(message = "Field can't be empty")
    private String manufacturer;
    @NotBlank(message = "Field can't be empty")
    private String name;
    @NotNull(message = "Field can't be empty")
    private BigDecimal weight;
    @Valid
    private NutritionalFactDTO nutritionalFact;
    private String photoUrl;
    @NotBlank(message = "Field can't be empty")
    private String gtin;
}
