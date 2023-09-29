package com.davincibiotech.DaVinciBioTechBE.payloads;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CambioPasswordPayload {

	@Pattern(regexp = ".*[a-z].*", message = "La password deve contenere almeno una lettera minuscola")
	@Pattern(regexp = ".*[A-Z].*", message = "La password deve contenere almeno una lettera maiuscola")
	@Pattern(regexp = ".*\\d.*", message = "La password deve contenere almeno un numero")
	@Size(min = 8, max = 30, message = "La password deve avere minimo 8 caratteri, massimo 30")
	private String password;

	public CambioPasswordPayload(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "CambioPasswordPayload [password=" + password + "]";
	}

}
