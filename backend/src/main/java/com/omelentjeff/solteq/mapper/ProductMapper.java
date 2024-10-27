package com.omelentjeff.solteq.mapper;

import com.omelentjeff.solteq.dto.NutritionalFactDTO;
import com.omelentjeff.solteq.dto.ProductDTO;
import com.omelentjeff.solteq.entity.NutritionalFact;
import com.omelentjeff.solteq.entity.Product;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

/**
 * Mapper interface for converting between {@link Product} entities and {@link ProductDTO} data transfer objects,
 * as well as between {@link NutritionalFact} entities and {@link NutritionalFactDTO} data transfer objects.
 *
 * This interface uses MapStruct to generate implementations for mapping methods.
 */
@Mapper(componentModel = "spring")
public interface ProductMapper {

    /**
     * Converts a {@link Product} entity to a {@link ProductDTO}.
     *
     * @param product the Product entity to convert
     * @return the converted ProductDTO
     */
    ProductDTO toDTO(Product product);

    /**
     * Converts a {@link ProductDTO} to a {@link Product} entity.
     *
     * @param productDTO the ProductDTO to convert
     * @return the converted Product entity
     */
    Product toEntity(ProductDTO productDTO);

    /**
     * Converts a {@link NutritionalFact} entity to a {@link NutritionalFactDTO}.
     *
     * @param nutritionalFact the NutritionalFact entity to convert
     * @return the converted NutritionalFactDTO
     */
    NutritionalFactDTO toDTO(NutritionalFact nutritionalFact);

    /**
     * Converts a {@link NutritionalFactDTO} to a {@link NutritionalFact} entity.
     *
     * @param dto the NutritionalFactDTO to convert
     * @return the converted NutritionalFact entity
     */
    NutritionalFact toEntity(NutritionalFactDTO dto);

    /**
     * Updates an existing {@link Product} entity with values from the provided {@link ProductDTO}.
     *
     * This method ignores null values in the DTO during the update process.
     *
     * @param dto the ProductDTO containing the new values
     * @param entity the Product entity to update
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProductFromDto(ProductDTO dto, @MappingTarget Product entity);
}
