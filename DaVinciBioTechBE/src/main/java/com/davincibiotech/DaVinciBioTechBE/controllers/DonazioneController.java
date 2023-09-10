package com.davincibiotech.DaVinciBioTechBE.controllers;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.davincibiotech.DaVinciBioTechBE.payloads.DonazioneRequestBody;
import com.davincibiotech.DaVinciBioTechBE.services.DonazioneService;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

@RestController
@RequestMapping("/donazioni")
public class DonazioneController {

	@Value("${sendgrid.key}")
	private String key;

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
	public Donazione createDonazione(@RequestBody @Validated DonazioneRequestBody body) throws IOException {
		body.setData(LocalDate.now());
		
		
		Utente donatore = body.getUtente();
		Email from = new Email("santecalderisi@gmail.com");
		String subject = "Grazie per la tua donazione, " + donatore.getNome();
		Email to = new Email(donatore.getEmail());
		String emailHtml = "<!DOCTYPE html>\r\n" + "<html>\r\n" + "<head>\r\n"
				+ "    <title>Grazie per la tua donazione</title>\r\n" + "</head>\r\n" + "<body>\r\n"
				+ "    <table align=\"center\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" style=\"border: 1px solid #ccc; border-collapse: collapse;\">\r\n"
				+ "        <tr>\r\n"
				+ "            <td style=\"background-color: #f2f2f2; padding: 20px; text-align: center;\">\r\n"
				+ "                <img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Leonardo_self.jpg/220px-Leonardo_self.jpg\" alt=\"Logo\" width=\"150\">\r\n"
				+ "            </td>\r\n" + "        </tr>\r\n" + "        <tr>\r\n"
				+ "            <td style=\"padding: 20px;\">\r\n"
				+ "                <h1>Grazie per la tua donazione, {NOME_UTENTE}</h1>\r\n"
				+ "                <p>La tua donazione di {IMPORTO_DONAZIONE} € è un passo fondamentale per la conservazione e il restauro delle preziose tavole di Leonardo da Vinci.</p>\r\n"
				+ "                <!-- Altri segnaposto per i dati dell'utente -->\r\n"
				+ "                <p>Grazie ancora per essere parte della nostra missione. Senza il tuo supporto, non sarebbe possibile.</p>\r\n"
				+ "                <p>Con gratitudine,<br>Sante Calderisi<br>Fondatore, DaVinciBioTech</p>\r\n"
				+ "            </td>\r\n" + "        </tr>\r\n" + "        <tr>\r\n"
				+ "            <td style=\"background-color: #f2f2f2; padding: 20px; text-align: center;\">\r\n"
				+ "                <p style=\"color: #888;\">© 2023 DaVinciBioTech. Tutti i diritti riservati.</p>\r\n"
				+ "            </td>\r\n" + "        </tr>\r\n" + "    </table>\r\n" + "</body>\r\n" + "</html>";
		emailHtml = emailHtml.replace("{NOME_UTENTE}", donatore.getNome());
		emailHtml = emailHtml.replace("{IMPORTO_DONAZIONE}", String.valueOf(body.getImporto()));
		// Altri sostituti per altri dati dell'utente

		Content content = new Content("text/html", emailHtml);
//		Content content = new Content("text/plain", "Gentile " + donatore.getNome() + ",\r\n" + "\r\n"
//				+ "grazie di cuore per il tuo generoso contributo a DaVinciBioTech! La tua donazione di "
//				+ body.getImporto()
//				+ " € è un passo fondamentale per la conservazione e il restauro delle preziose tavole di Leonardo da Vinci.\r\n"
//				+ "\r\n"
//				+ "Il tuo sostegno ci permette di preservare non solo l'eredità artistica di Leonardo, ma anche la sua visione pionieristica nel campo delle artoprotesi e degli strumenti biomedici. È grazie a persone come te che possiamo rendere omaggio al genio di Leonardo e contribuire al progresso della scienza e della medicina.\r\n"
//				+ "\r\n"
//				+ "Grazie ancora per essere parte della nostra missione. Senza il tuo supporto, non sarebbe possibile.\r\n"
//				+ "\r\n" + "Con gratitudine,\r\n" + "Sante Calderisi\r\n" + "Fondatore, DaVinciBioTech\r\n" + "");
		Mail mail = new Mail(from, subject, to, content);
		SendGrid sg = new SendGrid(this.key);
		Request request = new Request();
		try {
			request.setMethod(Method.POST);
			request.setEndpoint("mail/send");
			request.setBody(mail.build());
			Response response = sg.api(request);
			System.out.println(response.getStatusCode());
			System.out.println(response.getBody());
			System.out.println(response.getHeaders());
		} catch (IOException ex) {
			throw ex;
		}

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

	/* METODI CUSTOM PER IL BACK-OFFICE DI UN ADMIN */
	@GetMapping("/somma-importi")
	@PreAuthorize("hasAuthority('ADMIN')")
	public BigDecimal getSommaDonazioniPerPeriodo(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInizio,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFine) {
		BigDecimal donazioniTotaliPerPeriodo = donazioneSrv.getSommaDonazioniPerPeriodo(dataInizio, dataFine);
		if (donazioniTotaliPerPeriodo != null) {
			System.err.println(donazioniTotaliPerPeriodo);

			return donazioneSrv.getSommaDonazioniPerPeriodo(dataInizio, dataFine);

		} else {
			System.err.println(BigDecimal.ZERO);
			throw new BadRequestException("Non ci sono donazioni nel periodo scelto");
		}
	}

}
