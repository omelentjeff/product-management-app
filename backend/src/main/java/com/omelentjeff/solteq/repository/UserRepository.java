package com.omelentjeff.solteq.repository;

import com.omelentjeff.solteq.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for managing {@link UserEntity} entities.
 *
 * This interface extends JpaRepository, providing basic CRUD operations
 * and additional query methods for user entities.
 */
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    /**
     * Retrieves a user entity by its username.
     *
     * @param username the username of the user to retrieve
     * @return an Optional containing the found {@link UserEntity}, or empty if no user found
     */
    Optional<UserEntity> findByUsername(String username);
}
