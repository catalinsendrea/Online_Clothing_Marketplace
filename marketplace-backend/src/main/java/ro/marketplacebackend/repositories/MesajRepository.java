package ro.marketplacebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.marketplacebackend.entities.Mesaj;;import java.util.List;

public interface MesajRepository extends JpaRepository<Mesaj,Integer> {

    List<Mesaj> findByDestinatar(String destinatar);
}
