package com.davincibiotech.DaVinciBioTechBE.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // mi permette di dichiarare su ogni singolo endpoint i permessi di accesso in
						// base al ruolo dell'utente (preAuthorize annotation)
public class SecurityConfig {
	@Autowired
	JWTAuthFilter jwtFilter;
//	@Autowired
//	CorsFilter corsFilter;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// http.cors(c -> c.disable());

		http.csrf(c -> c.disable());
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		http.authorizeHttpRequests(auth -> auth.requestMatchers("/utenti/**").authenticated());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/donazioni/**").authenticated());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/tavole/**").permitAll());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**").permitAll());
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		// http.addFilterBefore(corsFilter, JWTAuthFilter.class);

		return http.build();
	}

	@Bean
	PasswordEncoder encoder() {
		return new BCryptPasswordEncoder(11); // 11 è il cosiddetto numero di ROUNDS ovvero quante volte viene eseguito
												// l'algoritmo. In pratica ci serve per settare la velocità di
												// esecuzione dell'algoritmo (+ è alto il numero, + lento l'algoritmo)
	}

}
