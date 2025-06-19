package com.Aplicacion.salud.service;


import com.Aplicacion.salud.LoginRequest;
import com.Aplicacion.salud.RegisterRequest;
import com.Aplicacion.salud.model.User;
import com.Aplicacion.salud.repository.UserRepository;
import com.Aplicacion.salud.util.JwtResponse;
import com.Aplicacion.salud.util.JwtUtils;
import com.Aplicacion.salud.util.MessageResponse;
import com.Aplicacion.salud.util.UserProfileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (!userOptional.isPresent()) {
            throw new RuntimeException("Usuario no encontrado");
        }

        User user = userOptional.get();

        if (!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String jwt = jwtUtils.generateJwtToken(user.getEmail());

        return new JwtResponse(jwt, user.getId(), user.getUsername(), user.getEmail());
    }

    public MessageResponse registerUser(RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("El email ya está en uso");
        }

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya está en uso");
        }

        // Crear nueva cuenta de usuario
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        return new MessageResponse("Usuario registrado exitosamente");
    }

    public Object getUserProfile(String jwt) {
        if (!jwtUtils.validateJwtToken(jwt)) {
            throw new RuntimeException("Token inválido");
        }

        String email = jwtUtils.getEmailFromJwtToken(jwt);
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (!userOptional.isPresent()) {
            throw new RuntimeException("Usuario no encontrado");
        }

        User user = userOptional.get();
        return new UserProfileResponse(user.getId(), user.getUsername(), user.getEmail());
    }
}
