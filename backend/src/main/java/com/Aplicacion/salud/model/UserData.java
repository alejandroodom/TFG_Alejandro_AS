package com.Aplicacion.salud.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.DecimalMax;

import java.time.LocalDateTime;

//package com.Aplicacion.salud.model;
@Document(collection = "user_data")
public class UserData {
    @Id
    private String id;
    @NotBlank
    @Indexed(unique = true)
    private String userId;
    @NotBlank
    private String sexo;
    @NotNull
    @Min(16)
    @Max(99)
    private Integer edad;
    @NotNull
    @DecimalMin("30.0")
    @DecimalMax("300.0")
    private Double peso;
    @NotNull
    @DecimalMin("120.0")
    @DecimalMax("250.0")
    private Double altura;  //en cm
    @NotBlank
    private String objetivo;
    private Double imc;
    private String categoriaIMC;
    private String rangoEdad;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserData() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public UserData(String userId, String sexo, Integer edad, Double peso, Double altura, String objetivo) {

        this.userId = userId;
        this.sexo = sexo;
        this.edad = edad;
        this.peso = peso;
        this.altura = altura;
        this.objetivo = objetivo;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();

        this.calculateIMC();
        this.categorizeIMC();
        this.categorizeAge();
    }

    //Calcular IMC
    public void calculateIMC() {
        if (peso != null && altura != null) {
            double alturaEnMetros = altura / 100.0;
            this.imc = peso / (alturaEnMetros * alturaEnMetros);
            this.imc = Math.round(this.imc * 100.0) / 100.0;
        }
    }

    //Categorizar el IMC
    public void categorizeIMC() {
        if (imc != null) {
            if (imc < 18.5) {
                this.categoriaIMC = "Bajo peso";
            } else if (imc < 25.0) {
                this.categoriaIMC = "Peso normal";
            } else if (imc < 30.0) {
                this.categoriaIMC = "Sobrepeso";
            } else {
                this.categoriaIMC = "Obesidad";
            }
        }
    }

    //Categorizar el rango de edad
    public void categorizeAge() {
        if (edad != null) {
            if (edad < 25) {
                this.rangoEdad = "Joven";
            } else if (edad >= 25 && edad < 40) {
                this.rangoEdad = "Adulto";
            } else if (edad >= 40 && edad < 60) {
                this.rangoEdad = "Adulto maduro";
            } else {
                this.rangoEdad = "Adulto mayor";
            }
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getSexo() { return sexo; }
    public void setSexo(String sexo) { this.sexo = sexo; }

    public Integer getEdad() { return edad; }
    public void setEdad(Integer edad) {
        this.edad = edad;
        this.categorizeAge();
        this.updatedAt = LocalDateTime.now();
    }

    public Double getPeso() { return peso; }
    public void setPeso(Double peso) {
        this.peso = peso;
        this.calculateIMC();
        this.categorizeIMC();
        this.updatedAt = LocalDateTime.now();
    }

    public Double getAltura() { return altura; }
    public void setAltura(Double altura) {
        this.altura = altura;
        this.calculateIMC();
        this.categorizeIMC();
        this.updatedAt = LocalDateTime.now();
    }

    public String getObjetivo() { return objetivo; }
    public void setObjetivo(String objetivo) { this.objetivo = objetivo; }

    public Double getImc() { return imc; }
    public void setImc(Double imc) { this.imc = imc; }

    public String getCategoriaIMC() { return categoriaIMC; }
    public void setCategoriaIMC(String categoriaIMC) { this.categoriaIMC = categoriaIMC; }

    public String getRangoEdad() { return rangoEdad; }
    public void setRangoEdad(String rangoEdad) { this.rangoEdad = rangoEdad; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}