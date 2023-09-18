package com.davincibiotech.DaVinciBioTechBE.repositories;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.davincibiotech.DaVinciBioTechBE.entities.Donazione;

@Repository
public interface DonazioneRepository extends JpaRepository<Donazione, UUID> {
	@Query("SELECT SUM(d.importo) FROM Donazione d WHERE d.data BETWEEN :dataInizio AND :dataFine")
	BigDecimal getSommaDonazioniPerPeriodo(@Param("dataInizio") LocalDate dataInizio,
			@Param("dataFine") LocalDate dataFine);

	@Query("SELECT d FROM Donazione d WHERE d.data BETWEEN :dataInizio AND :dataFine ORDER BY d.data ASC")
	List<Donazione> getDonazioniPerPeriodo(@Param("dataInizio") LocalDate dataInizio,
			@Param("dataFine") LocalDate dataFine);
}
