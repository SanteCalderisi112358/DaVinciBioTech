package com.davincibiotech.DaVinciBioTechBE.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.davincibiotech.DaVinciBioTechBE.entities.Tavola;

@Repository
public interface TavolaRepository extends JpaRepository<Tavola, UUID> {

}
