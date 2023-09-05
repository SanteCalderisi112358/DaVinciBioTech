package com.davincibiotech.DaVinciBioTechBE.payloads;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TavolaRequestBody {
	@NotNull(message = "La descrizione è obbligatoria")
	private String descrizione;
	@NotNull(message = "L'anno è obbligatorio")
	private int anno;
	@NotNull(message = "La tecnica è obbligatoria")
	private String tecnica;
	@NotNull(message = "L'url è obbligatorio")
	private String url;

	public TavolaRequestBody(String descrizione, int anno, String tecnica, String url) {

		this.descrizione = descrizione;
		this.anno = anno;
		this.tecnica = tecnica;
		this.url = url;
	}

}
