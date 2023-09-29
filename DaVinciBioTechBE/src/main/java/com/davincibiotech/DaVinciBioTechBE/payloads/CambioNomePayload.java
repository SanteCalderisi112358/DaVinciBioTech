package com.davincibiotech.DaVinciBioTechBE.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CambioNomePayload {
	private String nome;

	public CambioNomePayload(String nome) {
		this.nome = nome;
	}

	@Override
	public String toString() {
		return "CambioNome [nome=" + nome + "]";
	}

}
