package com.Aplicacion.salud.util;

import com.Aplicacion.salud.model.UserData;
import java.util.ArrayList;
import java.util.List;

//package com.Aplicacion.salud.util;
public class PlanResponse {

    private PlanNutricional planNutricional;
    private PlanEntrenamiento planEntrenamiento;

    private Double imc;
    private String categoriaIMC;
    private String objetivoTexto;
    private String grupoEdad;
    private String validationSummary;
    private List<String> warnings;
    private List<String> recommendations;
    private boolean requiresMedicalConsultation;
    private UserData userData;

    public PlanResponse() {
        this.planNutricional = new PlanNutricional();
        this.planEntrenamiento = new PlanEntrenamiento();
        this.warnings = new ArrayList<>();
        this.recommendations = new ArrayList<>();
    }

    public UserData getUserData() { return userData; }
    public void setUserData(UserData userData) { this.userData = userData; }

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

    //Clase para el Plan Nutricional
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

    //Clase para el Plan de Entrenamiento
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