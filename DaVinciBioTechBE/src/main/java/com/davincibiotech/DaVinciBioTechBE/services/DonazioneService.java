package com.davincibiotech.DaVinciBioTechBE.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.davincibiotech.DaVinciBioTechBE.entities.Donazione;
import com.davincibiotech.DaVinciBioTechBE.exceptions.NotFoundException;
import com.davincibiotech.DaVinciBioTechBE.payloads.DonazioneRequestBody;
import com.davincibiotech.DaVinciBioTechBE.repositories.DonazioneRepository;

@Service
public class DonazioneService {
	private final DonazioneRepository donazioneRepo;

	@Autowired
	public DonazioneService(DonazioneRepository donazioneRepo) {
		this.donazioneRepo = donazioneRepo;
	}

	public Donazione create(DonazioneRequestBody body) {

		Donazione nuovaDonazione = new Donazione(body.getImporto(), body.getData(), body.getUtente());
		return donazioneRepo.save(nuovaDonazione);
	}

	public Page<Donazione> find(int page, int size, String sort) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
		return donazioneRepo.findAll(pageable);
	}

	public Donazione findById(UUID id) throws NotFoundException {
		return donazioneRepo.findById(id)
				.orElseThrow(() -> new NotFoundException("La donazione con id: " + id + " non è stata trovata"));
	}

	public Donazione findByIdAndUpdate(UUID id, DonazioneRequestBody body) throws NotFoundException {
		Donazione found = this.findById(id);
		found.setData(body.getData());
		;
		found.setImporto(body.getImporto());
		found.setUtente(body.getUtente());

		return donazioneRepo.save(found);
	}

	public void findByIdAndDelete(UUID id) throws NotFoundException {
		Donazione found = this.findById(id);
		donazioneRepo.delete(found);
	}

	/* METODI CUSTOM BACK-OFFICE ADMIN */
	public BigDecimal getSommaDonazioniPerPeriodo(LocalDate dataInizio, LocalDate dataFine) {
		return donazioneRepo.getSommaDonazioniPerPeriodo(dataInizio, dataFine);
	}

	public List<Donazione> getDonazioniPerPeriodo(LocalDate dataInizio, LocalDate dataFine) {
		return donazioneRepo.getDonazioniPerPeriodo(dataInizio, dataFine);
	}

	public BigDecimal getSommaAllDonazioni() {
		return donazioneRepo.getSommaAllDonazioni();
	}

}
