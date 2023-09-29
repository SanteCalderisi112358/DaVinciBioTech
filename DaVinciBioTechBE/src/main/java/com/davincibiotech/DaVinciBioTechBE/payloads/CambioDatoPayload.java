package com.davincibiotech.DaVinciBioTechBE.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CambioDatoPayload {
	private String dato;

	public CambioDatoPayload(String dato) {
		this.dato = dato;
	}

	@Override
	public String toString() {
		return "CambioNome [nome=" + dato + "]";
	}

}
