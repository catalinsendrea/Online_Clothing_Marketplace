package ro.marketplacebackend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import ro.marketplacebackend.dtos.MesajDTO;
import ro.marketplacebackend.dtos.builders.MesajBuilder;
import ro.marketplacebackend.entities.Mesaj;
import ro.marketplacebackend.repositories.MesajRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MesajService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MesajService.class);
    private final MesajRepository mesajRepository;

    @Autowired
    public MesajService(MesajRepository mesajRepository) {
        this.mesajRepository = mesajRepository;
    }

    public Integer insertMesaj(MesajDTO mesajDTO) throws Exception {
        Mesaj mesaj = MesajBuilder.toEntity(mesajDTO);
        mesajRepository.save(mesaj);
        LOGGER.debug("Message with id {} was inserted in db", mesaj.getId());
        return mesaj.getId();
    }

    public List<MesajDTO> findMesaje() {
        List<Mesaj> mesajeList = mesajRepository.findAll();
        return mesajeList.stream()
                .map(MesajBuilder::toDTO)
                .collect(Collectors.toList());
    }

    public List<MesajDTO> findMesajeByDestinatar(String destinatar) {
        List<Mesaj> mesajeList = mesajRepository.findByDestinatar(destinatar);
        return mesajeList.stream()
                .map(MesajBuilder::toDTO)
                .collect(Collectors.toList());
    }

    public void deleteMesaj(Integer id){
        Mesaj mesaj = mesajRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Message with the id: " + id + "doesn't exist."));
        mesajRepository.delete(mesaj);
    }
}
