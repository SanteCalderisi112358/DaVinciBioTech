package com.davincibiotech.DaVinciBioTechBE.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davincibiotech.DaVinciBioTechBE.entities.Tavola;
import com.davincibiotech.DaVinciBioTechBE.services.TavolaService;

@RestController
@RequestMapping("/home")
public class HomeController {
	private final TavolaService tavolaSrv;

	@Autowired
	public HomeController(TavolaService tavolaSrv) {
		this.tavolaSrv = tavolaSrv;
	}

//	@GetMapping
//	public Page<Tavola> getTavole(@RequestParam(defaultValue = "0") int page,
//			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
//		System.err.println("Sto vedendo le tavole");
//		return tavolaSrv.find(page, size, sortBy);
//	}

	@GetMapping
	public List<Tavola> getTavole() {
		return tavolaSrv.findNoPage();
	}

	@GetMapping("/{tavolaId}")
	public Tavola findById(@PathVariable UUID tavolaId) {
		System.err.println("Sto vedendo la tavola con id: " + tavolaId);
		return tavolaSrv.findById(tavolaId);

	}
}
