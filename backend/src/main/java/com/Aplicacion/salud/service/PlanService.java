package com.Aplicacion.salud.service;

import com.Aplicacion.salud.model.UserData;
import com.Aplicacion.salud.util.PlanResponse;
import com.Aplicacion.salud.util.ValidationResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanService {

    @Autowired
    private MedicalValidationService medicalValidationService;
    public PlanResponse generarPlan(UserData userData) {
        PlanResponse plan = new PlanResponse();


        ValidationResult validation = medicalValidationService.validateUserGoal(userData);

        if (!validation.isValid()) {

            plan = generarPlanAlternativo(userData, validation);
            return plan;
        }

        // Usar los datos ya calculados en UserData
        plan.setImc(userData.getImc());
        plan.setCategoriaIMC(userData.getCategoriaIMC());
        plan.setGrupoEdad(userData.getRangoEdad());
        plan.setObjetivoTexto(traducirObjetivo(userData.getObjetivo()));


        plan.setWarnings(validation.getWarnings());
        plan.setRecommendations(validation.getRecommendations());
        plan.setRequiresMedicalConsultation(validation.isRequiresMedicalConsultation());

        // Generar planes (modificados según validaciones)
        generarPlanNutricional(plan, userData);
        generarPlanEntrenamiento(plan, userData);

        return plan;
    }

    private PlanResponse generarPlanAlternativo(UserData userData, ValidationResult validation) {
        PlanResponse plan = new PlanResponse();

        plan.setImc(userData.getImc());
        plan.setCategoriaIMC(userData.getCategoriaIMC());
        plan.setGrupoEdad(userData.getRangoEdad());
        plan.setObjetivoTexto("PLAN MODIFICADO POR SEGURIDAD");

        // Plan seguro alternativo
        PlanResponse.PlanNutricional planNut = plan.getPlanNutricional();
        planNut.setTipoDieta("Consulta médica requerida");
        planNut.setComidasPorDia("A determinar por profesional");
        planNut.setDescripcion(validation.getMessage());

        PlanResponse.PlanEntrenamiento planEnt = plan.getPlanEntrenamiento();
        planEnt.setTipo("Consulta médica requerida");
        planEnt.setIntensidad("A determinar por profesional");
        planEnt.setDescripcion("Por su seguridad, consulte con un médico antes de iniciar cualquier programa de ejercicios.");

        plan.setValidationSummary(validation.getMessage());
        plan.setWarnings(validation.getWarnings());
        plan.setRecommendations(validation.getRecommendations());
        plan.setRequiresMedicalConsultation(true);

        return plan;
    }

    private String traducirObjetivo(String objetivo) {
        switch (objetivo) {
            case "bajar_peso": return "Pérdida de peso";
            case "aumentar_musculo": return "Ganancia de masa muscular";
            case "revertir_condicion": return "Mejora o revertimiento de condición crónica";
            case "mejorar_salud": return "Mejorar mi salud general";
            default: return "Objetivo personalizado";
        }
    }

    private void generarPlanNutricional(PlanResponse plan, UserData userData) {
        String objetivo = userData.getObjetivo();
        PlanResponse.PlanNutricional planNut = plan.getPlanNutricional();

        switch (objetivo) {
            case "bajar_peso":
                planNut.setTipoDieta("Dieta cetogénica y ayuno intermitente.");
                planNut.setComidasPorDia("1-2");
                planNut.setDescripcion("Dieta alta en grasas saludables, moderada en proteínas y muy baja en carbohidratos. Eliminar cereales, aceites de semillas y comida ultraprocesada.");
                break;
            case "aumentar_musculo":
                planNut.setTipoDieta("Dieta protéica y alta en calorías.");
                planNut.setComidasPorDia("3");
                planNut.setDescripcion("Dieta rica en proteína, preferiblemente de origen animal, grasas saludables y carbohidratos simples como frutas o miel y complejos (con moderación) como patata.");
                break;
            case "revertir_condicion":
                planNut.setTipoDieta("Dieta cetogénica o carnívora y ayuno intermitente.");
                planNut.setComidasPorDia("1-2");
                planNut.setDescripcion("Dieta alta en grasas animales (carnívora) o incluyendo también vegetales como el aguacate (cetogénica), moderada en proteínas y lo más baja posible en carbohidratos. Eliminar cereales, aceites de semillas, comida ultraprocesada, y vegetales con alto contenido en azúcares.");
                break;
            default:
                planNut.setTipoDieta("Dieta paleo y ayuno intermitente.");
                planNut.setComidasPorDia("2");
                planNut.setDescripcion("Dieta variada basada en alimentos enteros y de origen animal, con vegetales como frutas y verduras bajas en antinutrientes. Priorizar carbohidratos simples como la miel o frutas. Eliminar aceites de semillas, productos ultraprocesados, legumbres y cereales.");
        }
    }

    private void generarPlanEntrenamiento(PlanResponse plan, UserData userData) {
        String objetivo = userData.getObjetivo();
        int edad = userData.getEdad();
        PlanResponse.PlanEntrenamiento planEnt = plan.getPlanEntrenamiento();

        // Ajustar intensidad según edad
        String intensidadBase = edad < 30 ? "Alta" : edad < 50 ? "Moderada-Alta" : "Moderada";

        switch (objetivo) {
            case "bajar_peso":
                planEnt.setTipo("Activación y movimiento diario");
                planEnt.setIntensidad("Moderada - Evitar el sedentarismo y el sobreesfuerzo");
                planEnt.setDescripcion("Caminar al menos 3000 pasos diarios y ejercicio de fuerza moderado 2 o 3 veces por semana.");
                break;
            case "aumentar_musculo":
                planEnt.setTipo("Entrenamiento de hipertrofia con sobrecarga progresiva");
                planEnt.setIntensidad(intensidadBase + " - Enfoque hipertrofia");
                planEnt.setDescripcion("Rutina de pesas o calistenia 2-4 días por semana con progresión de cargas. Enfoque en grupos musculares deseados a mejorar.");
                break;
            case "revertir_condicion":
                planEnt.setTipo("Ejercicio de fuerza y movimiento diario.");
                planEnt.setIntensidad(intensidadBase + " - Enfoque en fuerza y movilidad");
                planEnt.setDescripcion("Caminar diariamente o practicar algún deporte y ejercicio de fuerza 2 o 3 días a la semana.");
                break;
            default:
                planEnt.setTipo("Movimiento diario Y ejercicio de fuerza.");
                planEnt.setIntensidad(intensidadBase + " - Enfoque en fuerza y movilidad");
                planEnt.setDescripcion("Caminar diariamente o practicar algún deporte y ejercicio de fuerza 2 o 3 días a la semana.");
        }
    }
}
