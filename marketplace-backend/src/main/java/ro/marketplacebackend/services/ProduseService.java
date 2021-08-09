package ro.marketplacebackend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import ro.marketplacebackend.dtos.ProduseDTO;
import ro.marketplacebackend.dtos.builders.ProduseBuilder;
import ro.marketplacebackend.entities.Produse;
import ro.marketplacebackend.repositories.ProduseRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProduseService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProduseService.class);
    private final ProduseRepository produseRepository;

    @Autowired
    public ProduseService(ProduseRepository produseRepository) {
        this.produseRepository = produseRepository;
    }

    public List<ProduseDTO> findProducts() {
        List<Produse> produseList = produseRepository.findAll();
        return produseList.stream()
                .map(ProduseBuilder::toDTO)
                .collect(Collectors.toList());
    }

    public ProduseDTO findProductById(Integer id){
        Optional<Produse> opt = produseRepository.findById(id);
        if (!opt.isPresent()) {
            LOGGER.error("Product with id {} was not found in db", id);
            throw new ResourceNotFoundException(Produse.class.getSimpleName() + " with id: " + id);
        }
        return ProduseBuilder.toDTO(opt.get());
    }

    public void deleteProduct(Integer id){
        Produse produs = produseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product with the id: " + id + "doesn't exist."));
        produseRepository.delete(produs);
    }

    public Integer insertProduct(ProduseDTO produsDTO) {
        Produse produs = ProduseBuilder.toEntity(produsDTO);
        produseRepository.save(produs);
        LOGGER.debug("Product with id {} was inserted in db", produs.getId());
        return produs.getId();
    }

    public Integer updateProduct(Integer id, ProduseDTO produsDTO){
        Optional<Produse> opt = produseRepository.findById(id);
        if (!opt.isPresent()) {
            LOGGER.error("Product with id {} was not found in db", id);
            throw new ResourceNotFoundException(Produse.class.getSimpleName() + " with id: " + id);
        }
        Produse produs = opt.get();
        produs.setCategorie(produsDTO.getCategorie());
        produs.setTip_produs(produsDTO.getTip_produs());
        produs.setCuloare(produsDTO.getCuloare());
        produs.setDescriere(produsDTO.getDescriere());
        produs.setFirma(produsDTO.getFirma());
        produs.setImagine(produsDTO.getImagine());
        produs.setMarime(produsDTO.getMarime());
        produs.setPret(produsDTO.getPret());
        produs.setTitlu(produsDTO.getTitlu());
        produs.setUzura(produsDTO.getUzura());
        produs.setCount(produsDTO.getCount());
        produs.setReducere(produsDTO.getReducere());
        produs.setPretReducere(produsDTO.getPretReducere());
        produs.setProprietar(produsDTO.getProprietar());
        produs.setScor(produsDTO.getScor());

        produseRepository.save(produs);

        LOGGER.debug("Product with id {} was updated in db", produs.getId());
        return produs.getId();
    }
}
