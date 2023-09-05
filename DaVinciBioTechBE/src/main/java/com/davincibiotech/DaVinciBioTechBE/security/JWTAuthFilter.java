package com.davincibiotech.DaVinciBioTechBE.security;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.davincibiotech.DaVinciBioTechBE.entities.Utente;
import com.davincibiotech.DaVinciBioTechBE.exceptions.UnauthorizedException;
import com.davincibiotech.DaVinciBioTechBE.services.UtenteService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

	@Autowired
	JWTTools jwttools;
	@Autowired
	UtenteService usersService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader = request.getHeader("Authorization");

		if (authHeader == null || !authHeader.startsWith("Bearer "))
			throw new UnauthorizedException("Per favore passa il token nell'authorization header");
		String token = authHeader.substring(7);
		System.out.println("TOKEN -------> " + token);

		// 2. Verifico che il token non sia nè scaduto nè sia stato manipolato
		jwttools.verifyToken(token);

		// 3. Se è tutto OK

		// 3.1 Cerco l'utente tramite id (l'id sta nel token quindi devo estrarlo da lì)
		String id = jwttools.extractSubject(token);
		Utente currentUser = usersService.findById(UUID.fromString(id));

		// 3.2 Segnaliamo a Spring Security che l'utente ha il permesso di procedere
		// Se non facciamo questa procedura, ci verrà tornato 403

		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(currentUser, null,
				currentUser.getAuthorities());

		SecurityContextHolder.getContext().setAuthentication(authToken);

		// 3.3 Puoi procedere al prossimo blocco della filter chain
		filterChain.doFilter(request, response);

		// 4. Se non è OK --> 401 ("Per favore effettua di nuovo il login")
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		System.out.println(request.getServletPath());
		// Serve per bypassare questo filtro per alcune richieste (tipo tutte quelle su
		// /auth/**)
		return new AntPathMatcher().match("/auth/**", request.getServletPath());
	}

}