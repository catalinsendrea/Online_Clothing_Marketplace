package ro.marketplacebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.marketplacebackend.entities.Produse;

import java.util.List;


public interface ProduseRepository extends JpaRepository<Produse,Integer> {

    List<Produse> findByScor(Integer scor);
}
