package com.davincibiotech.DaVinciBioTechBE.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.davincibiotech.DaVinciBioTechBE.entities.Utente;
import com.davincibiotech.DaVinciBioTechBE.payloads.UtenteRequestBody;
import com.davincibiotech.DaVinciBioTechBE.services.UtenteService;

@RestController
@RequestMapping("/utenti")
public class UtenteController {
	private final UtenteService utenteSrv;

	@Autowired
	public UtenteController(UtenteService utenteSrv) {
		this.utenteSrv = utenteSrv;
	}

	@GetMapping
	@PreAuthorize("hasAuthority('ADMIN')")
	public Page<Utente> getUtenti(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
		return utenteSrv.find(page, size, sortBy);
	}

	@GetMapping("/{userId}")
	public Utente findById(@PathVariable UUID userId) {
		return utenteSrv.findById(userId);

	}


	@PutMapping("/{userId}")
	public Utente updateUtente(@PathVariable UUID userId, @RequestBody UtenteRequestBody body) {
		return utenteSrv.findByIdAndUpdate(userId, body);
	}

	@DeleteMapping("/{userId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUtente(@PathVariable UUID userId) {
		utenteSrv.findByIdAndDelete(userId);
	}

}
