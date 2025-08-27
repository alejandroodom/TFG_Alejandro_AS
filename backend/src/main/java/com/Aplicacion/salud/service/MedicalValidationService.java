package com.Aplicacion.salud.service;

import com.Aplicacion.salud.util.ValidationResult;
import com.Aplicacion.salud.model.UserData;
import org.springframework.stereotype.Service;

//package com.Aplicacion.salud.service;
@Service
public class MedicalValidationService {

    //Método para validar el objetivo del usuario
    public ValidationResult validateUserGoal(UserData userData) {
        ValidationResult result = new ValidationResult();

        if (userData.getImc() == null) {
            userData.calculateIMC();
            userData.categorizeIMC();
        }

        double imc = userData.getImc();
        String objetivo = userData.getObjetivo();
        int edad = userData.getEdad();
        String sexo = userData.getSexo();



        validateWeightLossGoal(result, imc, edad, sexo, userData);

        return result;
    }

    //Validación del objetivo de pérdida de peso
    private void validateWeightLossGoal(ValidationResult result, double imc, int edad, String sexo, UserData userData) {
        if (imc < 18.5) {
            result.setValid(false);
            result.setMessage("Por su seguridad, consulte con un médico antes de iniciar cualquier programa de alimentación.");
            result.addWarning("Su objetivo actual puede ser perjudicial para su salud.");
            result.addRecommendation("Se recomienda cambiar el objetivo a 'Aumentar masa muscular'.");
            result.addRecommendation("Enfoque en nutrición para ganar peso saludablemente.");
            return;
        }
    }
}