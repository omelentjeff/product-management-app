package com.omelentjeff.solteq.service;

import com.omelentjeff.solteq.dto.ProductDTO;
import com.omelentjeff.solteq.entity.Product;
import com.omelentjeff.solteq.mapper.ProductMapper;
import com.omelentjeff.solteq.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Cacheable(value = "products", key = "'page:' + #pageable.pageNumber + ',size:' + #pageable.pageSize + ',sort:' + #pageable.sort.toString()")
    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        Page<Product> productPage = productRepository.findAll(pageable);
        List<ProductDTO> productDTOS = productPage.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(productDTOS, pageable, productPage.getTotalElements());
    }
}
