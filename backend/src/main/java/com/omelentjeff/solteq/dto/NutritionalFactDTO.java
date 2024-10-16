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
    private BigDecimal protein;
    private BigDecimal carbohydrates;
    private BigDecimal fat;
    private BigDecimal sugar;
    private BigDecimal fiber;
    private BigDecimal sodium;
}
