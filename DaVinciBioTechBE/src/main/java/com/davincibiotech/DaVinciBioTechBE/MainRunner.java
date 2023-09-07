package com.davincibiotech.DaVinciBioTechBE;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.davincibiotech.DaVinciBioTechBE.entities.Utente;
import com.davincibiotech.DaVinciBioTechBE.payloads.TavolaRequestBody;
import com.davincibiotech.DaVinciBioTechBE.payloads.UtenteRequestBody;
import com.davincibiotech.DaVinciBioTechBE.services.DonazioneService;
import com.davincibiotech.DaVinciBioTechBE.services.TavolaService;
import com.davincibiotech.DaVinciBioTechBE.services.UtenteService;
import com.github.javafaker.Faker;

@Component
public class MainRunner implements CommandLineRunner {
	@Autowired
	UtenteService utenteSrv;
	@Autowired
	TavolaService tavolaSrv;
	@Autowired
	DonazioneService donazioneSrv;
	@Autowired
	PasswordEncoder bcrypt;
	@Override
	public void run(String... args) throws Exception {
		Faker faker = new Faker(Locale.ITALIAN);

		/* CREAZIONE 10 UTENTI USER */
		for (int i = 0; i < 5; i++) {
			UtenteRequestBody nuovoUtenteUSER = new UtenteRequestBody(faker.name().firstName(), faker.name().lastName(),
					faker.internet().emailAddress(), bcrypt.encode("1234"));
			// utenteSrv.createUser(nuovoUtenteUSER);
		}
		/* CREAZIONE UTENTE ADMIN */

		UtenteRequestBody nuovoUtenteADMIN = new UtenteRequestBody();
		nuovoUtenteADMIN.setNome("Sante");
		nuovoUtenteADMIN.setCognome("Calderisi");
		nuovoUtenteADMIN.setEmail("santecalderisi@gmail.it");
		String password = "epicode";
		String passwordEncode = bcrypt.encode(password);
		nuovoUtenteADMIN.setPassword(passwordEncode);
		// utenteSrv.createAdmin(nuovoUtenteADMIN);

		/* CREAZIONE 15 TAVOLE LEONARDO */

		for (int i = 0; i < 15; i++) {
			TavolaRequestBody nuovaTavola = new TavolaRequestBody(faker.lorem().characters(),
					faker.number().numberBetween(1470, 1503), "Tecnica mista", faker.internet().url());
			// tavolaSrv.create(nuovaTavola);

		}

		List<Utente> utentiDB = new ArrayList<Utente>();
		utentiDB = utenteSrv.findNoPage();
		// utentiDB.forEach(ut -> System.err.println(ut.toString()));

		/* CREAZIONE 20 DONAZIONI */
//		for (int i = 0; i < 20; i++) {
//			double randomAmount = Math.floor(faker.number().numberBetween(10, 200)) / 2.0;
//			DonazioneRequestBody nuovaDonazione = new DonazioneRequestBody(BigDecimal.valueOf(randomAmount),
//					faker.date().past(30, TimeUnit.DAYS).toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
//					utentiDB.get(faker.number().numberBetween(0, utentiDB.size() - 1))
//			);

			// donazioneSrv.create(nuovaDonazione);
		}




}

