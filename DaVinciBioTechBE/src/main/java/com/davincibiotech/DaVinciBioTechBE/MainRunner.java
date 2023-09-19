package com.davincibiotech.DaVinciBioTechBE;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.davincibiotech.DaVinciBioTechBE.entities.Utente;
import com.davincibiotech.DaVinciBioTechBE.payloads.DonazioneRequestBody;
import com.davincibiotech.DaVinciBioTechBE.payloads.TavolaRequestBody;
import com.davincibiotech.DaVinciBioTechBE.payloads.UtenteRequestBody;
import com.davincibiotech.DaVinciBioTechBE.repositories.UtenteRepository;
import com.davincibiotech.DaVinciBioTechBE.services.DonazioneService;
import com.davincibiotech.DaVinciBioTechBE.services.TavolaService;
import com.davincibiotech.DaVinciBioTechBE.services.UtenteService;
import com.github.javafaker.Faker;

@Component
public class MainRunner implements CommandLineRunner {
	@Autowired
	UtenteRepository utenteRepo;
	@Autowired
	UtenteService utenteSrv;
	@Autowired
	TavolaService tavolaSrv;
	@Autowired
	DonazioneService donazioneSrv;
	@Autowired
	PasswordEncoder bcrypt;
	@Override
	public void run(String... args) throws Exception {
		Faker faker = new Faker(Locale.ITALIAN);

		/* CREAZIONE 60 UTENTI USER */
		for (int i = 0; i < 50; i++) {
			UtenteRequestBody nuovoUtenteUSER = new UtenteRequestBody(faker.name().firstName(), faker.name().lastName(),
					faker.internet().emailAddress(), bcrypt.encode("Santecalderisi89"));
			// utenteSrv.createUser(nuovoUtenteUSER);
		}
		/* CREAZIONE UTENTE ADMIN */

		UtenteRequestBody nuovoUtenteADMIN = new UtenteRequestBody();
		nuovoUtenteADMIN.setNome("Sante");
		nuovoUtenteADMIN.setCognome("Calderisi");
		nuovoUtenteADMIN.setEmail("santecalderisi@gmail.com");
		String password = "Santecalderisi89";
		String passwordEncode = bcrypt.encode(password);
		nuovoUtenteADMIN.setPassword(passwordEncode);
		// utenteSrv.createAdmin(nuovoUtenteADMIN);

		/* CREAZIONE TAVOLE LEONARDO */

		TavolaRequestBody DVBT_braccio_gomito = new TavolaRequestBody(
				"Questo disegno del 1498 mostra un cuscinetto a sfera progettato per migliorare l'articolazione del gomito. Questa soluzione innovativa potrebbe aver offerto maggiore comfort e supporto alle persone con problemi articolari.",
				1498, "https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_braccio.jpeg", "Protesi Gomito");
		TavolaRequestBody DVBT_protesi_anca = new TavolaRequestBody(
				"Questo disegno raffigura una protesi d'anca, dimostrando il genio di Leonardo nell'anticipare soluzioni biomeccaniche avanzate. Sorprendentemente simile alle protesi moderne, questo schizzo suggerisce la visione di Leonardo per migliorare la mobilità e la qualità della vita attraverso l'innovazione medica.",
				1506, "https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_anca.jpeg", "Protesi d'Anca");
		TavolaRequestBody DVBT_protesi_braccio = new TavolaRequestBody(
				"Questo disegno ritrae una protesi al braccio, progettata per migliorare la vita degli amputati. La sua innovativa concezione suggerisce l'ingegno di Leonardo nell'anticipare soluzioni per l'assistenza alla disabilità.",
				1497, "https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_braccio.jpeg",
				"Protesi al Braccio");
		TavolaRequestBody DVBT_protesi_dito_piede = new TavolaRequestBody(
				"Questo disegno, datato circa al 1494, rivela la genialità di Leonardo nel prevedere le sfide dell'artrosi nell'articolazione dell'alluce. La protesi, posizionata internamente, potrebbe offrire un sollievo innovativo per chi soffre di questo disturbo.",
				1494, "https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_dito_piede.jpeg",
				"Protesi per Articolazione dell'Alluce");
		TavolaRequestBody DVBT_protesi_gamba_steampunk = new TavolaRequestBody(
				"In questo disegno, Leonardo immagina una protesi per la gamba che potrebbe migliorare la vita degli amputati. L'idea di una protesi per la gamba riflette la sua visione pionieristica nell'aiutare le persone a superare le disabilità.",
				1496, "https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_gamba01.jpeg",
				"Protesi per la Gamba ");
		TavolaRequestBody DVBT_protesi_gamba = new TavolaRequestBody(
				"Nel 1498, Leonardo da Vinci progettò una protesi per la gamba innovativa, dotata di cerniere. Questa soluzione avanzata avrebbe consentito una maggiore flessibilità e comfort per gli amputati, dimostrando ancora una volta la sua genialità nel campo delle artoprotesi.",
				1498, "https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_gamba02.jpeg",
				"Protesi per la Gamba con Cerniere");
		TavolaRequestBody DVBT_protesi_ginocchio_ginocchiera = new TavolaRequestBody(
				"Nel 1500, Leonardo da Vinci progettò una rivoluzionaria ginocchiera esterna con ingranaggi. Questo dispositivo, basato sulla sua straordinaria ingegnosità, consentiva un controllo preciso dell'articolazione del ginocchio. Ogni ingranaggio era frutto di attenti studi per massimizzare efficienza e comfort. Leonardo anticipò di secoli l'evoluzione delle protesi e degli ausili ortopedici, dimostrando la sua dedizione a migliorare la vita delle persone con disabilità.",
				1500, "https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_ginocchio.jpeg",
				"Ginocchiera Esterna con Ingannaggi");
		TavolaRequestBody DVBT_protesi_ginocchio_interna = new TavolaRequestBody(
				"Leonardo da Vinci, nel corso del 1500, concepì un'innovativa protesi al ginocchio. Questo dispositivo mirava a lenire il disagio causato dall'usura della cartilagine, anticipando le sfide mediche contemporanee. Con una cura straordinaria per i dettagli, Leonardo sviluppò una soluzione meccanica elegante per migliorare la mobilità e ridurre il dolore articolare. La sua creatività senza limiti lo portò a progettare dispositivi che avrebbero potuto migliorare la vita delle persone, dimostrando la sua eterna ispirazione.",
				1500, "https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_interna_ginocchio.jpeg",
				"Protesi al Ginocchio");
		TavolaRequestBody DVBT_protesi_spalla_retro = new TavolaRequestBody(
				"Disegnata nel 1500, questa protesi rappresenta un notevole esempio dell'ingegnosità di Leonardo nell'ambito delle artoprotesi. Le sue capacità di osservazione e progettazione si fondono nella precisione di questa creazione. Il disegno rivela ingranaggi sofisticati e un design ergonomico che, in molti modi, anticipa le moderne soluzioni ortopediche. Guardando questo capolavoro, ci si rende conto del contributo di Leonardo non solo all'arte, ma anche alla scienza e alla medicina.",
				1498, "https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_spalla.jpeg",
				"Protesi alla Spalla - Vista Posteriore");
		TavolaRequestBody DVBT_protesi_spalla_frontale = new TavolaRequestBody(
				" Realizzato intorno al 1500, il dettaglio delle viti rappresenta un aspetto notevole di questa creazione. Leonardo ha previsto l'uso di viti per fissare la protesi in modo stabile, anticipando le moderne tecniche chirurgiche. Le somiglianze tra queste viti e quelle utilizzate oggi dimostrano la visione pionieristica di Leonardo nell'ambito delle artoprotesi. Questo disegno incarna la sua abilità nel coniugare arte, scienza e ingegneria, gettando le basi per l'evoluzione delle protesi ortopediche nel corso dei secoli.",
				1498, "https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_spalla_frontale.jpeg",
				"Protesi Spalla - Vista Anteriore");
		TavolaRequestBody DVBT_protesi_valvole_cardiache = new TavolaRequestBody(
				"Nel suo caratteristico stile dettagliato, Leonardo non si è limitato a illustrare le protesi, ma ha anche condotto studi sulla turbolenza del sangue in base alle diverse tipologie di valvole.Questo straordinario lavoro dimostra la sua straordinaria capacità di coniugare l'arte e la scienza. Leonardo aveva intuito che le valvole cardiache svolgono un ruolo cruciale nel mantenere il flusso sanguigno regolare nel cuore umano, e i suoi studi pionieristici sulla turbolenza del sangue anticipavano di secoli le ricerche moderne.",
				1497, "https://davincibiotech.s3.eu-central-1.amazonaws.com/DVBT_protesi_valvole_cardiache.jpeg",
				"Protesi Valcole Cardiache");
		TavolaRequestBody tavola_Test01 = new TavolaRequestBody("TAVOLA TEST 01", 0, password, passwordEncode);
		TavolaRequestBody tavola_Test02 = new TavolaRequestBody("TAVOLA TEST 02", 0, password, passwordEncode);
		TavolaRequestBody tavola_Test03 = new TavolaRequestBody("TAVOLA TEST 03", 0, password, passwordEncode);
		TavolaRequestBody tavola_Test04 = new TavolaRequestBody("TAVOLA TEST 04", 0, password, passwordEncode);

//		tavolaSrv.create(DVBT_braccio_gomito);
//		tavolaSrv.create(DVBT_protesi_anca);
//		tavolaSrv.create(DVBT_protesi_braccio);
//		tavolaSrv.create(DVBT_protesi_dito_piede);
		// tavolaSrv.create(DVBT_protesi_gamba);
//		tavolaSrv.create(DVBT_protesi_gamba_steampunk);
//		tavolaSrv.create(DVBT_protesi_ginocchio_ginocchiera);
//		tavolaSrv.create(DVBT_protesi_ginocchio_interna);
//		tavolaSrv.create(DVBT_protesi_spalla_frontale);
//		tavolaSrv.create(DVBT_protesi_spalla_retro);
//		tavolaSrv.create(DVBT_protesi_valvole_cardiache);
//		tavolaSrv.create(tavola_Test01);
//		tavolaSrv.create(tavola_Test02);
//		tavolaSrv.create(tavola_Test03);
//		tavolaSrv.create(tavola_Test04);

		List<Utente> utentiDB = new ArrayList<Utente>();
		utentiDB = utenteSrv.findNoPage();
		utentiDB.forEach(ut -> System.err.println(ut.toString()));

		/* CREAZIONE 20 DONAZIONI */
		for (int i = 0; i < 20; i++) {
			double[] importiPossibili = { 5.00, 10.00, 15.00 };
			double randomAmount = importiPossibili[faker.number().numberBetween(0, importiPossibili.length)];
			LocalDate startDate = LocalDate.of(2020, 1, 1);
			LocalDate endDate = LocalDate.of(2023, 9, 30);

			long randomDays = faker.number().numberBetween(0, ChronoUnit.DAYS.between(startDate, endDate));
			LocalDate randomDate = startDate.plusDays(randomDays);

			DonazioneRequestBody nuovaDonazione = new DonazioneRequestBody(BigDecimal.valueOf(randomAmount), randomDate,
					utentiDB.get(faker.number().numberBetween(0, utentiDB.size() - 1)));

			// donazioneSrv.create(nuovaDonazione);
		}


		// List<Utente> lista = utenteSrv.getUtentiConDonazioni();
		// lista.forEach(ut -> System.err.println(ut));
		System.err.println(utentiDB.size());


	}
}

