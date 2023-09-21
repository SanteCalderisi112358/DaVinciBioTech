package com.davincibiotech.DaVinciBioTechBE.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.davincibiotech.DaVinciBioTechBE.entities.Utente;
import com.davincibiotech.DaVinciBioTechBE.exceptions.NotFoundException;
import com.davincibiotech.DaVinciBioTechBE.exceptions.UnauthorizedException;
import com.davincibiotech.DaVinciBioTechBE.payloads.LoginSuccessfullPayload;
import com.davincibiotech.DaVinciBioTechBE.payloads.RecuperoPasswordRequestBody;
import com.davincibiotech.DaVinciBioTechBE.payloads.UtenteLoginPayload;
import com.davincibiotech.DaVinciBioTechBE.payloads.UtenteRequestBody;
import com.davincibiotech.DaVinciBioTechBE.services.UtenteService;
import com.github.javafaker.Faker;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	UtenteService usersService;

	@Autowired
	JWTTools jwtTools;

	@Autowired
	PasswordEncoder bcrypt;

	Faker f = new Faker();
	@Value("${sendgrid.key}")
	private String key;

	@PostMapping("/registrazione")
	@ResponseStatus(HttpStatus.CREATED)
	public Utente saveUser(@RequestBody @Validated UtenteRequestBody body) {
		body.setPassword(bcrypt.encode(body.getPassword()));
		// body.setCreditCard("1234123412341234");
		Utente created = usersService.createUser(body);

		return created;
	}

	// @PreAuthorize("hasAuthority('ADMIN')")
//	@PostMapping("/registrazione-admin")
//	@ResponseStatus(HttpStatus.CREATED)
//	public Utente saveAdmin(@RequestBody @Validated UtenteRequestBody body) {
//		body.setPassword(bcrypt.encode(body.getPassword()));
//		// body.setCreditCard("1234123412341234");
//		Utente created = usersService.createAdmin(body);
//
//		return created;
//	}

	@PostMapping("/login")
	public ResponseEntity<LoginSuccessfullPayload> login(@RequestBody UtenteLoginPayload body)
			throws UnauthorizedException, NotFoundException {
		System.err.println("Email: " + body.getEmail());
		System.err.println("Password: " + body.getPassword());
		Utente user = usersService.findByEmail(body.getEmail());
		System.err.println(user.toString());
		System.err.println(user.getPassword());
		if (user == null) {

			throw new NotFoundException("Utente non trovato");
		} else {
			if (bcrypt.matches(body.getPassword(), user.getPassword())) {

			String token = jwtTools.createToken(user);
			Utente utente = user;

			LoginSuccessfullPayload loginAvvenuto = new LoginSuccessfullPayload(token, utente);
			return new ResponseEntity<>(loginAvvenuto, HttpStatus.OK);

		} else {

			throw new UnauthorizedException("Credenziali non valide!");
		}
	}

	}
	
	@PutMapping("/recupera-password")
	private Utente recuperaPassword(@RequestBody RecuperoPasswordRequestBody email) throws IOException {
		Utente user = usersService.findByEmail(email.getEmail());
		String stringaCasuale = "S" + f.artist() + f.number().numberBetween(1, 10);
		String nuovaPassword = bcrypt.encode(stringaCasuale);
		String nuovaPasswordCrypt = bcrypt.encode(nuovaPassword);
		UtenteRequestBody body = new UtenteRequestBody(user.getNome(), user.getCognome(), email.getEmail(),
				nuovaPasswordCrypt, user.getRuolo());
		Email from = new Email("santecalderisi@gmail.com");
		String subject = "Ripristina la tua password, " + user.getNome();
		Email to = new Email(user.getEmail());
		String emailHtml = "<!DOCTYPE html>\r\n" + "<html>\r\n" + "<head>\r\n"
				+ "    <title>Ripristino Password</title>\r\n" + "</head>\r\n" + "<body>\r\n"
				+ "    <table align=\"center\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" style=\"border: 1px solid #ccc; border-collapse: collapse;\">\r\n"
				+ "        <tr>\r\n"
				+ "            <td style=\"background-color: #f2f2f2; padding: 20px; text-align: center;\">\r\n"
				+ "                <img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Leonardo_self.jpg/220px-Leonardo_self.jpg\" alt=\"Logo\" width=\"150\">\r\n"
				+ "            </td>\r\n" + "        </tr>\r\n" + "        <tr>\r\n"
				+ "            <td style=\"padding: 20px;\">\r\n" + "                <h1>Ripristino Password</h1>\r\n"
				+ "                <p>Ciao {NOME_UTENTE},</p>\r\n"
				+ "                <p>La tua password è stata ripristinata con successo. Ora puoi accedere al tuo account con la seguente password temporanea:</p>\r\n"
				+ "                <p><strong>{NUOVA_PASSWORD}</strong></p>\r\n"
				+ "                <p>Dopo aver effettuato l'accesso, ti consigliamo di cambiare la tua password temporanea con una nuova password sicura.</p>\r\n"
				+ "                <p>Grazie per aver scelto di utilizzare i nostri servizi. Se hai domande o hai bisogno di ulteriore assistenza, non esitare a contattarci.</p>\r\n"
				+ "                <p>Con gratitudine,<br>Sante Calderisi<br>Fondatore, DaVinciBioTech</p>\r\n"
				+ "            </td>\r\n" + "        </tr>\r\n" + "        <tr>\r\n"
				+ "            <td style=\"background-color: #f2f2f2; padding: 20px; text-align: center;\">\r\n"
				+ "                <p style=\"color: #888;\">© 2023 DaVinciBioTech. Tutti i diritti riservati.</p>\r\n"
				+ "            </td>\r\n" + "        </tr>\r\n" + "    </table>\r\n" + "</body>\r\n" + "</html>\r\n"
				+ "";
		emailHtml = emailHtml.replace("{NOME_UTENTE}", user.getNome());
		emailHtml = emailHtml.replace("{NUOVA_PASSWORD}", nuovaPassword);

		Content content = new Content("text/html", emailHtml);
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
		return usersService.findByIdAndUpdateForNewPassword(user.getId(), body);

	}

}
