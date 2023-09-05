package com.davincibiotech.DaVinciBioTechBE.exceptions;

import java.util.UUID;

public class NotFoundException extends RuntimeException {
	public NotFoundException(String message) {
		super(message);
	}

	public NotFoundException(UUID id) {
		super(id + " non trovato!");
	}
}
