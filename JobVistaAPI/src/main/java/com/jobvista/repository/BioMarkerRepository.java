package com.jobvista.repository;

import com.jobvista.entities.BioMarker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BioMarkerRepository extends JpaRepository<BioMarker, Integer> {
}
