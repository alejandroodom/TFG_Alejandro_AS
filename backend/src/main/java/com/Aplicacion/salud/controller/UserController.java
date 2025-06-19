package com.Aplicacion.salud.controller;

import com.Aplicacion.salud.util.MessageResponse;
import com.Aplicacion.salud.util.PlanResponse;
import com.Aplicacion.salud.util.UserDataRequest;
import com.Aplicacion.salud.model.UserData;
import com.Aplicacion.salud.repository.UserDataRepository;
import com.Aplicacion.salud.service.PlanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserDataRepository userDataRepository;

    @Autowired
    private PlanService planService;

    @PostMapping("/data")
    public ResponseEntity<?> saveUserData(@Valid @RequestBody UserDataRequest request) {
        try {
            String userId = request.getUserId();

            Optional<UserData> existingData = userDataRepository.findByUserId(userId);

            UserData userData;
            if (existingData.isPresent()) {


                userData = existingData.get();
                userData.setSexo(request.getSexo());
                userData.setEdad(request.getEdad());
                userData.setPeso(request.getPeso());
                userData.setAltura(request.getAltura());
                userData.setObjetivo(request.getObjetivo());

            } else {

                userData = new UserData(
                        userId,
                        request.getSexo(),
                        request.getEdad(),
                        request.getPeso(),
                        request.getAltura(),
                        request.getObjetivo()
                );
            }

            userDataRepository.save(userData);

            return ResponseEntity.ok(new MessageResponse("Datos guardados exitosamente"));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }




    @GetMapping("/plan/{userId}")
    public ResponseEntity<?> getUserPlan(@PathVariable String userId) {

        try {
            Optional<UserData> userDataOpt = userDataRepository.findByUserId(userId);

            if (!userDataOpt.isPresent()) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("No se encontraron datos del usuario"));
            }

            UserData userData = userDataOpt.get();
            PlanResponse plan = planService.generarPlan(userData);

            return ResponseEntity.ok(plan);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new MessageResponse("Error al generar el plan: " + e.getMessage()));
        }
    }
}