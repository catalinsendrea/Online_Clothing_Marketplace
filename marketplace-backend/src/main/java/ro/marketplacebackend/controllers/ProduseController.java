package ro.marketplacebackend.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.marketplacebackend.dtos.ProduseDTO;
import ro.marketplacebackend.services.ProduseService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/produse")
public class ProduseController {

    private final ProduseService produseService;

    @Autowired
    public ProduseController(ProduseService produseService){
        this.produseService = produseService;
    }

    @GetMapping()
    public ResponseEntity<List<ProduseDTO>> getProduse() {
        List<ProduseDTO> dtos = produseService.findProducts();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }


    @GetMapping(value = "/{id}")
    public ResponseEntity<ProduseDTO> getProductsById(@PathVariable("id") Integer id) {
        ProduseDTO dto = produseService.findProductById(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Integer id){
        produseService.deleteProduct(id);
    }

    @PostMapping()
    public ResponseEntity<Integer> insertProduct(@Valid @RequestBody ProduseDTO produsDTO) {
        Integer produsId= produseService.insertProduct(produsDTO);
        return new ResponseEntity<>(produsId, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Integer> updateProduct(@PathVariable("id") Integer productId, @Valid @RequestBody ProduseDTO produsDTO) {
        Integer productID = produseService.updateProduct(productId, produsDTO);
        return new ResponseEntity<>(productID, HttpStatus.OK);
    }
}
