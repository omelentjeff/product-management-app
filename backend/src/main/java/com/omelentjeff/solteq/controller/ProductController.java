package com.omelentjeff.solteq.controller;

import com.omelentjeff.solteq.dto.ProductDTO;
import com.omelentjeff.solteq.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping({"/", ""})
    public ResponseEntity<Page<ProductDTO>> getAllProducts(
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<ProductDTO> products = productService.getAllProducts(pageable);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO tempProduct = productService.getProductById(id);
        return ResponseEntity.ok(tempProduct);
    }

    // Accept multipart/form-data (with image upload)
    @PostMapping(value = "", consumes = {"application/json", "multipart/form-data"})
    public ResponseEntity<ProductDTO> save(@Valid @RequestPart(value = "product", required = false) ProductDTO productDTO,
                                                           @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        ProductDTO savedProduct = productService.save(productDTO, file);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedProduct.getId())
                .toUri();

        return ResponseEntity.created(location).body(savedProduct);
    }

    @PatchMapping(value = "/{id}", consumes = "application/json")
    public ResponseEntity<ProductDTO> updateProductByIdWithoutImage(@PathVariable Long id,
                                                                    @Valid @RequestBody ProductDTO productDTO) throws IOException {
        ProductDTO updatedProduct = productService.updateProduct(id, productDTO, null);
        return ResponseEntity.ok(updatedProduct);
    }

    @PatchMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<ProductDTO> updateProductByIdWithImage(@PathVariable Long id,
                                                                 @Valid @RequestPart(value = "product", required = false) ProductDTO productDTO,
                                                                 @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        ProductDTO updatedProduct = productService.updateProduct(id, productDTO, file);
        return ResponseEntity.ok(updatedProduct);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ProductDTO>> searchProducts (
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String manufacturer,
            @RequestParam(required = false) String gtin,
            @PageableDefault(size = 10, sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<ProductDTO> products = productService.searchProducts(name, manufacturer, gtin, pageable);

        if (products.hasContent()) {
            return ResponseEntity.ok(products);
        }

        return ResponseEntity.noContent().build();
    }
}
