package com.virtual.hosting.repository;

import com.virtual.hosting.entities.BioMarker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BioMarkerRepository extends JpaRepository<BioMarker, Integer> {
}
