package com.msme.backend.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.msme.backend.entity.Msme;

public interface MsmeRepository extends JpaRepository<Msme, Integer> {


List<Msme> findByNameContainingIgnoreCase(String keyword);
List<Msme> findByCategoryIgnoreCase(String category);
}
