# Feedback zur Vorlage "B2B Neukunden (Test: Schulprogramm first)"

Betrifft: `templates/neukunden-test-schulprogramm-first.html` (A/B-Test-Variante der Neukunden-Präsi)
Öffentliche Demo: https://det-neukunden-schulprogramm-first.vercel.app
(Quelle: `../Sales_Neukunden_Demo_Schulprogramm_First/` – `python build_demo.py` baut neu, `python deploy_demo.py` lädt hoch)

**Stand 2026-10-22: LIVE.** Runden 1–3 (F1–F9) umgesetzt und veröffentlicht – Generator (Commit 0225d65),
öffentliche Demo (Vercel-Projekt `det-neukunden-schulprogramm-first`) und SalesHelper-Kachel (Commit 5ea3d07).
A/B-Auswertung erfolgt über die Verkäufe, kein technisches Tracking.

**Aktuelle Folienfolge (14 Folien):** 1 Titel · 2 Warum Schule? (69 % | 7 %) · 3 Was bei der Berufswahl wirklich
zählt (91/88/88 % + "Wer hilft") · 4 Direkter Kontakt besetzt Ausbildungsplätze (BIBB) · 5 Drei Wege in die Schule ·
6 Medienbox · 7 Videostunde · 8 Berufsberatung (BA) · 9 Schulen in Ihrer Region · 10 Und womit sind Sie dabei?
(Medienproduktion) · 11 Was kostet ein Schülerkontakt? · 12 Unser Angebot · 13 Wie möchten wir verbleiben? · 14 Kontakt

## Runde 1 – umgesetzt (Details unten)

**F1 — Folie 2 ("Warum Schule?") neu aufbauen.**

- **Hero bleibt:** 69 % der Jugendlichen wünschen sich digitale Unternehmensvorstellungen im Unterricht,
  nur 7 % der Unternehmen sind dort präsent (Bertelsmann/IW 2024).
- **Schöner gestalten, mit den gelben Boxen** (Stil wie die gelben Kästen in der Präsi, `var(--yellow)`).
- Neue Inhalte darunter:
  - **Was Jugendlichen wichtig ist:** Praktika 91 %, Betriebsbesichtigungen 88 %, Gespräche mit
    Lehrkräften/Ausbilder*innen/Berater*innen 88 % (Bertelsmann "Ausbildungsperspektiven" 2024, Abb. 6).
  - **Wer bei der Ausbildungssuche hilft:** Eltern 75 %, Internet 39 %, **Berufsberatung 35 %**,
    **Schule/Lehrkräfte 33 %**, Freunde 31 %, Social Media 12 % (Bertelsmann 2024, Abb. 13).
    Berufsberatung + Schule hervorheben (fett/türkis) – "das decken wir ab".
  - **Fazit-Balken (BIBB Report 3/2023):** Direkter Kontakt (Schulen, Praktika) besetzt Ausbildungsplätze
    zuverlässiger; mehr Anzeigen/Social Media bringen mehr Bewerbungen, aber nicht weniger unbesetzte Stellen.
- **Fallen raus:** 31 % (durch Schule gut informiert), 48 % (Betriebe mit unbesetzten Plätzen),
  86 % vs. 44 % (Praktika vs. Infomaterial, IW-Ausbilderbefragung).
- Quellen-Fußzeile anpassen.

**F2 — Folie 3 ("Drei Wege in die Schule") muss ohne Scrollen auf eine Folie passen.**

- Stand nach Zoom-Korrektur (Bildschirm ca. 1830×750 bei normalem Zoom): Folie ist immer noch **leicht**
  abgeschnitten – Karten reichen bis in die Navigationsleiste, die 8.800-Partnerschulen-Zeile ist nicht mehr
  sichtbar.
- Gewünscht: **Kacheln nur etwas kleiner**, sodass alles inkl. Partnerschulen-Zeile ohne Scrollen passt.
- Umsetzungsidee: Bildhöhe der Karten begrenzen (z.B. `max-height` in `vh` statt festem 16:10-Seitenverhältnis);
  testen bei 1830×750, 1440×810, 1280×720 – **dasselbe auch für die neue Folie 2 prüfen.**

~~F3/F4 — Grafische Fehler auf Folie 4 (Medienbox-Foto überlappt Headline, Lernstationen abgeschnitten)~~
→ **gestrichen (2026-10-22):** lag an zu stark gezoomtem Browser bei Robert, kein Fehler der Vorlage.

**F5 — Eyebrows mit "Phase 1" / "Phase 2" komplett entfernen.**

- Betrifft Folie 4 (Medienbox), 5 (Videostunde), 6 (Berufsberatung/BA) und 8 (Medienproduktion):
  die ganze Eyebrow-Zeile (`<div class="eyebrow">Phase … · …</div>`) fällt weg, nicht nur das Wort "Phase".
- Andere Eyebrows (z.B. "Warum Schule?", "Ihr Weg in die Schule", "Ihr Einzugsgebiet") bleiben.

**F6 — Folie 8 (Medienproduktion): Headline + Einleitung neu, als Überleitung vom "Wo" zum "Womit".**

- Headline: **Und womit <strong>sind Sie dabei?</strong>** (statt "Für Ihre Berufe begeistern.")
- Einleitung: *"Sie wissen jetzt, wie wir Sie in die Klassenzimmer bringen. Jetzt wählen Sie, mit welchem
  Medium. Wir haben vier Ideen mitgebracht:"* – "vier Ideen" bleibt das dynamische `#medium-count-text`.

## Umsetzung Runde 1 (2026-10-22)

F1, F2, F5, F6 in `templates/neukunden-test-schulprogramm-first.html` umgesetzt, Demo neu gebaut.
Getestet bei 1830×750, 1440×810 und 1280×720 (Edge, headless): Folie 2, 3 und 8 passen ohne Scrollen,
keine JS-Fehler.

- **F1:** Hero als gelber Balken (69 % | 7 %), darunter links 3 hellgelbe Boxen (91/88/88 %), rechts
  Balkendiagramm "Wer bei der Ausbildungssuche geholfen hat" mit Berufsberatung + Schule in Türkis/fett und
  dem Hinweis "Hier sind Sie mit uns präsent.", unten türkiser Fazit-Balken (BIBB), Quellenzeile.
- **F2:** Kartenbilder auf Folie 3 haben jetzt eine an die Fensterhöhe gekoppelte Höhe
  (`clamp(110px, 28vh, 240px)`) statt 16:10, Abstände kompakter – Partnerschulen-Zeile bleibt sichtbar.
- **F5:** alle vier "Phase …"-Eyebrows entfernt.
- **F6:** Folie 8: "Und womit **sind Sie dabei?**" + neue Einleitung.

Hinweis: Folie 5 (Videostunde) und Folie 7 (Schulen in Ihrer Region) laufen bei niedrigen Fenstern
(≤ 750 px Höhe) leicht über (+16 bis +53 px). Beide sind aus der Original-Neukunden-Präsi übernommen
(dort mit Eyebrow sogar etwas höher) – im Original also vermutlich genauso, nicht separat geprüft.

## Runde 2 (2026-10-22) – umgesetzt

**F7 — Folie 2 war zu voll → auf drei Folien aufgeteilt, Mitte in Türkis statt Gelb.**

- Folie 2 (`slide-why`): "Jugendliche wollen Sie **im Unterricht kennenlernen.**" – nur der gelbe Hero 69 % | 7 %,
  groß und mittig.
- Folie 3 (`slide-why-2`): "Was bei der Berufswahl **wirklich zählt.**" – 91/88/88 % und Balkendiagramm
  "Wer bei der Ausbildungssuche geholfen hat", beides jetzt in hellem Türkis (Zahlen türkis).
- Folie 4 (`slide-why-3`): "Direkter Kontakt **besetzt Ausbildungsplätze.**" – BIBB-Befund als Gegenüberstellung
  "Direkte Wege (Schulen, Praktika, Messen)" vs. "Indirekte Kanäle (Anzeigen, Jobbörsen, Social Media)".
- Headlines von Folie 3 und 4 sind Claudes Vorschlag – noch nicht von Robert bestätigt.
- Jede Folie hat ihre eigene Quellenzeile. Präsi hat jetzt 14 Folien; "Drei Wege" ist Folie 5.
- Getestet bei 1830×750, 1440×810, 1280×720: kein Überlauf, keine JS-Fehler.

## Runde 3 – umgesetzt und veröffentlicht (2026-10-22)

**F8 — Folie 2 (Hero 69 % | 7 %): Texte kürzen/schärfen.**

- Linker Text: "der Jugendlichen wünschen sich digitale Unternehmensvorstellungen **direkt** im Unterricht …"
  ("direkt" ergänzen).
- Rechter Text: "… aber nur so wenige Unternehmen sind dort präsent." → **"so" streichen**:
  "… aber nur wenige Unternehmen sind dort präsent."
- Quellenzeile: "(n = 1.729 Jugendliche, 441 Unternehmen)" streichen → nur
  "Quelle: Bertelsmann Stiftung/IW „Vom Mismatch zum Match“ 2024".
- Gilt einheitlich: auch auf Folie 3 "(n = 1.729 Jugendliche, 14–25 Jahre)" und auf Folie 4
  "(BIBB-Qualifizierungspanel, 1.630 Ausbildungsbetriebe)" streichen – Quellenzeilen nur noch mit Herausgeber,
  Titel und Jahr.

**F9 — Folie 4 (Direkter Kontakt / BIBB): Farben + bessere Erklärung.**

- Linke Box ("Direkte Wege") **gelb**, rechte Box ("Indirekte Kanäle") **blass grau**.
- Botschaft schärfen – Robert: links "Qualität der Bewerbungen steht im Fokus!", rechts "Erhöht Quantität,
  aber nicht Qualität".
- Achtung Quellentreue: BIBB misst nicht die Bewerbungsqualität, sondern Bewerbungszahl + ob alle Plätze besetzt
  werden. "Qualität/Passung" ist daraus abgeleitet (weniger Bewerbungen, trotzdem mehr Plätze besetzt).
  **Final (von Robert bestätigt):**
  - Links (gelb): Label "Direkte Wege" · Titel "Qualität vor Masse" · Text "Schulen, Praktika, Messen:
    Bewerbungen, die passen. Betriebe besetzen ihre Ausbildungsplätze zuverlässiger." (bewusst ohne "weniger")
  - Rechts (blass grau): Label "Indirekte Kanäle" · Titel "Masse statt Passung" · Text "Anzeigen, Jobbörsen,
    Social Media: mehr Bewerbungen – aber nicht weniger unbesetzte Stellen."

## Offen / Ideen für später

- ~~Headlines von Folie 3 und 4 unbestätigt~~ → von Robert am 23.10. bestätigt.
- Folie 7 (Videostunde) und 9 (Schulen in Ihrer Region) laufen bei Fensterhöhen ≤ 750 px leicht über –
  aus dem Original übernommen, nicht angefasst.
- Rechercheergebnisse (alle Zahlen inkl. nicht verwendeter) sind im Chatverlauf vom 2026-10-22 dokumentiert;
  "Touchpoints bis zur Bewerbung" ist nicht belastbar belegt ("Rule of 7" = Folklore) – nicht verwenden.

