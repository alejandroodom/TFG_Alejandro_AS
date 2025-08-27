package com.Aplicacion.salud.controller;

import com.Aplicacion.salud.util.MessageResponse;
import com.Aplicacion.salud.util.PlanResponse;
import com.Aplicacion.salud.util.UserDataRequest;
import com.Aplicacion.salud.model.UserData;
import com.Aplicacion.salud.model.WeightHistory;
import com.Aplicacion.salud.repository.UserDataRepository;
import com.Aplicacion.salud.service.PlanService;
import com.Aplicacion.salud.service.WeightHistoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

//package com.Aplicacion.salud.controller;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserDataRepository userDataRepository;

    @Autowired
    private PlanService planService;

    @Autowired
    private WeightHistoryService weightHistoryService;

    @PostMapping("/data")
    public ResponseEntity<?> saveUserData(@Valid @RequestBody UserDataRequest request) {
        try {
            String userId = request.getUserId();
            Optional<UserData> existingData = userDataRepository.findByUserId(userId);
            UserData userData;
            boolean isNewUser = false;

            if (existingData.isPresent()) {

                userData = existingData.get();
                Double oldWeight = userData.getPeso();

                userData.setSexo(request.getSexo());
                userData.setEdad(request.getEdad());
                userData.setPeso(request.getPeso());
                userData.setAltura(request.getAltura());
                userData.setObjetivo(request.getObjetivo());
                userData.setUpdatedAt(LocalDateTime.now());


                if (!request.getPeso().equals(oldWeight)) {
                    weightHistoryService.recordWeight(userId, request.getPeso(), "update");
                }
            } else {

                userData = new UserData(
                        userId,
                        request.getSexo(),
                        request.getEdad(),
                        request.getPeso(),
                        request.getAltura(),
                        request.getObjetivo()
                );
                isNewUser = true;
            }

            userDataRepository.save(userData);


            if (isNewUser) {
                weightHistoryService.recordWeight(userId, request.getPeso(), "initial");
            }

            return ResponseEntity.ok(new MessageResponse("Datos guardados exitosamente"));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }


    @GetMapping("/data/{userId}")
    public ResponseEntity<?> getUserData(@PathVariable String userId) {
        try {
            Optional<UserData> userDataOpt = userDataRepository.findByUserId(userId);

            if (!userDataOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            UserData userData = userDataOpt.get();
            return ResponseEntity.ok(userData);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new MessageResponse("Error al obtener los datos: " + e.getMessage()));
        }
    }


    @GetMapping("/has-data/{userId}")
    public ResponseEntity<?> hasUserData(@PathVariable String userId) {
        try {
            boolean hasData = userDataRepository.existsByUserId(userId);
            return ResponseEntity.ok(hasData);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new MessageResponse("Error al verificar los datos: " + e.getMessage()));
        }
    }

    @PutMapping("/data/{userId}")
    public ResponseEntity<?> updateUserData(@PathVariable String userId, @Valid @RequestBody UserDataRequest request) {
        try {
            Optional<UserData> existingDataOpt = userDataRepository.findByUserId(userId);

            if (!existingDataOpt.isPresent()) {
                return ResponseEntity.status(404)
                        .body(new MessageResponse("No se encontraron datos del usuario para actualizar"));
            }

            UserData userData = existingDataOpt.get();
            Double oldWeight = userData.getPeso();

            userData.setSexo(request.getSexo());
            userData.setEdad(request.getEdad());
            userData.setPeso(request.getPeso());
            userData.setAltura(request.getAltura());
            userData.setObjetivo(request.getObjetivo());
            userData.setUpdatedAt(LocalDateTime.now());

            if (!request.getPeso().equals(oldWeight)) {
                weightHistoryService.recordWeight(userId, request.getPeso(), "update");
            }

            userDataRepository.save(userData);
            return ResponseEntity.ok(new MessageResponse("Datos actualizados exitosamente"));

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

            plan.setUserData(userData);

            return ResponseEntity.ok(plan);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new MessageResponse("Error al generar el plan: " + e.getMessage()));
        }
    }


    @GetMapping("/weight-history/{userId}")
    public ResponseEntity<?> getWeightHistory(@PathVariable String userId) {
        try {
            List<WeightHistory> history = weightHistoryService.getUserWeightHistory(userId);
            return ResponseEntity.ok(history);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new MessageResponse("Error al obtener historial: " + e.getMessage()));
        }
    }


    @GetMapping("/weight-progress/{userId}")
    public ResponseEntity<?> getWeightProgress(@PathVariable String userId) {
        try {
            Double progress = weightHistoryService.calculateWeightProgress(userId);
            boolean hasHistory = weightHistoryService.hasWeightHistory(userId);

            return ResponseEntity.ok(new WeightProgressResponse(progress, hasHistory));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new MessageResponse("Error al calcular progreso: " + e.getMessage()));
        }
    }


    //clase interna para la respuesta del progreso de peso.
    public static class WeightProgressResponse {
        private Double weightChange; //diferencia en kg
        private boolean hasHistory;

        public WeightProgressResponse() {}

        public WeightProgressResponse(Double weightChange, boolean hasHistory) {
            this.weightChange = weightChange;
            this.hasHistory = hasHistory;
        }

        public Double getWeightChange() { return weightChange; }
        public void setWeightChange(Double weightChange) { this.weightChange = weightChange; }

        public boolean isHasHistory() { return hasHistory; }
        public void setHasHistory(boolean hasHistory) { this.hasHistory = hasHistory; }
    }
}