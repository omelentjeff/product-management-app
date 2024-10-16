package com.omelentjeff.solteq.mapper;

import com.omelentjeff.solteq.dto.NutritionalFactDTO;
import com.omelentjeff.solteq.dto.ProductDTO;
import com.omelentjeff.solteq.entity.NutritionalFact;
import com.omelentjeff.solteq.entity.Product;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductDTO toDTO(Product product);

    Product toEntity(ProductDTO productDTO);

    NutritionalFactDTO toDTO(NutritionalFact nutritionalFact);

    NutritionalFact toEntity(NutritionalFactDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProductFromDto(ProductDTO dto, @MappingTarget Product entity);
}
