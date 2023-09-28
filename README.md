# Capstone - 
Progetto finale per il mio percorso di studi come 'Full Stack Web Developer' presso l'Academy EPICODE.
## DaVinciBioTech
DVBTech parte da un **WHAT IF....?**
E se Leonardo da Vinci, che come sappiamo ha dato "uno sguardo nel futuro" nelle sue tavole (dal carro armato all'elicottero) , avesse anche progettato e abbozzato gli schemi di artoprotesi e strumenti biomedici?
Ed è così che nasce DaVinciBioTech (DVBTech), una Fondazione italiana nata per la conservazione e restaurazione di queste tavole ritrovate nel 2020.
Questo progetto si basa fondamentalmente sulle **passioni** e le caratteristiche che contraddistinguono me come persona:
1. 👨‍🎓Le mie conoscenze circa il mondo delle artoprotesi grazie al mio percorso di studi in **Ingegneria Biomedica**;
2. 🎨La mia passione nel **disegno artistico**;
3. ✍️La mia passione per la **scrittura** creativa e la lettura;
4. Il mio amore per il **Genio** e l'Arte italiana e che trova in Leonardo la sua massima espressione.
## Guarda:
[![Guarda il video di presentazione](https://davincibiotech.s3.eu-central-1.amazonaws.com/home.png)](https://www.youtube.com/watch?v=B6ZgLZU937U&ab_channel=SanteCalderisi)
[![Guarda il video di presentazione](https://davincibiotech.s3.eu-central-1.amazonaws.com/tavole.png)](https://www.youtube.com/watch?v=B6ZgLZU937U&ab_channel=SanteCalderisi)
[![Guarda il video di presentazione](https://davincibiotech.s3.eu-central-1.amazonaws.com/registrati.png)](https://www.youtube.com/watch?v=B6ZgLZU937U&ab_channel=SanteCalderisi)



https://github.com/SanteCalderisi112358/DaVinciBioTech/assets/129219943/c37f6b4e-6d5b-4852-a0dc-4e0da0b65eb7



### Struttura
- *Home*: Rapida biografia su Leonardo
- *Chi siamo*: Veduta d'insieme sulla DVBTech
- *Donazioni*: Possibilità di fare una donazione attraverso **Stripe** a cui seguirà una email custom di ringraziamento. (Ho utilizzato **SendGrid**)
- *Registrati*: Form per registrarsi (con validazione sul formato email e sulla password). Di default un utente che si registra viene creato come USER
- *Accedi*: Form per l'accesso (con validazione). Solo dopo aver effettuato il login sarà possibili fare donazioni e accedere alla propria pagina profilo (User o Admin). Nel form c'è la possibilità di **Recuperare la password** attraverso la propria email. Verrà inviata una password criptata che potrà essere modificata in seguito.
- *Profilo-User*: Gioco delle carte, possibilità di modificare i propri dati e di visualizzare le donazioni fatte
- *Profilo-Admin*: Traccia sulle donazioni fatte con grafici (**ChartJs**), operazioni **CRUD** sulle tavole e sugli utenti

### Tecnologie utilizzate
- *Front-end*: **Angular CLI: 16.2.0**
- *Back-end*: **Java Spring Boot Strap**
