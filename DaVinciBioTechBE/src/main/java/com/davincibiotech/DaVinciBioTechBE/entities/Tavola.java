package com.davincibiotech.DaVinciBioTechBE.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tavole_leonardo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Tavola {
	@Id
	@GeneratedValue
	private UUID id;
	@Column(length = 255)
	private String descrizione;
	private int anno;
	private String tecnica;
	private String url;

	@Override
	public String toString() {
		return "Tavola [id=" + id + ", descrizione=" + descrizione + ", anno=" + anno + ", tecnica=" + tecnica
				+ ", url=" + url + "]";
	}


	public Tavola(String descrizione, int anno, String tecnica, String url) {

		this.descrizione = descrizione;
		this.anno = anno;
		this.tecnica = tecnica;
		this.url = url;
	}

}
