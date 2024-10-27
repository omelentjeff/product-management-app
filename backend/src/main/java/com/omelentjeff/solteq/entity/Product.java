package com.omelentjeff.solteq.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Entity class representing a product in the system.
 * This class is mapped to a database table and includes fields
 * that describe the product's attributes and its associated
 * nutritional facts.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String manufacturer;

    private String name;

    private BigDecimal weight;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "nutritional_fact_id", referencedColumnName = "id")
    private NutritionalFact nutritionalFact;

    private String photoUrl;

    private String gtin;

}
