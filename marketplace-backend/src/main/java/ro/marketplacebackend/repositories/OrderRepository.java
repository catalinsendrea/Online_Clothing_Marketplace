package ro.marketplacebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.marketplacebackend.entities.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {

    Order findTopByOrderByIdDesc();
    List<Order> findByEmail(String email);
}