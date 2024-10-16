package com.omelentjeff.solteq.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Long id;
    private String manufacturer;
    private String name;
    private BigDecimal weight;
    private Integer caloriesPer100g;
    private Integer kilojoulesPer100g;
    private String photoUrl;
    private String gtin;
}
