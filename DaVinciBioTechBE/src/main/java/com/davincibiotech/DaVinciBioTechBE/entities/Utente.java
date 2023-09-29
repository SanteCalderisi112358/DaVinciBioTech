package com.davincibiotech.DaVinciBioTechBE.entities;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "utenti")
@NoArgsConstructor
@JsonIgnoreProperties({
		// "password",
		"accountNonExpired", "authorities", "credentialsNonExpired", "accountNonLocked",
		"username", "enabled" })
public class Utente implements UserDetails {
	@Id
	@GeneratedValue
	private UUID id;
	private String nome;
	private String cognome;
	@Column(nullable = false, unique = true)
	private String email;
	private String password;
	@Enumerated(EnumType.STRING)
	private TipoUtente ruolo;

//	@Convert(converter = CreditCardConverter.class)
//	private String creditCard;

	public Utente(String nome, String cognome, String email, String password) {
		this.nome = nome;
		this.cognome = cognome;
		this.email = email;
		this.password = password;
		this.ruolo = TipoUtente.USER;
		// this.creditCard = creditCard;
	}


	public Utente(String nome, String cognome, String email, String password, TipoUtente ruolo) {

		this.nome = nome;
		this.cognome = cognome;
		this.email = email;
		this.password = password;
		this.ruolo = ruolo;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(ruolo.name()));
	}

	@Override
	public String getPassword() {

		return this.password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public String toString() {
		return "Utente [id=" + id + ", nome=" + nome + ", cognome=" + cognome + ", email=" + email + ", password="
				+ password + ", ruolo=" + ruolo + "]";
	}


	public UUID getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public String getCognome() {
		return cognome;
	}

	public String getEmail() {
		return email;
	}

	public TipoUtente getRuolo() {
		return ruolo;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setRuolo(TipoUtente ruolo) {
		this.ruolo = ruolo;
	}

}

