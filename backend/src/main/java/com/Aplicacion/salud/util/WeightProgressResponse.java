package com.Aplicacion.salud.util;

//package com.Aplicacion.salud.util;
public class WeightProgressResponse {
    private Double weightChange;
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
