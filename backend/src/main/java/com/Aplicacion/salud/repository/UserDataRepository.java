package com.Aplicacion.salud.repository;

import com.Aplicacion.salud.model.UserData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserDataRepository extends MongoRepository<UserData, String> {

    Optional<UserData> findByUserId(String userId);
    boolean existsByUserId(String userId);
    void deleteByUserId(String userId);
}


