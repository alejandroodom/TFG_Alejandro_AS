package com.Aplicacion.salud.controller;


import com.Aplicacion.salud.model.User;
import com.Aplicacion.salud.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Endpoint para obtener todos los usuarios
    @GetMapping("/api/usuarios")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
