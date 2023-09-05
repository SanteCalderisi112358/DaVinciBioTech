package com.davincibiotech.DaVinciBioTechBE.payloads;

import com.davincibiotech.DaVinciBioTechBE.entities.TipoUtente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UtenteRequestBody {

	// @NotNull(message = "Il nome è obbligatorio")
	private String nome;
	// @NotNull(message = "Il cognome è obbligatorio")
	private String cognome;
//	@NotNull(message = "L'email è obbligatoria")
//	@Email(message = "L'email inserita è in un formato non valido")
	private String email;
//	@NotNull(message = "La password è obbligatoria")
//	@Size(min = 3, max = 30, message = "La password deve avere minimo 8 caratteri, massimo 30")
	private String password;
	private TipoUtente ruolo;

	public UtenteRequestBody(
			 @NotNull(message = "Il nome è obbligatorio")
			String nome,
			@NotNull(message = "Il cognome è obbligatorio")
			String cognome,
			@NotNull(message = "L'email è obbligatoria") @Email(message = "L'email inserita è in un formato valido")
			String email,
			@NotNull(message = "La password è obbligatoria") @Size(min = 3, max = 30,
			 message = "La password deve avere minimo 8 caratteri, massimo 30")
			String password) {

		this.nome = nome;
		this.cognome = cognome;
		this.email = email;
		this.password = password;

	}



	@Override
	public String toString() {
		return "UtenteRequestBody [nome=" + nome + ", cognome=" + cognome + ", email=" + email + ", password="
				+ password + ", ruolo=" + ruolo + "]";
	}

}
