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

import com.davincibiotech.DaVinciBioTechBE.entities.Donazione;
import com.davincibiotech.DaVinciBioTechBE.payloads.DonazioneRequestBody;
import com.davincibiotech.DaVinciBioTechBE.services.DonazioneService;

@RestController
@RequestMapping("/donazioni")
public class DonazioneController {
	private final DonazioneService donazioneSrv;

	@Autowired
	public DonazioneController(DonazioneService donazioneSrv) {
		this.donazioneSrv = donazioneSrv;
	}

	@GetMapping
	@PreAuthorize("hasAuthority('ADMIN')")
	public Page<Donazione> getDonazioni(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
		return donazioneSrv.find(page, size, sortBy);
	}

	@GetMapping("/{donazioneId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public Donazione findById(@PathVariable UUID donazioneId) {
		return donazioneSrv.findById(donazioneId);

	}

	@PostMapping
	public Donazione createDonazione(@RequestBody DonazioneRequestBody body) {
		return donazioneSrv.create(body);
	}

	@PutMapping("/{donazioneId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public Donazione updateDonazione(@PathVariable UUID donazioneId, @RequestBody DonazioneRequestBody body) {
		return donazioneSrv.findByIdAndUpdate(donazioneId, body);
	}

	@DeleteMapping("/{donazioneId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ADMIN')")
	public void deleteDonazione(@PathVariable UUID donazioneId) {
		donazioneSrv.findByIdAndDelete(donazioneId);
	}

}
