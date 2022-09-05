package dev.miguel.backend.domain.repository;

import dev.miguel.backend.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    UserEntity findUserEntityByUserId (Integer id);
    UserEntity findUserEntityByUsername (String username);

    @Transactional
    void deleteUserEntityByDocument(String document);

}
