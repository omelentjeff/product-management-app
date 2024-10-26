package com.omelentjeff.solteq.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class NutritionalFact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer calories;
    private Integer kilojoules;
    private BigDecimal fat;
    private BigDecimal carbohydrates;
    private BigDecimal sugars;
    private BigDecimal polyols;
    private BigDecimal fibers;
    private BigDecimal protein;
    private BigDecimal sodium;
    private BigDecimal vitamin_c;
    private BigDecimal calcium;
}
