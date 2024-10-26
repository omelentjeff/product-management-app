package com.omelentjeff.solteq.service;

import com.omelentjeff.solteq.dto.ProductDTO;
import com.omelentjeff.solteq.entity.Product;
import com.omelentjeff.solteq.exception.ProductNotFoundException;
import com.omelentjeff.solteq.mapper.ProductMapper;
import com.omelentjeff.solteq.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private static final String IMAGE_DIR = "/uploads/images/"; // Use an absolute path


    @Cacheable(value = "products", key = "'page:' + #pageable.pageNumber + ',size:' + #pageable.pageSize + ',sort:' + #pageable.sort.toString()")
    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        Page<Product> productPage = productRepository.findAll(pageable);
        List<ProductDTO> productDTOS = productPage.stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(productDTOS, pageable, productPage.getTotalElements());
    }

    public ProductDTO getProductById(Long id) {
        Product tempProduct = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product with id: " + id + " not found"));
        return productMapper.toDTO(tempProduct);
    }

    @Transactional
    public ProductDTO save(ProductDTO productDTO, MultipartFile file) throws IOException {

        Product tempProduct;

        if (productDTO == null) {
            tempProduct = new Product();
        } else {
            tempProduct = productMapper.toEntity(productDTO);
        }

        if (file != null && !file.isEmpty()) {
            String imagePath = saveImage(file);
            tempProduct.setPhotoUrl(imagePath);
        }

        Product savedProduct = productRepository.save(tempProduct);
        return productMapper.toDTO(savedProduct);
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductDTO productDTO, MultipartFile file) throws IOException {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with id: " + id + " not found"));

        productMapper.updateProductFromDto(productDTO, existingProduct);

        // If there's a new image, update the photoUrl
        if (file != null && !file.isEmpty()) {
            String imagePath = saveImage(file);
            existingProduct.setPhotoUrl(imagePath);
        }

        productRepository.save(existingProduct);
        return productMapper.toDTO(existingProduct);
    }

    public Page<ProductDTO> searchProducts(String name, String manufacturer, String gtin, Pageable pageable) {
        Page<Product> productPage = productRepository.findByNameContainingIgnoreCaseOrManufacturerContainingIgnoreCaseOrGtinIgnoreCase(name, manufacturer, gtin, pageable);

        List<ProductDTO> productDTOS = productPage.stream()
                .map(productMapper::toDTO)
                .toList();

        return new PageImpl<>(productDTOS, pageable, productPage.getTotalElements());
    }

    public String saveImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return null;
        }

        // Ensure directory exists
        File dir = new File(IMAGE_DIR);
        if (!dir.exists()) {
            if (!dir.mkdirs()) {
                throw new IOException("Failed to create directories for image upload.");
            }
        }

        // Save the file to the directory
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path path = Paths.get(IMAGE_DIR + fileName);
        Files.copy(file.getInputStream(), path);

        // Return relative URL for the frontend
        return "uploads/images/" + fileName; // Correct path to match resource handler
    }

    @Transactional
    public void deleteProductById(long theId) {
        Product product = productRepository.findById(theId)
                .orElseThrow(() -> new ProductNotFoundException("Product with id: " + theId + " not found"));
        productRepository.delete(product);
    }
}
