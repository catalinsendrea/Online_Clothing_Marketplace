package ro.marketplacebackend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import ro.marketplacebackend.dtos.UserDTO;
import ro.marketplacebackend.dtos.builders.UserBuilder;
import ro.marketplacebackend.entities.User;
import ro.marketplacebackend.repositories.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> findUsers() {
        List<User> usersList = userRepository.findAll();
        return usersList.stream()
                .map(UserBuilder::toDTO)
                .collect(Collectors.toList());
    }

    public void deleteUser(Integer id){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with the id: " + id + "doesn't exist."));
        userRepository.delete(user);
    }
}
