package com.Aplicacion.salud.repository;

import com.Aplicacion.salud.model.WeightHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

//package com.Aplicacion.salud.repository;
@Repository
public interface WeightHistoryRepository extends MongoRepository<WeightHistory, String> {

    List<WeightHistory> findByUserIdOrderByRecordedAtAsc(String userId);

    List<WeightHistory> findByUserIdOrderByRecordedAtDesc(String userId);

    boolean existsByUserId(String userId);

    void deleteByUserId(String userId);
}
