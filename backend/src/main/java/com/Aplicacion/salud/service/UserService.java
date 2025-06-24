package com.Aplicacion.salud.service;

import com.Aplicacion.salud.model.User;
import com.Aplicacion.salud.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

//package com.Aplicacion.salud.service;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;    //encripta la contraseña

    public User registerUser(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }
    public User loginUser(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        throw new RuntimeException("Usuario o contraseña incorrectos");
    }
}

