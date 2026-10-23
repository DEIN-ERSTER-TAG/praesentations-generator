# Feedback zum Präsentations-Generator (allgemein, vorlagenübergreifend)

Feedback wird erst gesammelt, dann gesammelt umgesetzt. Für die Test-Vorlage "Schulprogramm first" siehe
`FEEDBACK-TEST-SCHULPROGRAMM-FIRST.md`.

## Runde 1 (2026-10-23) – umgesetzt und veröffentlicht

**G1 — Männliches Azubi-Platzhalterfoto in der Sprachnachricht austauschen.**

- Betrifft `AZUBI_AVATAR_M` in `index.html` (Base64-JPEG, Pexels): runder Avatar neben z.B.
  "Lukas · Azubi Mechatroniker*in · Cohu GmbH" in der Sprachnachricht-Vorschau der Schulcard. Wird gewählt,
  wenn Bedrock `personGender: 'm'` liefert (`renderSchulcard()`, ca. Zeile 1118).
- Entscheidung: **Weg 1 – anderes Stockfoto** (Pexels/Unsplash, lizenzfrei, ohne Namensnennung).
  Kandidaten werden Robert zur Auswahl gezeigt.
- Hinweis: `index.html` enthält bereits eine **uncommittete Änderung an `AZUBI_AVATAR_W`** (weibliches Foto,
  vermutlich `pexels-oktay-koseoglu-42034955-30333751.jpg` im Projektordner, 15.10.). **Robert (23.10.): wird
  beim Umsetzen mit committet und veröffentlicht.**
- Umsetzung: Foto quadratisch zuschneiden, auf ca. 200×200 px verkleinern, als JPEG-Base64 einsetzen
  (Schulcard ist ein eigenständiges data:-HTML, externe Bild-URLs funktionieren dort nicht).
- Kandidaten-Übersicht: `_avatar_kandidaten_maennlich.png` (Pexels-IDs: 1=35037064, 2=39264623, 3=34433553,
  4=15474967, 5=14586100, 6=31654008, 7=35037063, 8=5384445, 9=16160855, 10=35537873, 12=6102841;
  Nr. 11 lud nicht). → Robert: **zu alt, bitte jünger (~18 Jahre).**
- Zweite, jüngere Auswahl: `_avatar_kandidaten_maennlich_jung.png` (Pexels-IDs: 1=1618592, 2=5462150,
  3=37154367, 4=32076871, 6=8005517 (junge Frau), 7=5211478, 8=6140710, 9=6147118, 10=5211443, 11=8617732,
  12=19378770; Nr. 5 lud nicht). → Robert: gefallen noch nicht.
- Runde 3: `_avatar_kandidaten_maennlich_runde3.png` (Pexels-IDs: 1=31969125, 2=5163464, 3=13103917, 4=33056917,
  5=14081789, 6=38365127, 7=13568424, 8=3799223, 9=6147295, 10=4666447, 11=18699972, 12=4031377, 13=30187929,
  14=12871443, 15=38165826, 16=11091224, 17=6258295 (junge Frau), 18=8573558, 19=4624850, 20=6507723).
- **Entscheidung (2026-10-23): Runde 3, Nr. 3 – Pexels-ID 13103917** ("Stadtpark, leger", offenes Lächeln).
  https://www.pexels.com/de-de/foto/13103917/ – beim Zuschneiden Gesicht mittig in den Rahmen setzen.
- **Umgesetzt (23.10.):** Foto 13103917 auf 260×232 px zugeschnitten (Kopf/Schultern, Gesicht mittig), als
  `AZUBI_AVATAR_M` eingesetzt; die neue `AZUBI_AVATAR_W` wurde mit veröffentlicht.
