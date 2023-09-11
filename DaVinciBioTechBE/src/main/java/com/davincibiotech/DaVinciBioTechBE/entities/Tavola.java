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
	private String titolo;
	@Column(columnDefinition = "TEXT")
	private String descrizione;
	private int anno;
	private String url;




	public Tavola(String descrizione, int anno, String url, String titolo) {

		this.descrizione = descrizione;
		this.anno = anno;
		this.url = url;
		this.titolo = titolo;
	}

	@Override
	public String toString() {
		return "Tavola [id=" + id + ", titolo=" + titolo + ", descrizione=" + descrizione + ", anno=" + anno + ", url="
				+ url + "]";
	}

}
