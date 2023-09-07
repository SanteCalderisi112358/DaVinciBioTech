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
	@NotNull(message = "Inserire un importo per la donazione")
	private BigDecimal importo;
	private LocalDate data;
	private Utente utente;

	public DonazioneRequestBody() {

	}

	public DonazioneRequestBody(BigDecimal bigDecimal, LocalDate data, Utente utente) {
		super();
		this.importo = bigDecimal;
		this.data = data;
		this.utente = utente;
	}

}
