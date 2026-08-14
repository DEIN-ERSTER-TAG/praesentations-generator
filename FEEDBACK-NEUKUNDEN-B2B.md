# Feedback zur Vorlage "Neukunden-Demo B2B"

Stand: 2026-08-14 — **R1–R5 und F1–F9 umgesetzt**, siehe „Umsetzung“ am Ende des Dokuments
für Details und offene Entscheidungspunkte. K1/K4/K6 bleiben separates, späteres Vorhaben.
Betrifft: `templates/neukunden-demo-b2b.html`

## Feedback der Kollegen (Runde 1)

### Struktur / Baukasten

**K1 — Präsi nur für Schulcard** · Status: ✅ umgesetzt (2026-08-14)
Möglichkeit, andere Produkte rauszuwerfen, wenn das Budget vorher schon klar ist.
Also: Folien selektiv abwählbar statt fixe Vorlage.

Konkretisierter Plan (vom Nutzer während der R2-Umsetzung mitgeteilt, 2026-08-14):
- Auswählbar, welche Produkte präsentiert werden — Checkboxen, Default: alle 4 (die Kacheln
  aus [[R2]] auf Folie 2: Sprachnachrichten & Mini-Games, #kurzerklärt-Video, 360-Grad-Rundgang,
  AR-Avatar).
- **Schulcard ist Pflicht** — nicht abwählbar, wird immer präsentiert.
- Abgewählte Produkte fallen auf Folie 2 komplett als Kachel/Button weg.
- Der Einleitungstext auf Folie 2 ("Wir haben **vier** Ideen mitgebracht") muss die Anzahl
  dynamisch nennen — nicht hart auf "vier" verdrahten, sondern nach Anzahl der aktiven
  Kacheln richten (z.B. "eine Idee" bei 1, "zwei Ideen" bei 2 usw.).
- Abgewählte Produkte dürfen auch auf der neuen Preis-Folie ([[R5]]) nicht als Karte auftauchen.
- Betrifft die Wizard-Logik (`index.html`, Schritt 2/3), nicht nur die Vorlage selbst — daher
  weiterhin als eigenständiges, späteres Vorhaben behandeln, aber [[R2]] und [[R5]] sollten beim
  Bau schon so strukturiert werden, dass sich Kacheln/Karten je Produkt einzeln ein-/ausblenden
  lassen (z.B. per Datenattribut je Produkt), damit K1 später ohne kompletten Umbau andockt.

**Umsetzung (2026-08-14):**
- `index.html`, Schritt "Kundendaten": neuer Block `#group-products` (nur sichtbar bei
  `templateId === 'neukunden-demo-b2b'`), 4 Checkboxen aus `PRODUCT_OPTIONS`. "Sprachnachricht"
  ist `disabled` + immer `checked` (nicht abwählbar). `gCustomer.selectedProducts` (Default:
  alle 4) wird in beiden Fetch-Payloads (`/api/generate-presentation`, `/api/deploy-presentation`)
  mitgeschickt.
- `api/generate-presentation.js` + `api/_lib.js::renderPresentation()`: `selectedProducts` wird
  durchgereicht, 'sn' serverseitig zur Sicherheit erzwungen, als neuer Token
  `{{SELECTED_PRODUCTS_JSON}}` (JSON-Array) ins Template injiziert.
  `deploy-presentation.js` brauchte keine Änderung — reicht `req.body` bereits 1:1 durch.
- `templates/neukunden-demo-b2b.html`: `SELECTED_PRODUCTS`-Konstante liest den Token mit
  Fallback auf alle 4 (falls Template ohne Generator direkt geöffnet wird). Neue Funktion
  `applyProductSelection()` blendet nicht ausgewählte Kacheln auf Folie 2 aus und setzt den
  "X Ideen"-Text dynamisch (eine/zwei/drei/vier Ideen). `renderPricingCards()` filtert
  `PRICE_FORMATS` nach `SELECTED_PRODUCTS` und passt die Spaltenzahl des Grids automatisch an.
- End-to-End verifiziert: Wizard-Checkbox-Toggle → `gCustomer.selectedProducts` →
  Test-Auswahl `["sn","vr"]` → Folie 2 zeigt nur 2 Kacheln + "zwei Ideen", Folie 6 zeigt nur
  2 Preiskarten in 2-spaltigem Grid. Auch Template-Wechsel (Block erscheint/verschwindet
  korrekt je nach Vorlage) und Fallback ohne Token getestet.

**K2 — Preise nur für ausgewählte Formate** · Status: ✅ abgedeckt durch [[R5]]
Angebots-/Preisfolie soll nur die tatsächlich relevanten Formate zeigen (Übersichtlichkeit).
Hängt inhaltlich an K1.

**K3 — JobApp als ganze Folie nötig?** · Status: ✅ abgedeckt durch [[R4]]
Prüfen, ob die JobApp-Folie ("Employer Branding – von Klasse 7 bis zum Abschluss") eine
eigene Folie rechtfertigt oder zusammengelegt/gestrichen werden kann.

### Inhalte / Verständlichkeit

**K4 — Videobeispiele branchenspezifisch** · Status: 🔜 später, im Kontext des gesamten Generators
Können die Videobeispiele auf den Beruf/die Branche des Kunden angepasst werden?

Konkretisierter Plan (vom Nutzer während der R2-Umsetzung mitgeteilt, 2026-08-14):
1. DET-YouTube-Kanal crawlen, alle **#kurzerklärt**- und **360-Grad**-Videos identifizieren
   (alle anderen Videotypen rausfiltern/streichen), dazu jeweils Link + Thumbnail ermitteln.
2. Im Generator (Wizard-Schritt am Anfang) zwei alphabetisch nach Beruf sortierte Dropdowns
   einbauen — Dropdown 1: #kurzerklärt-Beispiel, Dropdown 2: 360-Grad-Beispiel.
   Sortierung nach Berufsbezeichnung, nicht nach Unternehmen (Beispiel: "Pflegefachmann" → P).
3. Die gewählten Beispiel-Videos werden dann in die generierte Präsentation eingesetzt
   (ersetzen die aktuell fest verdrahteten Polizei-Referenzvideos auf [[R2]]s Folie 2 —
   `uGsxUGgQpBY` für #kurzerklärt, `zwiAASX8YH0` für 360°).

Betrifft Wizard-Logik + neuen YouTube-Crawling-Schritt (`index.html`, evtl. neue `api/`-Route) —
eigenständiges, späteres Vorhaben. Für [[R2]] gilt vorerst: feste Polizei-Referenzvideos als
Platzhalter, aber IDs sind über die `MEDIA`-Objekt-Struktur der Folie zentral austauschbar,
damit sich die Dropdown-Auswahl später einfach andocken lässt.

**K5 — Bild von der Medienbox** · Status: ✅ abgedeckt durch [[R3]]
Medienbox-Folie braucht ein Bild, um verständlicher zu werden.

**K6 — Partnerschulen im Umkreis direkt anzeigen** · Status: 🚫 technisch nicht umsetzbar
Aktuell offenbar Medienwechsel (externer Link/andere Ansicht). Sollen direkt in der
Präsentation erscheinen. Betrifft vermutlich Folie 6 ("Schulen in Ihrer Region."). Geht nicht,
da der Generator nicht mit der Live-Datenbank der Partnerschulen verbunden ist. Damit erledigt,
keine weitere Aktion geplant.

**K7 — "53% aller Bewerbungen …"** · Status: 🚫 ignorieren (nicht umsetzen)
Unklar, welche Bewerbungen gemeint sind. Formulierung präzisieren oder Quelle ergänzen.
Die "53%"-Statistik existiert **nicht** in `neukunden-demo-b2b.html`, sondern nur in
`bestandskunden-nur-app.html` und `bestandskunden-app-sv.html` (Folie "Unsere Erkenntnis":
*"53% aller Bewerbungen stammen von Schülerinnen und Schülern, die Ihr Unternehmen zuvor
bereits über Employer Branding von DEIN ERSTER TAG im Schulunterricht kennengelernt haben."*).
→ Rückfrage an Kollegin: meinte sie eine der Bestandskunden-Vorlagen statt der Neukunden-Demo?

**K8 — Azubichat gehört zur Schulcard** · Status: ⏳ offen
Muss klar werden, dass der Azubichat Teil der Schulcard ist und kein separates Produkt.
Aktuell: Azubi-Chat ist "Station 2" innerhalb der Medienbox-Folie (siehe [[R3]]-Umbau,
Slider-Kachel) — wirkt dadurch wie ein Medienbox-Bestandteil, nicht wie Schulcard-Bestandteil.
Betrifft also den neuen 5-Kacheln-Slider aus R3, nicht nur die Schulcard-Folie selbst.

### Darstellung

**K9 — Videosnippet Minigames langsamer** · Status: ⏸️ zurückgestellt (aktuell nicht umsetzbar)
Läuft zu schnell, wirkt stressig. Abspielgeschwindigkeit reduzieren.
Betrifft vermutlich Station 1 ("Mini-Games") im Medienbox-Slider ([[R3]]).

## Eigene Durchsicht (Runde 2)

**R1 — Folie 1 (Titelfolie) ist gut wie sie ist.**
Keine Änderung.

**R2 — Folie 2 ("Für Ihre Berufe begeistern.", Medienformate-Tabs) umbauen.**
Aktuell: Tab-Leiste oben ("Sprachnachricht + Mini-Games" / "#kurzerklärt" / "360°-Rundgang")
+ Checklisten-Inhalt rechts/darunter, inkl. gelbem Dummy-Hinweiskasten mit Pfeil.
→ Das komplette bisherige Tab-Layout auf dieser Folie soll weg.

Neu: linke Spalte bekommt vier türkise, anklickbare Kacheln (Buttons) **untereinander**:
1. Sprachnachrichten & Mini-Games
2. #kurzerklärt-Video
3. 360-Grad-Rundgang
4. AR-Avatar

Zusätzlicher Text: *"Sie wählen das Medium, das am besten zu Ihnen passt. Wir haben vier
Ideen mitgebracht:"*

Klick-Verhalten: rechte Spalte wechselt zum Präsentationsbereich des angewählten Mediums.
Die Schulcard-Anzeige selbst bleibt inhaltlich unverändert. Bisher war AR-Avatar nicht Teil
dieser Auswahl, kommt hier neu dazu.

Device-Rahmen je Medium:
- **Sprachnachrichten & Mini-Games / #kurzerklärt-Video / 360-Grad-Rundgang / Schulcard:**
  jeweils in einem Device im Querformat dargestellt — Tablet, Querformat.
- **AR-Avatar:** eigenes Video ist Hochkant-Format → dafür ein Hochkant-Handy-Mockup,
  wie auf https://kundenpraesentation-nurapp-vorlage.vercel.app/ zu sehen.

Bei Auswahl **#kurzerklärt-Video**: rechts erscheint das #kurzerklärt-Video der Polizei
(Referenzbeispiel) im Tablet-Querformat-Device, gleiche Größe wie der Schulcard-Container.
Darunter einzeilig: *"Vollständige Produktion durch uns, eigene Nutzungsrechte während der
Laufzeit für Sie."*

Bei Auswahl **360-Grad-Rundgang**: gleicher Aufbau (Video im Tablet-Querformat-Device,
Schulcard-Container-Größe + einzeilige Unterschrift mit "Nutzungsrechte" statt
"Produktionsrechte"), nur mit dem passenden 360°-Rundgang-Video statt des #kurzerklärt-Videos.

Bei Auswahl **AR-Avatar**: gleicher Aufbau, aber Hochkant-Handy-Mockup (siehe oben) statt
Tablet-Querformat, mit dem AR-Avatar-Video + einzeiliger Unterschrift ("Nutzungsrechte").

**R3 — Folie 3 ("Und so geht's an die Schule: Die Medienbox.") entrümpeln.**
Aktuell insgesamt zu wuselig/voll, zu viel passiert gleichzeitig auf der Folie.

Links: Foto der Medienbox einfügen — Quelle: das Foto von
https://www.deinerstertag.de/schulen/medienbox/ (Hero-Bild der Seite) verwenden.
Rechts daneben: Button **"Lernstationen in der Medienbox ansehen"**.

Klick auf "Lernstationen in der Medienbox ansehen": Folie wandelt sich —
Medienbox-Foto + Button verschwinden, stattdessen erscheint ein **Slider mit 5 Kacheln**
(eine Kachel je Station), nach beigefügtem Vorbild:
- Kachel-Aufbau von oben nach unten: statt Foto läuft das **Video**, das für diese Station
  schon eingebunden ist (bereits vorhandene Videos der 5 Stationen wiederverwenden, keine
  neuen Fotos), Badge oben links z.B. "10 Min", Label unten links (Unternehmensname),
  darunter fett der Berufs-/Stationstitel, darunter Link "Reinschauen ›".
- Bisherige Texte/Inhalte der 5 Stationen werden 1:1 übernommen (kein neuer Text), nur ins
  neue Kachel-Format überführt — pro Kachel genau 1 Video (statt Foto).

Oben links auf dieser Ansicht: kleiner Navigationspfeil zurück — **"Zurück zur Medienbox"**
(führt zur Foto+Button-Ansicht zurück).

Design-Vorbild für den Slider (Code-Referenz):
`SPR-Checker/Praktikumsfinder_Vorschau.html`

**R4 — Folien 8 und 9 raus (JobApp + Upgrades).**
Folie 8 = "Employer Branding – von Klasse 7 bis zum Abschluss." (JobApp, `slide-jobapp-a`)
Folie 9 = "Noch mehr Wirkung." (Upgrades, `slide-upgrades-a`)
→ hängt mit **K3** zusammen (JobApp als eigene Folie infrage gestellt).

Nicht löschen, sondern **aufheben** — falls die Folien später doch wieder gebraucht werden
(z.B. als Baustein für K1, die "Nur Schulcard"-Variante mit abwählbaren Folien). Bei Umsetzung:
aus dem aktiven Foliensatz/der Navigation entfernen, Markup aber im Projekt behalten
(z.B. auskommentiert oder in eigene Datei ausgelagert) statt zu entfernen.

**R5 — Folien 10 + 11 ("Unser Angebot" / "Unser Preiskalkulator") durch eine neue
Preis-Folie ersetzen.**
Beide bisherigen Preis-Folien sind unübersichtlich → ersetzen durch **eine** neue Folie.
→ hängt inhaltlich mit **K2** zusammen (Preise nur für ausgewählte Formate).

Folie 10 (`slide-7`, Tabelle "Produktionskosten (einmalig pro Beruf)" + die anschließende
Regional/Bundesland-Vergleichstabelle) wird **komplett abgeschnitten**, nicht übernommen.

Neue Folie: 4 Karten nebeneinander (Referenz-Datei `pricing-cards.html`, per Screenshot
geteilt), auf türkisem Hintergrund, je Karte:
- "NEU"-Badge (gelb) oben links, nur bei Sprachnachricht+Mini-Games und AR-Avatar
- Titel (Format-Name) + Untertitel "inkl. Schulprogramm"
- Preisblock — **nicht** wie im ersten Entwurf getrennt nach "Jährliche Kosten" /
  "Produktionskosten", sondern: **"Gesamtpreis 1. Jahr"** (= Jahreskosten + einmalige
  Produktionskosten zusammengerechnet) und darunter **"ab 2. Jahr"** (= nur die
  laufenden Jahreskosten, ohne Produktionsanteil)
- Button "Unverbindlich anfragen"
- Checkliste der Leistungen (wie im Entwurf, pro Format unterschiedlich lang)

Oben auf der Folie ein **Dropdown** mit drei Optionen, das die Preise in Echtzeit umrechnet:
- Regional (50 km)
- Bundesland
- Deutschlandweit

Preislogik 1:1 aus dem bisherigen Preiskalkulator (Folie 11, `slide-8`) übernehmen —
dort bereits als JS-Objekt vorhanden:
```
PRICES = {
  schulcard: { regional: 3000, bundesland: 4500, deutschland: 6000 },
  addon:     { regional: 1500, bundesland: 3000, deutschland: 4500 },
  prod:      { ke: 4900, vr: 14900, ar: 1500 }
}
```
Jahrespreis je Format = schulcard[gebiet] + addon[gebiet] (falls Zusatzformat);
Produktionskosten einmalig = prod[format] (gebiet-unabhängig, außer Sprachnachricht+Mini-Games
= keine Produktionskosten). "Gesamtpreis 1. Jahr" = Jahrespreis + Produktionskosten;
"ab 2. Jahr" = nur Jahrespreis.

Geklärt: der bisherige Beruf-für-Beruf-Konfigurator (mehrere Berufe gleichzeitig einpreisen)
aus Folie 11 entfällt bewusst. Neue Folie rechnet nur für **einen Beruf** — kein zweites
Dropdown für Berufsanzahl.

## Umsetzung (2026-08-14)

R1–R5 sind in `templates/neukunden-demo-b2b.html` umgesetzt und im Browser (lokaler
Static-Server) verifiziert (Kachel-Klicks, Medienbox-Slider, Preis-Umrechnung je Gebiet
— alle Werte gegengerechnet, keine JS-Fehler, kein Overflow bei 1280×720).

**R4:** `slide-jobapp-a`/`slide-upgrades-a` sind als `<template>`-Element eingewickelt
(nicht gelöscht, nicht mehr Teil der aktiven Folien-Navigation, da `<template>`-Inhalt
nicht im normalen DOM-Baum liegt). Bei Bedarf per JS (`.content.cloneNode`) oder manuell
wieder auspacken.

**R2/R5 – Vorbereitung für K1:** Tiles auf Folie 2 tragen `data-medium="sn|ke|vr|ar"`,
Preiskarten-Daten liegen zentral in `PRICE_FORMATS` (JS-Array). Für die spätere
Checkbox-Auswahl (K1) reicht es, einzelne Einträge aus der Tile-Liste bzw. aus
`PRICE_FORMATS` rauszufiltern statt die Folien neu zu bauen.

**Interpretationsentscheidungen, bitte gegenprüfen:**
- **R3, Kachel 3 "Kurzfilm-Kino":** zeigt ein statisches Bild (`kurzfilm-kino-feed.png`,
  bereits im Assets-Ordner vorhanden) statt eines Videos — die Station hatte ursprünglich
  keinen einzelnen Video-Clip, sondern einen scrollenden Thumbnail-Feed.
- **R3, Kachel 4 "360° erleben":** zeigt ebenfalls ein statisches Bild (`VR Magic.png`)
  mit Play-Button; Klick auf die Kachel startet wie bisher das YouTube-Video eingebettet
  in die Kachel (`playFacade()`). Kein eigenständiger lokaler Video-Clip vorhanden.
- **R3, Kachel-Badges:** statt der im Vorbild gezeigten Zeitangabe ("10 Min") zeigen die
  Badges "Station 1"–"Station 5" (bzw. "✦ Coming Soon" bei AR-Gamecards) — eine
  Zeitangabe wäre für Mini-Games/Azubi-Chat nicht ehrlich gewesen. Die im Vorbild zusätzlich
  gezeigte Firmenname-Zeile unten im Bild wurde weggelassen (kein Unternehmensbezug pro
  Station vorhanden, hätte nur Redundanz zum Titel darunter erzeugt).
- **K8 (Azubichat gehört zur Schulcard):** auf Kachel 2 "Azubi-Chat" zusätzlich ein
  gelbes Tag "Teil Ihrer Schulcard" oben rechts ergänzt, um die Zugehörigkeit klarzustellen
  — das war der einzige noch offene Punkt aus Runde 1, der direkt im R3-Umbau mit erledigt
  werden konnte.
- **R2, #kurzerklärt/360°-Referenzvideos:** die bereits vorhandenen Polizei-Beispielvideos
  (`uGsxUGgQpBY`, `zwiAASX8YH0`) wurden übernommen — passen exakt zu den in R2 beschriebenen
  Referenzbeispielen. Werden mit K4 später durch die Dropdown-Auswahl ersetzbar.
- Aufgeräumt: nicht mehr benötigtes CSS/JS aus der alten Tab- und Kalkulator-Logik
  (`.tab-btn`, `.tab-row`, `.tab-panel`, `.coming-soon-badge`, `.price-table`, `.calc-*`,
  `.gebiet-btn`, `.beruf-*`, `.addon-*`, `.result-*`, `switchTab()`, `addBeruf()` u.a.)
  wurde entfernt, da nach dem Umbau ungenutzt.

## Feedback zur Umsetzung – Runde 3 (2026-08-14, aus Test-Präsentation)

**Noch nicht umgesetzt — erst sammeln, dann gesammelt umsetzen** (siehe R3-Kacheln,
Medienbox-Lernstationen-Slider):

**F1 — Kurzer Text unter dem Titel jeder Kachel.**
Orientiert an den Texten der Vorversion (vor dem R3-Umbau):
- Mini-Games: *"Kurzweilige Klick-Games zum Entdecken von Berufen und Arbeitgebern –
  spielerisch, einprägsam, interaktiv."*
- Azubi-Chat: *"Eintauchen in einen (fiktiven) Azubi-Gruppenchat mit einem Azubi-Avatar
  aus Ihrem Unternehmen – nah, authentisch und direkt."*
- Kurzfilm-Kino: *"#kurzerklärt im Videofeed. Direkt im Klassenraum – kurz, unterhaltsam,
  auf den Punkt."*
- 360° erleben: *"Mit unseren mitgelieferten VR-Brillen erleben Jugendliche Ihren Beruf
  hautnah – direkt im Klassenzimmer, ohne Betriebsbesuch."*
- AR-Gamecards: *"Gamecards scannen – und Schüler*innen können mit Ihrem 3D-Avatar
  interagieren. Die Gamecard nehmen sie als Visitenkarte mit nach Hause."*

**F2 — Videos erst bei Hover abspielen statt alle gleichzeitig autoplay.**
5 parallel laufende Videos wirken unruhig. Videos sollen erst starten, wenn man mit der
Maus über die Kachel fährt (sonst Standbild/Poster zeigen). Hängt inhaltlich mit **K9**
zusammen (Minigames-Video wirkt "stressig") — Hover-to-Play würde das Grundproblem
"zu viel Bewegung gleichzeitig" für alle 5 Kacheln lösen, nicht nur für eine.

Zusatz zu F2: Beim Hovern soll die Kachel sich zusätzlich umbauen — das Video wächst auf
die **volle Höhe der Karte** (Textblock mit Titel/Link darunter verschwindet währenddessen),
damit mehr Hochformat-Raum fürs Video da ist. Beim Weghovern kehrt die Kachel wieder in den
jetzigen Ausgangszustand zurück (Video oben in normaler Media-Höhe + Textblock sichtbar).

**F3 — "Station"-Badges in gelben Kästchen.**
Aktuell weiße/halbtransparente Pills — schlecht sichtbar auf hellen Vorschaubildern.
Auf Gelb (`var(--yellow)`) umstellen, damit sie sich abheben.

**F4 — "Teil Ihrer Schulcard"-Tag bei Azubi-Chat wieder raus.**
Nimmt die K8-Umsetzung aus der ersten Runde zurück (siehe "Interpretationsentscheidungen"
oben) — **K8 gilt damit wieder als offen**, keine Lösung im Kachel-Layout gefunden, die
gefällt. Muss ggf. gesondert nochmal angegangen werden (z.B. eher auf der Schulcard-Folie
selbst als auf dem Medienbox-Slider).

**F5 — Kurzfilm-Kino: Bewegung fehlt, wirkt tot.**
Rückmeldung: *"Hier ist kein Video hinterlegt. In der Vorgängerversion gab's ein Video."*
Präzisierung: Die Vorgängerversion hatte streng genommen auch kein einzelnes Video, sondern
einen **scrollenden Thumbnail-Feed** (`.feed-track`, 16 Bilder, CSS-Animation `feedScroll`,
Datei-Referenz: Thumbnail YT 1–8.png) — das wirkte durch die Dauerbewegung aber wie ein
Video. Meine Interpretationsentscheidung, stattdessen das statische Bild
`kurzfilm-kino-feed.png` zu verwenden, war ein Rückschritt ggü. der Vorgängerversion
(korrigiert die Aussage dazu unter "Interpretationsentscheidungen" oben). Für die
gesammelte Umsetzung: den scrollenden Feed statt des statischen Bilds ins Kachelformat
übernehmen (ggf. verkleinert auf Kachel-Media-Größe).

**F6 — Preis-Karten (Folie 6, R5): Button + Feature-Liste komplett raus.**
Auf allen 4 Preis-Karten sollen der Button "Unverbindlich anfragen" **und** die darunter
stehende Checkliste (Online-Schulportal, Medienbox in der Schule, ggf. Videostunde/
Nutzungsrechte/YouTube-Veröffentlichung usw.) komplett entfernt werden. Karte besteht
danach nur noch aus: Badge (falls "NEU"), Titel, Untertitel "inkl. Schulprogramm",
Preisblock.

**F7 — Preisblock der Karten neu strukturieren (4 Zeilen statt 2).**
Ersetzt/verfeinert den Preisblock aus F6. Statt bisher nur "Gesamtpreis 1. Jahr" +
"ab 2. Jahr" neu mit 4 Zeilen:
1. **Schulvermarktung (jährlich):** — Jahrespreis (`PRICES.schulcard[gebiet] + addon`)
2. **Kreation & Produktion (einmalig):** — Produktionskosten (`PRICES.prod[format]`,
   bei Sprachnachrichten & Mini-Games: keine)
3. **Gesamt 1. Jahr:** — Summe aus 1+2 (bisher "Gesamtpreis 1. Jahr")
4. **ab dem 2. Jahr:** — nur Zeile 1 (bisher "ab 2. Jahr")

Rechenlogik bleibt identisch zu R5 (`PRICES`-Objekt, siehe oben) — nur die Darstellung
wird von 2 auf 4 Zeilen aufgeschlüsselt.

**F8 — "Reinschauen ›"-Link überall auf Folie 3 raus.**
Betrifft alle 5 Kacheln im Medienbox-Lernstationen-Slider (`.mb-kachel-link`) — der Link
unter jedem Kachel-Titel entfällt komplett, nicht nur bei einzelnen Kacheln.

**F9 — Medienbox-Foto (Folie 3, Intro-Ansicht) ist unscharf, muss kleiner.**
Aktuell `flex:1; height:100%; max-height:420px` mit `object-fit:cover` — bei der aktuellen,
sehr breiten/niedrigen Containerform wird `Dein-Erster-Tag-Medienbox-1024x692.webp`
(Originalauflösung 1024×692) über natürliche Auflösung hinaus hochskaliert bzw. stark
zugeschnitten, dadurch unscharf/verpixelt. Bildcontainer verkleinern bzw. Seitenverhältnis
näher am Original halten, damit nicht über die native Auflösung hinaus skaliert wird.

**Bugs (kein Feedback, sondern Fehler):**

- **YouTube "Error 153" nach Play-Klick.** Tritt an **zwei Stellen** auf:
  - Folie 3, Kachel "360° erleben" (Klick startet `playFacade()`)
  - Folie 2, Kachel "#kurzerklärt-Video" (Tablet-Mockup lädt YouTube-iframe direkt)

  Beide zeigen *"Watch video on YouTube – Error 153 – Video player configuration error"*
  statt des Videos. Bestätigt per Screenshot: Adressleiste zeigt `file:///C:/Users/...` —
  die Testdatei wurde direkt per Doppelklick geöffnet (nicht über den lokalen Server).
  Vermutliche Ursache: YouTube lehnt die Einbettung ab, wenn der Referrer `file://` ist
  (typisches Verhalten von Error 153 bei lokal per Doppelklick geöffneten HTML-Dateien,
  unabhängig vom Embed-Rechte-Status des Videos selbst). Dieser Mechanismus
  (iframe-Embed bzw. `playFacade()`) ist an beiden Stellen unverändert aus der
  Vorgängerversion übernommen — vor der Umsetzung von F1–F6 **auf der echten Live-Domain
  (praesentations-generator.vercel.app bzw. einer deployten Kunden-Präsentation)
  gegenprüfen**, ob der Fehler dort auch auftritt oder nur ein Artefakt des lokalen
  `file://`-Testens ist.

- **Mini-Games-Kachel (Station 1): Video-Vorschau komplett leer/weiß** (grauer Verlauf
  statt Bildinhalt) — bei allen anderen Kacheln erscheint Bild/Video normal. Noch nicht
  geklärt, ob das ein einmaliger Ladefehler in der Test-Präsentation war oder ein echtes
  Problem mit `Mini_Games_NEU.mp4`/`Minigames.png`. Bei der gesammelten Umsetzung von
  F1–F6 mitprüfen.

## Feedback zur Umsetzung – Runde 4 (2026-08-14, aus zweiter Test-Präsentation)

**Noch nicht umgesetzt — sammeln:**

**F10 — "Sprachnachrichten & Mini-Games" → "Sprachnachricht" umbenennen.** ✅ umgesetzt
Betrifft beide Stellen im Code: Kachel-Label auf Folie 2 (`slide-1`) und Kartentitel in
`PRICE_FORMATS` (Folie 6, Preis-Karte). Neuer Text überall einheitlich: **"Sprachnachricht"**
(Singular, ohne "& Mini-Games").

**Bug-Update — Error 153 tritt weiterhin auf, jetzt an drei bestätigten Stellen.**
Zwei neue Screenshots bestätigen: Error 153 erscheint sowohl bei "#kurzerklärt-Video"
(Folie 2) als auch bei "360° erleben" (Folie 3, Medienbox-Slider) — beide nutzen
YouTube-Embeds. Damit sind jetzt alle Stellen mit YouTube-Einbettung im Template betroffen.
Adressleiste in den Screenshots nicht sichtbar — unklar, ob per `file://` oder Server
geöffnet. **Nächster Schritt zur Eingrenzung:** einmal gezielt über eine `http(s)://`-Adresse
testen (lokalen Server oder eine echte Live-Deployment-URL), um zu klären, ob es wirklich
nur am `file://`-Aufruf liegt oder ob die Videos (`uGsxUGgQpBY`, `OZZjn3BEouU`) selbst ein
Embed-Rechte-Problem haben (z.B. Kanal-Einstellung "Einbetten erlauben" geprüft?).

**Bug-Update — Mini-Games-Vorschau weiterhin leer/weiß, kein Einzelfall.**
Tritt jetzt im zweiten Test in Folge auf (identisch: grauer Verlauf statt Video/Poster).
Kein einmaliger Ladefehler mehr, sondern reproduzierbar. Dateicheck durchgeführt:
`Mini_Games_NEU.mp4` (gültiges MP4, ISO Media) und `Minigames.png` (gültiges PNG, 542×301)
sind beide intakt, nicht korrupt, Pfade stimmen — die Datei selbst ist also **nicht** die
Ursache. Deutet eher auf ein Browser-seitiges Timing-/Rendering-Problem beim ersten Frame
hin (z.B. `preload="metadata"` lädt Poster/Frame nicht zuverlässig genug vor). Muss beim
nächsten Test in den Browser-DevTools (Network/Console-Tab) gegengeprüft werden, um die
genaue Ursache zu sehen.

## Umsetzung Runde 3 (2026-08-14)

F1–F9 sind umgesetzt:
- **F1:** Kurzbeschreibung unter jedem Kachel-Titel ergänzt (Texte wie oben spezifiziert).
- **F2:** Videos/Feed-Animation starten nicht mehr automatisch, sondern nur bei Hover
  (`mouseenter`/`mouseleave` je Kachel, `video.play()`/`.pause()` + Reset auf Anfang).
  Zusätzlich wächst die Media-Fläche per CSS (`:hover`) auf die volle Kartenhöhe, der
  Textblock darunter blendet dabei aus — rein CSS-basiert, kein Layout-Sprung bei
  Nachbarkacheln, da die Kartenhöhe selbst über das Grid fix bleibt.
- **F3:** Badges (`.mb-kachel-badge`) jetzt gelb (`var(--yellow)`) statt weiß/transparent.
- **F4:** "Teil Ihrer Schulcard"-Tag bei Azubi-Chat entfernt — **K8 ist damit wieder offen**.
- **F5:** Kurzfilm-Kino zeigt wieder den scrollenden Thumbnail-Feed (`.feed-track`,
  8 Bilder + Duplikat für nahtlose Schleife) statt des statischen Bilds — Animation läuft
  ebenfalls erst bei Hover (vorher: durchgehend).
- **F6/F7:** Preis-Karten ohne Button/Feature-Liste, Preisblock jetzt 4 Zeilen
  (Schulvermarktung jährlich / Kreation & Produktion einmalig / Gesamt 1. Jahr /
  ab dem 2. Jahr) — alle Werte gegengerechnet, kein Overflow.
- **F8:** "Reinschauen ›"-Link bei allen 5 Kacheln entfernt.
- **F9:** Medienbox-Foto-Container von `flex:1` (unbegrenzt breit) auf
  `flex:0 1 600px; aspect-ratio:1024/692` umgestellt — bleibt damit innerhalb der
  nativen Bildauflösung, keine Hochskalierung mehr.

**Hinweis zur Verifikation von F2 (Hover):** Das Hover-Verhalten (Video startet, Kachel
wächst) ließ sich in dieser Session nicht per Screenshot bestätigen, da der Browser-Pane
des Testwerkzeugs hier nicht sichtbar rendert (Screenshots/`requestAnimationFrame`
schlagen technisch fehl). Die Event-Registrierung und `video.play()`/`.pause()` wurden
aber isoliert erfolgreich getestet (Listener greifen, Video spielt bei simuliertem Hover
mit realistischem Timing). **Bitte in der Test-Präsentation selbst mit echtem Maus-Hover
gegenprüfen.**

Die beiden zuvor notierten Bugs (Error 153, leere Mini-Games-Vorschau) sind durch diese
Runde **nicht behoben** — beides betrifft Verhalten außerhalb meiner Änderungen (YouTube-
Embed-Restriktion bei `file://`, unklare Video-Ladeproblematik). Bitte bei der nächsten
Test-Präsentation erneut prüfen, ob sie weiterhin auftreten.
