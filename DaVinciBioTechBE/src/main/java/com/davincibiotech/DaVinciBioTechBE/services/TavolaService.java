package com.davincibiotech.DaVinciBioTechBE.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.davincibiotech.DaVinciBioTechBE.entities.Tavola;
import com.davincibiotech.DaVinciBioTechBE.exceptions.NotFoundException;
import com.davincibiotech.DaVinciBioTechBE.payloads.TavolaRequestBody;
import com.davincibiotech.DaVinciBioTechBE.repositories.TavolaRepository;

@Service
public class TavolaService {
	private final TavolaRepository tavolaRepo;

	@Autowired
	public TavolaService(TavolaRepository tavolaRepo) {
		this.tavolaRepo = tavolaRepo;
	}

	public Tavola create(TavolaRequestBody body) {

		Tavola nuovaTavola = new Tavola(body.getDescrizione(), body.getAnno(), body.getUrl(), body.getTitolo());
		return tavolaRepo.save(nuovaTavola);
	}

	public Page<Tavola> find(int page, int size, String sort) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
		return tavolaRepo.findAll(pageable);
	}

	public List<Tavola> findNoPage() {
		return tavolaRepo.findAll();
	}

	public Tavola findById(UUID id) throws NotFoundException {
		return tavolaRepo.findById(id).orElseThrow(
				() -> new NotFoundException("La tavola di Leonardo con id: " + id + " non è stata trovata"));
	}

	public Tavola findByIdAndUpdate(UUID id, TavolaRequestBody body) throws NotFoundException {
		Tavola found = this.findById(id);
		found.setAnno(body.getAnno());;
		found.setDescrizione(body.getDescrizione());;
		found.setUrl(body.getUrl());

		return tavolaRepo.save(found);
	}

	public void findByIdAndDelete(UUID id) throws NotFoundException {
		Tavola found = this.findById(id);
		tavolaRepo.delete(found);
	}


}
