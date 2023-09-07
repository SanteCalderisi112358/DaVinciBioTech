package com.davincibiotech.DaVinciBioTechBE.exceptions;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ErrorsPayloadWithList {

	private Date timestamp;
	private List<String> errorsList;
}
