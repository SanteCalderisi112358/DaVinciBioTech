package com.davincibiotech.DaVinciBioTechBE.payloads;

import com.davincibiotech.DaVinciBioTechBE.entities.Utente;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class LoginSuccessfullPayload {
	private String accessToken;
	private Utente utente;
}
