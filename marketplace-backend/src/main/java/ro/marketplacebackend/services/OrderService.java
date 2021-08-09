package ro.marketplacebackend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.marketplacebackend.dtos.OrderDTO;
import ro.marketplacebackend.dtos.builders.OrderBuilder;
import ro.marketplacebackend.entities.Order;
import ro.marketplacebackend.repositories.OrderRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrderService.class);
    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    public List<OrderDTO> findOrders() {
        List<Order> ordersList = orderRepository.findAll();
        return ordersList.stream()
                .map(OrderBuilder::toDTO)
                .collect(Collectors.toList());
    }

    public List<OrderDTO> findOrdersByEmail(String email) {
        List<Order> ordersList = orderRepository.findByEmail(email);
        return ordersList.stream()
                .map(OrderBuilder::toDTO)
                .collect(Collectors.toList());
    }

    public Integer insertOrder(OrderDTO orderDTO) throws Exception {
        Order order = OrderBuilder.toEntity(orderDTO);
        orderRepository.save(order);
        EmailService.sendEmailOrderConfirmation(order.getEmail());
        EmailService.sendEmailSuggestsProduct(order.getEmail());
        LOGGER.debug("Order with id {} was inserted in db", order.getId());
        return order.getId();
    }
}
