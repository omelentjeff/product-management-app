package com.omelentjeff.solteq.controller;

import com.omelentjeff.solteq.dto.ProductDTO;
import com.omelentjeff.solteq.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;

/**
 * REST controller for managing products.
 * Provides endpoints for creating, retrieving, updating, searching, and deleting products.
 */
@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /**
     * Retrieves all products with pagination.
     *
     * @param pageable the pagination and sorting information
     * @return a paginated list of products
     */
    @GetMapping({"/", ""})
    public ResponseEntity<Page<ProductDTO>> getAllProducts(
            @PageableDefault(size = 5, sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<ProductDTO> products = productService.getAllProducts(pageable);
        return ResponseEntity.ok(products);
    }

    /**
     * Retrieves a product by its ID.
     *
     * @param id the ID of the product
     * @return the requested product
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO tempProduct = productService.getProductById(id);
        return ResponseEntity.ok(tempProduct);
    }

    /**
     * Creates a new product with an optional image.
     *
     * @param productDTO the product information
     * @param file the image file (optional)
     * @return the created product
     * @throws IOException if an error occurs while saving the image
     */
    @PostMapping(value = "", consumes = {"application/json", "multipart/form-data"})
    public ResponseEntity<ProductDTO> save(@Valid @RequestPart(value = "product", required = true) ProductDTO productDTO,
                                                           @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        System.out.println("SERVER RECEIVED PRODUCT: " + productDTO);
        ProductDTO savedProduct = productService.save(productDTO, file);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedProduct.getId())
                .toUri();

        return ResponseEntity.created(location).body(savedProduct);
    }

    /**
     * Updates a product by its ID without changing its image.
     *
     * @param id the ID of the product
     * @param productDTO the updated product information
     * @return the updated product
     * @throws IOException if an error occurs while processing the request
     */
    @PatchMapping(value = "/{id}", consumes = "application/json")
    public ResponseEntity<ProductDTO> updateProductByIdWithoutImage(@PathVariable Long id,
                                                                    @Valid @RequestBody ProductDTO productDTO) throws IOException {
        ProductDTO updatedProduct = productService.updateProduct(id, productDTO, null);
        return ResponseEntity.ok(updatedProduct);
    }

    /**
     * Updates a product by its ID with an optional new image.
     *
     * @param id the ID of the product
     * @param productDTO the updated product information (optional)
     * @param file the new image file (optional)
     * @return the updated product
     * @throws IOException if an error occurs while processing the request
     */
    @PatchMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<ProductDTO> updateProductByIdWithImage(@PathVariable Long id,
                                                                 @Valid @RequestPart(value = "product", required = false) ProductDTO productDTO,
                                                                 @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        ProductDTO updatedProduct = productService.updateProduct(id, productDTO, file);
        return ResponseEntity.ok(updatedProduct);
    }

    /**
     * Searches for products by a query string.
     *
     * @param query the search query
     * @param pageable the pagination and sorting information
     * @return a paginated list of matching products, or a no content response if none found
     */
    @GetMapping("/search")
    public ResponseEntity<Page<ProductDTO>> searchProducts (
            @RequestParam(required = false) String query,
            @PageableDefault(size = 10, sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<ProductDTO> products = productService.searchProducts(query, pageable);

        if (products.hasContent()) {
            return ResponseEntity.ok(products);
        }

        return ResponseEntity.noContent().build();
    }

    /**
     * Deletes a product by its ID.
     *
     * @param id the ID of the product to delete
     * @return a response indicating the deletion was successful
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable long id) {
        productService.deleteProductById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
