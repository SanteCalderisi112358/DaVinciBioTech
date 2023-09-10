package com.davincibiotech.DaVinciBioTechBE.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sendgrid.SendGrid;

@Configuration
public class SendGridConfig {
	@Value("${SENDGRID_API_KEY}")
	private String key;

	@Bean
	public SendGrid getSendGrid() {
		return new SendGrid(key);
	}
}