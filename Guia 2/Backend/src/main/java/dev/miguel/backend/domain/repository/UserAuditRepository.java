package dev.miguel.backend.domain.repository;

import dev.miguel.backend.domain.entity.UserAuditEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAuditRepository extends JpaRepository<UserAuditEntity, Integer> {
}
