package com.omelentjeff.solteq.dto;

import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "Field can't be empty")
    private Integer calories;
    @NotNull(message = "Field can't be empty")
    private Integer kilojoules;
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
