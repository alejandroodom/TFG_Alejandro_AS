package com.Aplicacion.salud.service;


import com.Aplicacion.salud.model.WeightHistory;
import com.Aplicacion.salud.repository.WeightHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

//package com.Aplicacion.salud.service;
@Service
public class WeightHistoryService {


    @Autowired
    private WeightHistoryRepository weightHistoryRepository;


    public WeightHistory recordWeight(String userId, Double peso, String source) {
        WeightHistory weightRecord = new WeightHistory(userId, peso, source);
        return weightHistoryRepository.save(weightRecord);
    }

    public List<WeightHistory> getUserWeightHistory(String userId) {
        return weightHistoryRepository.findByUserIdOrderByRecordedAtAsc(userId);
    }



    public boolean hasWeightHistory(String userId) {
        return weightHistoryRepository.existsByUserId(userId);
    }


    public WeightHistory getLatestWeight(String userId) {
        List<WeightHistory> history = weightHistoryRepository.findByUserIdOrderByRecordedAtDesc(userId);
        return history.isEmpty() ? null : history.get(0);
    }


    public Double calculateWeightProgress(String userId) {

        List<WeightHistory> history = getUserWeightHistory(userId);
        if (history.size() < 2) {
            return 0.0; //Se necesitan al menos 2 registros para calcular el progreso
        }

        Double initialWeight = history.get(0).getPeso();
        Double currentWeight = history.get(history.size() - 1).getPeso();


        return currentWeight - initialWeight;
    }
}
