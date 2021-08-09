package ro.marketplacebackend.dtos.builders;

import ro.marketplacebackend.dtos.ProduseDTO;
import ro.marketplacebackend.entities.Produse;

public class ProduseBuilder {

    public ProduseBuilder(){

    }

    public static ProduseDTO toDTO(Produse produse){
        return new ProduseDTO(produse.getId(), produse.getImagine(), produse.getTip_produs(), produse.getMarime(), produse.getCuloare(), produse.getCategorie(), produse.getPret(), produse.getPretReducere(), produse.getFirma(), produse.getTitlu(), produse.getDescriere(), produse.getUzura(), produse.getCount(), produse.getReducere(), produse.getProprietar(), produse.getScor());
    }

    public static Produse toEntity(ProduseDTO produseDTO){
        return new Produse(produseDTO.getImagine(), produseDTO.getTip_produs(), produseDTO.getMarime(), produseDTO.getCuloare(), produseDTO.getCategorie(), produseDTO.getPret(), produseDTO.getPretReducere(), produseDTO.getFirma(), produseDTO.getTitlu(), produseDTO.getDescriere(), produseDTO.getUzura(), produseDTO.getCount(), produseDTO.getReducere(), produseDTO.getProprietar(), produseDTO.getScor());
    }
}
