package ro.marketplacebackend.dtos.builders;

import ro.marketplacebackend.dtos.OrderDTO;
import ro.marketplacebackend.entities.Order;

public class OrderBuilder {

    public OrderBuilder(){

    }

    public static OrderDTO toDTO(Order order){
        return new OrderDTO(order.getId(), order.getId_cumparator(), order.getEmail(), order.getLivrator(), order.getMentiuni(), order.getModalitate_plata(), order.getSuma_plata(), order.getId_produse_comandate());
    }

    public static Order toEntity(OrderDTO orderDTO){
        return new Order(orderDTO.getId_cumparator(), orderDTO.getEmail(), orderDTO.getLivrator(), orderDTO.getMentiuni(), orderDTO.getModalitate_plata(), orderDTO.getSuma_plata(), orderDTO.getId_produse_comandate());
    }
}
