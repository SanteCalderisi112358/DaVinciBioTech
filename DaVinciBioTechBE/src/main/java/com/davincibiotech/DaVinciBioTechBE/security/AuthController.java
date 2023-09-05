package com.davincibiotech.DaVinciBioTechBE.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.davincibiotech.DaVinciBioTechBE.entities.Utente;
import com.davincibiotech.DaVinciBioTechBE.exceptions.UnauthorizedException;
import com.davincibiotech.DaVinciBioTechBE.payloads.LoginSuccessfullPayload;
import com.davincibiotech.DaVinciBioTechBE.payloads.UtenteLoginPayload;
import com.davincibiotech.DaVinciBioTechBE.payloads.UtenteRequestBody;
import com.davincibiotech.DaVinciBioTechBE.services.UtenteService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	UtenteService usersService;

	@Autowired
	JWTTools jwtTools;

	@Autowired
	PasswordEncoder bcrypt;

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public Utente saveUser(@RequestBody @Validated UtenteRequestBody body) {
		body.setPassword(bcrypt.encode(body.getPassword()));
		// body.setCreditCard("1234123412341234");
		Utente created = usersService.createUser(body);

		return created;
	}

	@PostMapping("/login")
	public LoginSuccessfullPayload login(@RequestBody UtenteLoginPayload body) {
		// 1. Verifichiamo che l'email dell'utente sia presente nel db

		Utente utente = usersService.findByEmail(body.getEmail());

		// 2. In caso affermativo, devo verificare che la pw corrisponda a quella
		// trovata nel db
		if (bcrypt.matches(body.getPassword(), utente.getPassword())) {

			// 3. Se le credenziali sono OK --> genero un JWT e lo invio come risposta
			String token = jwtTools.createToken(utente);
			return new LoginSuccessfullPayload(token);

		} else {
			// 4. Se le credenziali NON sono OK --> 401
			throw new UnauthorizedException("Credenziali non valide!");
		}
	}

}
