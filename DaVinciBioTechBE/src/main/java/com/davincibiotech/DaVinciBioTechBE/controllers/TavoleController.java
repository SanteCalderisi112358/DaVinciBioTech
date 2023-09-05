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
		return tavolaSrv.find(page, size, sortBy);
	}

	@GetMapping("/{tavolaId}")
	public Tavola findById(@PathVariable UUID tavolaId) {
		return tavolaSrv.findById(tavolaId);

	}

	@PostMapping
	@PreAuthorize("hasAuthority('ADMIN')")
	public Tavola createTavola(@RequestBody TavolaRequestBody body) {
		return tavolaSrv.create(body);
	}
	@PutMapping("/{tavolaId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public Tavola updateTavola(@PathVariable UUID tavolaId, @RequestBody TavolaRequestBody body) {
		return tavolaSrv.findByIdAndUpdate(tavolaId, body);
	}

	@DeleteMapping("/{tavolaId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ADMIN')")
	public void deleteTavola(@PathVariable UUID tavolaId) {
		tavolaSrv.findByIdAndDelete(tavolaId);
	}

}
