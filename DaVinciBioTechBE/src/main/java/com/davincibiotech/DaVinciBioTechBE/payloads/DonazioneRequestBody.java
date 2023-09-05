package com.davincibiotech.DaVinciBioTechBE.payloads;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.davincibiotech.DaVinciBioTechBE.entities.Utente;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DonazioneRequestBody {
	@NotNull(message = "Importo obbligatorio")
	private BigDecimal importo;
	@NotNull(message = "Data obbligatoria")
	private LocalDate data;
	@NotNull(message = "Utente obbligatorio")
	private Utente utente;

	public DonazioneRequestBody(@NotNull(message = "Importo obbligatorio") BigDecimal bigDecimal,
			@NotNull(message = "Data obbligatoria") LocalDate data,
			@NotNull(message = "Utente obbligatorio") Utente utente) {
		super();
		this.importo = bigDecimal;
		this.data = data;
		this.utente = utente;
	}

}
