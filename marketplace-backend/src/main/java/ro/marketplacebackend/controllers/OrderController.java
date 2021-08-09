package ro.marketplacebackend.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.marketplacebackend.dtos.OrderDTO;
import ro.marketplacebackend.services.OrderService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/comanda")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @GetMapping()
    public ResponseEntity<List<OrderDTO>> getOrders() {
        List<OrderDTO> dtos = orderService.findOrders();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(value = "/{email}")
    public ResponseEntity<List<OrderDTO>> getOrders(@PathVariable("email") String email) {
        List<OrderDTO> dtos = orderService.findOrdersByEmail(email);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Integer> insertOrder(@Valid @RequestBody OrderDTO orderDTO) throws Exception {
        Integer orderId=orderService.insertOrder(orderDTO);
        return new ResponseEntity<>(orderId, HttpStatus.CREATED);
    }
}
