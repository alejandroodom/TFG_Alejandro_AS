package com.Aplicacion.salud.util;

import java.util.List;
import java.util.ArrayList;

public class ValidationResult {
    private boolean valid;
    private boolean requiresMedicalConsultation;
    private String message;
    private String recommendedObjective;
    private List<String> warnings;
    private List<String> recommendations;

    public ValidationResult() {
        this.warnings = new ArrayList<>();
        this.recommendations = new ArrayList<>();
        this.valid = true;
    }

    public ValidationResult(boolean valid, String message) {
        this();
        this.valid = valid;
        this.message = message;
    }

    // Getters y Setters
    public boolean isValid() { return valid; }
    public void setValid(boolean valid) { this.valid = valid; }

    public boolean isRequiresMedicalConsultation() { return requiresMedicalConsultation; }
    public void setRequiresMedicalConsultation(boolean requiresMedicalConsultation) {
        this.requiresMedicalConsultation = requiresMedicalConsultation;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getRecommendedObjective() { return recommendedObjective; }
    public void setRecommendedObjective(String recommendedObjective) {
        this.recommendedObjective = recommendedObjective;
    }

    public List<String> getWarnings() { return warnings; }
    public void setWarnings(List<String> warnings) { this.warnings = warnings; }

    public List<String> getRecommendations() { return recommendations; }
    public void setRecommendations(List<String> recommendations) { this.recommendations = recommendations; }

    public void addWarning(String warning) { this.warnings.add(warning); }
    public void addRecommendation(String recommendation) { this.recommendations.add(recommendation); }
}
