package com.davincibiotech.DaVinciBioTechBE.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.davincibiotech.DaVinciBioTechBE.entities.Donazione;
import com.davincibiotech.DaVinciBioTechBE.entities.Utente;

@Repository
public interface UtenteRepository extends JpaRepository<Utente, UUID> {
	Optional<Utente> findByEmail(String email);

	/* METODI PER ADMIN */
	@Query("SELECT DISTINCT u FROM Utente u JOIN Donazione d ON u.id = d.utente.id")
	List<Utente> getUtentiDonatori();

	@Query("SELECT d FROM Donazione d JOIN d.utente u WHERE u.id = :userId")
	List<Donazione> getDonazioniByUtenteId(@Param("userId") UUID userId);





}
