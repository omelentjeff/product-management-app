package com.omelentjeff.solteq.repository;

import com.omelentjeff.solteq.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing {@link Product} entities.
 *
 * This interface extends JpaRepository, providing basic CRUD operations
 * and additional query methods for products based on GTIN and name.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Retrieves a paginated list of products whose GTIN contains the specified string,
     * ignoring case.
     *
     * @param gtin the string to search for in the GTIN field
     * @param pageable pagination information
     * @return a Page of {@link Product} entities matching the search criteria
     */
    Page<Product> findByGtinContainingIgnoreCase(String gtin, Pageable pageable);

    /**
     * Retrieves a paginated list of products whose name contains the specified string,
     * ignoring case.
     *
     * @param name the string to search for in the name field
     * @param pageable pagination information
     * @return a Page of {@link Product} entities matching the search criteria
     */
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

}
