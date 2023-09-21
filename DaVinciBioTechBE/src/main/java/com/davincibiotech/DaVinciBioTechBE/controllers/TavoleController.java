package com.davincibiotech.DaVinciBioTechBE.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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
import org.springframework.web.multipart.MultipartFile;

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
//	@PostMapping
//	@PreAuthorize("hasAuthority('ADMIN')")
//	public Tavola createTavola(@RequestBody TavolaRequestBody body) {
//		return tavolaSrv.create(body);
//	}

	/* PROVA PERCORSO E NON URL */
	@PostMapping
	@PreAuthorize("hasAuthority('ADMIN')")
	public Tavola create(TavolaRequestBody body, MultipartFile file) throws BadRequestException {

		TavolaRequestBody nuovaTavola = new TavolaRequestBody(body.getDescrizione(), body.getAnno(), body.getUrl(),
				body.getTitolo());

		try {
			String fileName = file.getOriginalFilename();
			Path path = Paths.get("uploads/tavola", fileName);
			Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

			nuovaTavola.setUrl(path.toString());

			return tavolaSrv.create(nuovaTavola);
		} catch (IOException e) {
			e.printStackTrace();
			throw new BadRequestException("Upload Immagine errato");
		}
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
		System.err.println("Elimina tavola con id: " + tavolaId);
		Tavola tavolaDaEliminare = tavolaSrv.findById(tavolaId);
		tavolaSrv.findByIdAndDelete(tavolaId);
		throw new BadRequestException(
				"La tavola '" + tavolaDaEliminare.getTitolo() + "' è stata eliminata con successo!");
	}

}
