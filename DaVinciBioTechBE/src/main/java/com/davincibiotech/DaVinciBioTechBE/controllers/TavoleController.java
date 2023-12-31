package com.davincibiotech.DaVinciBioTechBE.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.davincibiotech.DaVinciBioTechBE.entities.Tavola;
import com.davincibiotech.DaVinciBioTechBE.exceptions.BadRequestException;
import com.davincibiotech.DaVinciBioTechBE.payloads.TavolaRequestBody;
import com.davincibiotech.DaVinciBioTechBE.services.TavolaService;
@RestController
@RequestMapping("/tavole-leonardo")
public class TavoleController {
	private final TavolaService tavolaSrv;

	@Autowired
	public TavoleController(TavolaService tavolaSrv) {
		this.tavolaSrv = tavolaSrv;
	}

	@GetMapping
	// @PreAuthorize("hasAuthority('ADMIN')")
	public Page<Tavola> getTavole(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
		System.err.println("Sto vedendo le tavole");
		return tavolaSrv.find(page, size, sortBy);
	}

	@GetMapping("/{tavolaId}")
	public Tavola findById(@PathVariable UUID tavolaId) {
		System.err.println("Sto vedendo la tavola con id: " + tavolaId);
		return tavolaSrv.findById(tavolaId);


	}

	/* UTILIZZO L'URL DA AWS */
	@PostMapping
	@PreAuthorize("hasAuthority('ADMIN')")
	public Tavola createTavola(@RequestBody TavolaRequestBody body) {
		return tavolaSrv.create(body);
	}

//	@PostMapping
//	@PreAuthorize("hasAuthority('ADMIN')")
//	public Tavola create(@RequestBody TavolaRequestBody body) {
//		System.err.println(body);
//		TavolaRequestBody nuovaTavola = new TavolaRequestBody(body.getDescrizione(), body.getAnno(), body.getUrl(),
//				body.getTitolo());
//
//
//			return tavolaSrv.create(nuovaTavola);
//		}

	@PutMapping("/{tavolaId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public Tavola updateTavola(@PathVariable UUID tavolaId, @RequestBody TavolaRequestBody body) {
		return tavolaSrv.findByIdAndUpdate(tavolaId, body);
	}

	@DeleteMapping("/{tavolaId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ADMIN')")
	public void deleteTavola(@PathVariable UUID tavolaId) {
		System.err.println("Elimina tavola con id: " + tavolaId);
		Tavola tavolaDaEliminare = tavolaSrv.findById(tavolaId);
		tavolaSrv.findByIdAndDelete(tavolaId);
		throw new BadRequestException(
				"La tavola '" + tavolaDaEliminare.getTitolo() + "' è stata eliminata con successo!");
	}

}
