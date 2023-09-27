package com.davincibiotech.DaVinciBioTechBE.payloads;

import jakarta.persistence.Column;


public class TavolaRequestBody {

	@Column(name = "descrizione", length = 1024)
	private String descrizione;
	private String titolo;
	private int anno;
	private String url;

	public TavolaRequestBody(String descrizione, int anno, String url, String titolo) {

		this.descrizione = descrizione;
		this.anno = anno;
		this.url = url;
		this.titolo = titolo;
	}

	public String getDescrizione() {
		return descrizione;
	}

	public String getTitolo() {
		return titolo;
	}

	public int getAnno() {
		return anno;
	}

	public String getUrl() {
		return url;
	}

	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}

	public void setTitolo(String titolo) {
		this.titolo = titolo;
	}

	public void setAnno(int anno) {
		this.anno = anno;
	}

	public void setUrl(String url) {
		this.url = url;
	}


}
