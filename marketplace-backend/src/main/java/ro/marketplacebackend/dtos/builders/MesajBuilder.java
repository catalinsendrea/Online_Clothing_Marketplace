package ro.marketplacebackend.dtos.builders;

import ro.marketplacebackend.dtos.MesajDTO;
import ro.marketplacebackend.entities.Mesaj;

public class MesajBuilder {

    public MesajBuilder(){

    }

    public static MesajDTO toDTO(Mesaj mesaj){
        return new MesajDTO(mesaj.getId(), mesaj.getExpeditor(), mesaj.getSubiect(), mesaj.getMesaj(), mesaj.getDestinatar());
    }

    public static Mesaj toEntity(MesajDTO mesajDTO){
        return new Mesaj(mesajDTO.getExpeditor(), mesajDTO.getSubiect(), mesajDTO.getMesaj(), mesajDTO.getDestinatar());
    }
}
