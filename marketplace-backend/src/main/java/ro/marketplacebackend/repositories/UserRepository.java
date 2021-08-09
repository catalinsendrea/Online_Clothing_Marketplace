package ro.marketplacebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.marketplacebackend.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
