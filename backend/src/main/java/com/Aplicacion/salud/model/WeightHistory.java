package com.Aplicacion.salud.model;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.DecimalMax;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

//package com.Aplicacion.salud.model;
@Document(collection = "weight_history")
public class WeightHistory {
    @Id
    private String id;

    @NotBlank
    @Indexed
    private String userId;

    @NotNull
    @DecimalMin("30.0")
    @DecimalMax("300.0")
    private Double peso;

    private LocalDateTime recordedAt;
    private String source; //Puede ser "initial" o "update"

    public WeightHistory() {
        this.recordedAt = LocalDateTime.now();
    }

    public WeightHistory(String userId, Double peso, String source) {
        this.userId = userId;
        this.peso = peso;
        this.source = source;
        this.recordedAt = LocalDateTime.now();
    }


    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public Double getPeso() { return peso; }
    public void setPeso(Double peso) { this.peso = peso; }

    public LocalDateTime getRecordedAt() { return recordedAt; }
    public void setRecordedAt(LocalDateTime recordedAt) { this.recordedAt = recordedAt; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
}
