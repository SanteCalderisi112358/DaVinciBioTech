package com.davincibiotech.DaVinciBioTechBE.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.davincibiotech.DaVinciBioTechBE.entities.Utente;
import com.davincibiotech.DaVinciBioTechBE.exceptions.NotFoundException;
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

	@PostMapping("/registrazione")
	@ResponseStatus(HttpStatus.CREATED)
	public Utente saveUser(@RequestBody @Validated UtenteRequestBody body) {
		body.setPassword(bcrypt.encode(body.getPassword()));
		// body.setCreditCard("1234123412341234");
		Utente created = usersService.createUser(body);

		return created;
	}

	// @PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/registrazione-admin")
	@ResponseStatus(HttpStatus.CREATED)
	public Utente saveAdmin(@RequestBody @Validated UtenteRequestBody body) {
		body.setPassword(bcrypt.encode(body.getPassword()));
		// body.setCreditCard("1234123412341234");
		Utente created = usersService.createAdmin(body);

		return created;
	}

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

			LoginSuccessfullPayload loginAvvenuto = new LoginSuccessfullPayload(token);
			return new ResponseEntity<>(loginAvvenuto, HttpStatus.OK);

		} else {

			throw new UnauthorizedException("Credenziali non valide!");
		}
	}

	}

}
