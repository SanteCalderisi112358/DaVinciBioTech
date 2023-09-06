package com.davincibiotech.DaVinciBioTechBE.payloads;

import com.davincibiotech.DaVinciBioTechBE.entities.TipoUtente;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class LoginSuccessfullPayload {
	private String accessToken;
	private TipoUtente ruolo;
}
