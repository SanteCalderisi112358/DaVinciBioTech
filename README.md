# Capstone - 
Progetto finale per il mio percorso di studi come 'Full Stack Web Developer' presso l'Academy EPICODE.
## DaVinciBioTech
DVBTech parte da un **WHAT IF....?**
E se Leonardo da Vinci, che nelle sue tavole ha dato "uno sguardo al futuro" (dal carro armato all'elicottero), avesse anche progettato e abbozzato gli schemi di artoprotesi e strumenti biomedici?
Ed è così che nasce **DaVinciBioTech** (**DVBTech**), una Fondazione italiana creata per la conservazione e restaurazione di queste tavole ritrovate nel 2020.
Questo progetto si basa fondamentalmente sulle **passioni** e le caratteristiche che contraddistinguono me come persona:
1. 👨‍🎓Le mie conoscenze circa il mondo delle artoprotesi grazie al mio percorso di studi in **Ingegneria Biomedica**;
2. 🎨La mia passione nel **disegno artistico**;
3. ✍️La mia passione per la **scrittura** creativa e la lettura;
4. ❤️Il mio amore per il **Genio** e l'Arte italiana e che trova in **Leonardo** la sua massima espressione.
## 👀 Guarda:

Clicca sull'immagine:

[![Guarda il video di presentazione](https://davincibiotech.s3.eu-central-1.amazonaws.com/home.png)](https://www.youtube.com/watch?v=B6ZgLZU937U&ab_channel=SanteCalderisi)

<img src="https://davincibiotech.s3.eu-central-1.amazonaws.com/tavole.png" alt="Tavole Image" width="400"/>                  <img src="https://davincibiotech.s3.eu-central-1.amazonaws.com/registrati.png" alt="Registrati Image" width="400"/>

---








### 🏯 Struttura
- *Home*: Rapida biografia su Leonardo
- *Chi siamo*: Veduta d'insieme sulla DVBTech
- *Donazioni*: Possibilità di fare una donazione attraverso un' API esterna  (**Stripe**) a cui seguirà una email custom di ringraziamento. (Ho utilizzato l'API di **SendGrid**)
- *Le tavole*: Visione, senza registrazione e login, delle tavole biomediche di leonardo. (Ovviamente tali tavole non esistono ma sono il frutto della mia creatività)
- *Registrati*: Form per registrarsi (con validazione sul formato email e sulla password). Di default un utente che si registra viene creato come USER
- *Accedi*: Form per l'accesso (con validazione). Solo dopo aver effettuato il login sarà possibili fare donazioni e accedere alla propria pagina profilo (User o Admin). Nel form c'è la possibilità di **Recuperare la password** attraverso la propria email. Verrà inviata una password criptata che potrà essere modificata in seguito.
- *Profilo-User*: Gioco delle carte, possibilità di modificare i propri dati e di visualizzare le donazioni fatte
- *Profilo-Admin*: Traccia sulle donazioni fatte con grafici (**ChartJs**), operazioni **CRUD** sulle tavole e sugli utenti

### 💻 Tecnologie utilizzate
- *Front-end*: **Angular CLI: 16.2.0**
- *Back-end*: **JavaSpring - SpringBoot**
- *Database*: **PostGreSQL**
 
### 📦 Installazione
Prima di iniziare assicurati di aver installato **Node.js** sul tuo sistema. 
- Clona questa repository con il comando comando: `gh repo clone SanteCalderisi112358/DaVinciBioTech`
- Installa tutte le dipende necessarie affinché il progetto funzioni con: `npm install`
- Run con `ng serve` e naviga in `http://localhost:4200/`
- Nella cartella "DaVinciBioTechBE" creare un file "env.properties" così strutturato:
  - SECRET=mysupersecret
  - PG_USERNAME=postgres
  - PG_PASSWORD= (password utilizzata)
  - PORT=3001
  - JWT_SECRET= (sequenza alfanumerica per la creazione dei token)
  - SENDGRID_API_KEY= (la propria chiave sendgrid ottenuta dopo essersi aperti un account su sendgrid.com)
  - STRIPE_API_JEY= (la propria chiave stripe ottenuta dopo essersi aperti un account su stripe.com
  - ...per maggiori informazioni, contattatemi.

### 📧 Contatti
santecalderisi@gmail.com

### 🖊️ Autore

Sante Calderisi


