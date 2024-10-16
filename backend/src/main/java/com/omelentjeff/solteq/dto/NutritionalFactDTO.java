package com.omelentjeff.solteq.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NutritionalFactDTO {

    private Integer caloriesPer100g;
    private Integer kilojoulesPer100g;
    private BigDecimal fat;
    private BigDecimal carbohydrates;
    private BigDecimal sugars;
    private BigDecimal polyols;
    private BigDecimal fibers;
    private BigDecimal protein;
    private BigDecimal sodium;
    private BigDecimal vitaminC;
    private BigDecimal calcium;
}
