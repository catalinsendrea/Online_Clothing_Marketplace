package ro.marketplacebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.marketplacebackend.entities.ERole;
import ro.marketplacebackend.entities.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(ERole name);
}
