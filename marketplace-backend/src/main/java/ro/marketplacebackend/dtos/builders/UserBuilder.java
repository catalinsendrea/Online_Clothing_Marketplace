package ro.marketplacebackend.dtos.builders;

import ro.marketplacebackend.dtos.UserDTO;
import ro.marketplacebackend.entities.User;

public class UserBuilder {

    public UserBuilder(){

    }

    public static UserDTO toDTO(User user){
        return new UserDTO(user.getId(), user.getUsername(), user.getPassword(), user.getNume(), user.getPrenume(), user.getTelefon(), user.getEmail(), user.getSex(), user.getAdresa(), user.getCodpostal());
    }

    public static User toEntity(UserDTO userDTO){
        return new User(userDTO.getUsername(), userDTO.getEmail(), userDTO.getParola(), userDTO.getNume(), userDTO.getPrenume(), userDTO.getTelefon(), userDTO.getSex(), userDTO.getAdresa(), userDTO.getCodpostal());
    }
}
