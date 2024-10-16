package com.omelentjeff.solteq.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Integer id;
    private String manufacturer;
    private String name;
    private BigDecimal weight;
    private int caloriesPer100g;
    private int kilojoulesPer100g;
    private String photoUrl;
    private String gtin;
}
