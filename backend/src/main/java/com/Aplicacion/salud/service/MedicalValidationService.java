package com.Aplicacion.salud.service;

import com.Aplicacion.salud.util.ValidationResult;
import com.Aplicacion.salud.model.UserData;
import org.springframework.stereotype.Service;

@Service
public class MedicalValidationService {

    public ValidationResult validateUserGoal(UserData userData) {
        ValidationResult result = new ValidationResult();

        // Calcular IMC si no está calculado
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

    private void validateWeightLossGoal(ValidationResult result, double imc, int edad, String sexo, UserData userData) {
        if (imc < 18.5) {
            result.setValid(false);
            result.setMessage("NO SE RECOMIENDA bajar de peso con un IMC de " + String.format("%.1f", imc) + " (Bajo peso)");
            result.addWarning("Su objetivo actual puede ser perjudicial para su salud");
            result.addRecommendation("Recomendamos cambiar el objetivo a 'Aumentar masa muscular'");
            result.addRecommendation("Enfoque en nutrición para ganar peso saludablemente");
            return;
        }
    }
}