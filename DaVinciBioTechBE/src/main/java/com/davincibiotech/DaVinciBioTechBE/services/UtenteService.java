package com.davincibiotech.DaVinciBioTechBE.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.davincibiotech.DaVinciBioTechBE.entities.Donazione;
import com.davincibiotech.DaVinciBioTechBE.entities.TipoUtente;
import com.davincibiotech.DaVinciBioTechBE.entities.Utente;
import com.davincibiotech.DaVinciBioTechBE.exceptions.BadRequestException;
import com.davincibiotech.DaVinciBioTechBE.exceptions.NotFoundException;
import com.davincibiotech.DaVinciBioTechBE.payloads.UtenteRequestBody;
import com.davincibiotech.DaVinciBioTechBE.repositories.UtenteRepository;

@Service
public class UtenteService {
	private final UtenteRepository usersRepo;


	@Autowired
	public UtenteService(UtenteRepository usersRepo) {
		this.usersRepo = usersRepo;
	}

	public Utente createUser(UtenteRequestBody body) {

		usersRepo.findByEmail(body.getEmail()).ifPresent(user -> {
			throw new BadRequestException("L'email è già stata utilizzata");
		});

		Utente newUser = new Utente(body.getNome(), body.getCognome(), body.getEmail(), body.getPassword());
		return usersRepo.save(newUser);

	}

	public Utente createAdmin(UtenteRequestBody body) {

		usersRepo.findByEmail(body.getEmail()).ifPresent(user -> {
			throw new BadRequestException("L'email è già stata utilizzata");
		});
		Utente newUser = new Utente(body.getNome(), body.getCognome(), body.getEmail(), body.getPassword(),
				TipoUtente.ADMIN);
		return usersRepo.save(newUser);

	}

	public List<Utente> findNoPage() {
		return usersRepo.findAll();
	}
	public Page<Utente> find(int page, int size, String sort) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
		return usersRepo.findAll(pageable);
	}

	public Utente findById(UUID id) throws NotFoundException {
		return usersRepo.findById(id)
				.orElseThrow(() -> new NotFoundException("L'utente con id: " + id + " non è stato trovato"));
	}

	public Utente findByIdAndUpdate(UUID id, UtenteRequestBody body) throws NotFoundException {
		Utente found = this.findById(id);
		found.setEmail(body.getEmail());
		found.setNome(body.getNome());
		found.setCognome(body.getCognome());
		found.setRuolo(body.getRuolo());

		return usersRepo.save(found);
	}

	public void findByIdAndDelete(UUID id) throws NotFoundException {
		Utente found = this.findById(id);
		usersRepo.delete(found);
	}

	public Utente findByEmail(String email) {
		return usersRepo.findByEmail(email)
				.orElseThrow(() -> new NotFoundException("Utente con email " + email + " non trovato"));
	}

	/* METODI PER ADMIN */
	public Page<Utente> getUtentiConDonazioni(int page, int size, String sort) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(sort));

		return (Page<Utente>) usersRepo.getUtentiDonatori(pageable);
	}

	public List<Donazione> getDonazioniByUtenteId(UUID userId) {
		this.findById(userId);
		return usersRepo.getDonazioniByUtenteId(userId);
	}

}
