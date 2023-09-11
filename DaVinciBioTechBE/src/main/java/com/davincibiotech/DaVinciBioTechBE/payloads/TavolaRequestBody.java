package com.davincibiotech.DaVinciBioTechBE.payloads;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TavolaRequestBody {
	@NotNull(message = "La descrizione è obbligatoria")
	@Column(name = "descrizione", length = 1024)
	private String descrizione;
	@NotNull(message = "Il titolo è obbligatorio")
	private String titolo;
	@NotNull(message = "L'anno è obbligatorio")
	private int anno;
	@NotNull(message = "L'url è obbligatorio")
	private String url;

	public TavolaRequestBody(String descrizione, int anno, String url, String titolo) {

		this.descrizione = descrizione;
		this.anno = anno;
		this.url = url;
		this.titolo = titolo;
	}



}
