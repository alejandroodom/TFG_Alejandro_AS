package com.Aplicacion.salud.util;

import java.util.ArrayList;
import java.util.List;

public class PlanResponse {
    // Plan Nutricional
    private PlanNutricional planNutricional;

    // Plan de Entrenamiento
    private PlanEntrenamiento planEntrenamiento;

    // Información del usuario
    private Double imc;
    private String categoriaIMC;
    private String objetivoTexto;
    private String grupoEdad;
    private String validationSummary;
    private List<String> warnings;
    private List<String> recommendations;
    private boolean requiresMedicalConsultation;

    public PlanResponse() {
        this.planNutricional = new PlanNutricional();
        this.planEntrenamiento = new PlanEntrenamiento();
        this.warnings = new ArrayList<>();
        this.recommendations = new ArrayList<>();
    }

    public String getValidationSummary() { return validationSummary; }
    public void setValidationSummary(String validationSummary) { this.validationSummary = validationSummary; }

    public List<String> getWarnings() { return warnings; }
    public void setWarnings(List<String> warnings) { this.warnings = warnings; }

    public List<String> getRecommendations() { return recommendations; }
    public void setRecommendations(List<String> recommendations) { this.recommendations = recommendations; }

    public boolean isRequiresMedicalConsultation() { return requiresMedicalConsultation; }
    public void setRequiresMedicalConsultation(boolean requiresMedicalConsultation) {
        this.requiresMedicalConsultation = requiresMedicalConsultation;
    }



    // Clase interna para Plan Nutricional
    public static class PlanNutricional {
        private String tipoDieta;
        private String comidasPorDia;
        private String descripcion;

        public String getTipoDieta() { return tipoDieta; }
        public void setTipoDieta(String tipoDieta) { this.tipoDieta = tipoDieta; }

        public String getComidasPorDia() { return comidasPorDia; }
        public void setComidasPorDia(String comidasPorDia) { this.comidasPorDia = comidasPorDia; }

        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    }

    // Clase interna para Plan de Entrenamiento
    public static class PlanEntrenamiento {
        private String tipo;
        private String intensidad;
        private String descripcion;

        public String getTipo() { return tipo; }
        public void setTipo(String tipo) { this.tipo = tipo; }

        public String getIntensidad() { return intensidad; }
        public void setIntensidad(String intensidad) { this.intensidad = intensidad; }

        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    }

    // Getters y Setters
    public PlanNutricional getPlanNutricional() { return planNutricional; }
    public void setPlanNutricional(PlanNutricional planNutricional) { this.planNutricional = planNutricional; }

    public PlanEntrenamiento getPlanEntrenamiento() { return planEntrenamiento; }
    public void setPlanEntrenamiento(PlanEntrenamiento planEntrenamiento) { this.planEntrenamiento = planEntrenamiento; }

    public Double getImc() { return imc; }
    public void setImc(Double imc) { this.imc = imc; }

    public String getCategoriaIMC() { return categoriaIMC; }
    public void setCategoriaIMC(String categoriaIMC) { this.categoriaIMC = categoriaIMC; }

    public String getObjetivoTexto() { return objetivoTexto; }
    public void setObjetivoTexto(String objetivoTexto) { this.objetivoTexto = objetivoTexto; }

    public String getGrupoEdad() { return grupoEdad; }
    public void setGrupoEdad(String grupoEdad) { this.grupoEdad = grupoEdad; }
}