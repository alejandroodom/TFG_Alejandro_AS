package com.Aplicacion.salud.util;

import jakarta.validation.constraints.*;

//package com.Aplicacion.salud.util;
public class UserDataRequest {
    @NotNull
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
    private Double altura;
    @NotBlank
    private String objetivo;

    public UserDataRequest() {
    }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getSexo() { return sexo; }
    public void setSexo(String sexo) { this.sexo = sexo; }

    public Integer getEdad() { return edad; }
    public void setEdad(Integer edad) { this.edad = edad; }

    public Double getPeso() { return peso; }
    public void setPeso(Double peso) { this.peso = peso; }

    public Double getAltura() { return altura; }
    public void setAltura(Double altura) { this.altura = altura; }

    public String getObjetivo() { return objetivo; }
    public void setObjetivo(String objetivo) { this.objetivo = objetivo; }
}