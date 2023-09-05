package com.davincibiotech.DaVinciBioTechBE.exceptions;

public class UnauthorizedException extends RuntimeException {
	public UnauthorizedException(String message) {
		super(message);
	}
}