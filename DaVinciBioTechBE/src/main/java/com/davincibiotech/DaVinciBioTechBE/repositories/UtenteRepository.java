package com.davincibiotech.DaVinciBioTechBE.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.davincibiotech.DaVinciBioTechBE.entities.Utente;

@Repository
public interface UtenteRepository extends JpaRepository<Utente, UUID> {
	Optional<Utente> findByEmail(String email);
}
