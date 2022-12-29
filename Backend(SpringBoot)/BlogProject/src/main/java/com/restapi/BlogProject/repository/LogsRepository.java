package com.restapi.BlogProject.repository;

import com.restapi.BlogProject.entity.Logs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogsRepository extends JpaRepository<Logs, Long> {
}