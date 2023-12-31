package com.davincibiotech.DaVinciBioTechBE.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
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
import com.davincibiotech.DaVinciBioTechBE.entities.Utente;
import com.davincibiotech.DaVinciBioTechBE.exceptions.BadRequestException;
import com.davincibiotech.DaVinciBioTechBE.payloads.CambioDatoPayload;
import com.davincibiotech.DaVinciBioTechBE.payloads.CambioPasswordPayload;
import com.davincibiotech.DaVinciBioTechBE.payloads.UtenteRequestBody;
import com.davincibiotech.DaVinciBioTechBE.services.DonazioneService;
import com.davincibiotech.DaVinciBioTechBE.services.UtenteService;

@RestController
@RequestMapping("/utenti")
public class UtenteController {
	@Autowired
	DonazioneService donazioneSrv;
	private final UtenteService utenteSrv;

	@Autowired
	PasswordEncoder bcrypt;

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
	@PreAuthorize("hasAuthority('ADMIN')")
	public Utente findById(@PathVariable UUID userId) {
		return utenteSrv.findById(userId);

	}


	@PutMapping("/{userId}")
	@PreAuthorize("hasAuthority('ADMIN')")
	public Utente updateUtenteAdmin(@PathVariable UUID userId, @RequestBody UtenteRequestBody body) {
		return utenteSrv.findByIdAndUpdate(userId, body);

	}

	// PUT NOME UTENTE BY USER
	@PutMapping("/utente-cambio-nome/{userId}")
	public Utente updateUtenteNome(@PathVariable UUID userId, @RequestBody CambioDatoPayload nome) {

		Utente utente = utenteSrv.findById(userId);
		UtenteRequestBody body = new UtenteRequestBody(nome.getDato(), utente.getCognome(), utente.getEmail(),
				utente.getPassword(), utente.getRuolo());
		return utenteSrv.findByIdAndUpdate(userId, body);

	}

	// PUT COGNOME UTENTE BY USER
	@PutMapping("/utente-cambio-cognome/{userId}")
	public Utente updateUtenteCognome(@PathVariable UUID userId, @RequestBody CambioDatoPayload nome) {

		Utente utente = utenteSrv.findById(userId);
		UtenteRequestBody body = new UtenteRequestBody(utente.getNome(), nome.getDato(), utente.getEmail(),
				utente.getPassword(), utente.getRuolo());
		return utenteSrv.findByIdAndUpdate(userId, body);

	}

	// PUT PASSWORD UTENTE BY USER
	@PutMapping("/utente-cambio-password/{userId}")
	public Utente updateUtentepassword(@PathVariable UUID userId,
			@RequestBody @Validated CambioPasswordPayload password) {
		System.err.println("Vecchia password" + password.getPassword().toString());
		Utente utente = utenteSrv.findById(userId);
		String passwordCript = bcrypt.encode(password.getPassword());
		System.err.println("Nuova password" + passwordCript);
		UtenteRequestBody body = new UtenteRequestBody(utente.getNome(), utente.getCognome(), utente.getEmail(),
				passwordCript, utente.getRuolo());
		return utenteSrv.findByIdAndUpdateForNewPassword(userId, body);

	}

	/*
	 * @PutMapping("/utente-cambio-nome/{userId}/{nome}") public Utente
	 * updateUtenteUser(@PathVariable UUID userId, @PathVariable String nome) {
	 * 
	 * Utente utente = utenteSrv.findById(userId); UtenteRequestBody body = new
	 * UtenteRequestBody(nome, utente.getCognome(), utente.getEmail(),
	 * utente.getPassword(), utente.getRuolo());
	 * System.err.println(utente.getPassword()); return
	 * utenteSrv.findByIdAndUpdate(userId, body);
	 * 
	 * }
	 */
	@DeleteMapping("/{userId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ADMIN')")
	public void delete(@PathVariable UUID userId) throws BadRequestException {
		System.err.println(userId);
		Utente donatore = utenteSrv.findById(userId);
		List<Donazione> donazioniUtente = utenteSrv.getDonazioniByUtenteId(userId);
		if (donazioniUtente.isEmpty()) {
			utenteSrv.findByIdAndDelete(userId);
			throw new BadRequestException(
					"L'utente " + donatore.getNome() + " " + donatore.getCognome() + " è stato eliminato");
		} else {
			throw new BadRequestException(
					"L'utente " + donatore.getNome() + " " + donatore.getCognome()
							+ " ha eseguito delle donazioni. Vuoi eliminare anche le sue donazioni?");
		}

	}

	@PostMapping
	@PreAuthorize("hasAuthority('ADMIN')")
	public Utente createUtente(@RequestBody @Validated UtenteRequestBody body) {

		return utenteSrv.createFromAdmin(body);
	}

	@DeleteMapping("/only-utente/{userId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ADMIN')")
	public void deleteJustUtente(@PathVariable UUID userId) throws BadRequestException {
		Utente donatore = utenteSrv.findById(userId);
		List<Donazione> donazioniUtente = utenteSrv.getDonazioniByUtenteId(userId);
		if (!donazioniUtente.isEmpty()) {
			donazioniUtente.forEach(donazione -> {
				donazione.setUtente(null);
			});
			utenteSrv.findByIdAndDelete(userId);
			throw new BadRequestException(
					"L'utente " + donatore.getNome() + " " + donatore.getCognome()
							+ " è stato eliminato. Le sue donazioni no.");
		}

	}

	@DeleteMapping("/utente-and-donazioni/{userId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ADMIN')")
	public void deleteUtenteAndDonazioni(@PathVariable UUID userId) throws BadRequestException {
		Utente donatore = utenteSrv.findById(userId);
		List<Donazione> donazioniUtente = utenteSrv.getDonazioniByUtenteId(userId);
		if (!donazioniUtente.isEmpty()) {
			donazioniUtente.forEach(donazione -> {
				UUID donazioneId = donazione.getId();
				donazione.setUtente(null);
				donazioneSrv.findByIdAndDelete(donazioneId);

			});
			utenteSrv.findByIdAndDelete(userId);
			throw new BadRequestException("L'utente " + donatore.getNome() + " " + donatore.getCognome()
					+ " e le sue donazioni sono stati eliminati.");
		}

	}

	/* METODI PER ADMIN */
	@GetMapping("/utenti-con-donazioni")
	@PreAuthorize("hasAuthority('ADMIN')")
	public Page<Utente> getUtentiConDonazioni(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
		Page<Utente> utentiConDonazioni = utenteSrv.getUtentiConDonazioni(page, size, sortBy);

		if (utentiConDonazioni.isEmpty()) {
			throw new BadRequestException("Nessun utente ha effettuato donazioni");
		}
		return utentiConDonazioni;
	}

	@GetMapping("/{userId}/donazioni")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<List<Donazione>> getDonazioniByUtente(@PathVariable UUID userId) {
		List<Donazione> donazioni = utenteSrv.getDonazioniByUtenteId(userId);
		Utente utente = utenteSrv.findById(userId);
		if (!donazioni.isEmpty()) {
			return ResponseEntity.ok(donazioni);

		} else {
			throw new BadRequestException("L'utente " + utente.getNome() + " " + utente.getCognome()
					+ " non ha effettuato nessuna donazione");

		}
	}

}
