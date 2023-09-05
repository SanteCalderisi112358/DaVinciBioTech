package com.davincibiotech.DaVinciBioTechBE.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "donazioni")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Donazione {
	@Id
	@GeneratedValue
	private UUID id;
	private BigDecimal importo;
	private LocalDate data;
	@ManyToOne
	private Utente utente;

	@Override
	public String toString() {
		return "Donazione [id=" + id + ", importo=" + importo + ", data=" + data + ", utente=" + utente + "]";
	}

	public Donazione(BigDecimal importo, LocalDate data, Utente utente) {
		super();
		this.importo = importo;
		this.data = data;
		this.utente = utente;
	}

}
