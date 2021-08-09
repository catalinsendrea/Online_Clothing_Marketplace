package ro.marketplacebackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.marketplacebackend.dtos.MesajDTO;
import ro.marketplacebackend.services.MesajService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/mesaj")
public class MesajController {

    private final MesajService mesajService;

    @Autowired
    public MesajController(MesajService mesajService){
        this.mesajService = mesajService;
    }

    @GetMapping()
    public ResponseEntity<List<MesajDTO>> getMesaje() {
        List<MesajDTO> dtos = mesajService.findMesaje();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(value = "/{destinatar}")
    public ResponseEntity<List<MesajDTO>> getMesajeByUsernameDestinatar(@PathVariable("destinatar") String destinatar) {
        List<MesajDTO> dtos = mesajService.findMesajeByDestinatar(destinatar);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Integer> insertMesaj(@Valid @RequestBody MesajDTO mesajDTO) throws Exception {
        Integer mesajId = mesajService.insertMesaj(mesajDTO);
        return new ResponseEntity<>(mesajId, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteMesaj(@PathVariable Integer id){
        mesajService.deleteMesaj(id);
    }
}
