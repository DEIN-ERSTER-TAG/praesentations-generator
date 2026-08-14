// Beispielvideos vom DET-YouTube-Kanal (@DeinersterTag) für die Vorlage "Neukunden-Demo B2B".
// Manuell aus den Playlists "#kurzerklärt" (KE_VIDEOS) und "Alle Berufe in 360°" (VR_VIDEOS)
// zusammengetragen (2026-08-14, siehe FEEDBACK-NEUKUNDEN-B2B.md K4) — kein API-Key verfügbar,
// daher kein automatischer Channel-Crawl. Deckt einen Großteil, aber nicht alle Videos ab
// (YouTube-Pagination ließ sich ohne offizielle API nicht vollständig auslesen); bei Bedarf
// später per YouTube Data API v3 vervollständigen/aktuell halten.
const KE_VIDEOS = [
  {
    "id": "d8BK-ZdEogM",
    "beruf": "Abiprogramm Vertrieb (Handelsfachwirt*in)",
    "unternehmen": "Lidl"
  },
  {
    "id": "wPATrmF2xtU",
    "beruf": "Anlagenmechaniker*in",
    "unternehmen": "NEW AG"
  },
  {
    "id": "-s6oy_aw-IM",
    "beruf": "Anlagenmechaniker*in für Sanitär-, Heizungs- und Klimatechnik",
    "unternehmen": "ROM Technik"
  },
  {
    "id": "ws9Wb0YnVSo",
    "beruf": "Bankkauffrau*mann",
    "unternehmen": "Mittelbrandenburgischen Sparkasse"
  },
  {
    "id": "g9jhbIA2dcs",
    "beruf": "Bankkauffrau*mann",
    "unternehmen": "Volksbank Kraichgau eG"
  },
  {
    "id": "Z7pohiF6dFs",
    "beruf": "Baugeräteführer*in",
    "unternehmen": "STRABAG"
  },
  {
    "id": "ZPATaY-araQ",
    "beruf": "Bergbautechnolog*in Tiefbautechnik",
    "unternehmen": "Kaliwerk Zielitz"
  },
  {
    "id": "y1GLPWU-uxw",
    "beruf": "Berufsfeuerwehrmann*frau",
    "unternehmen": "Feuerwehr Hamburg"
  },
  {
    "id": "ud3i3bh3pik",
    "beruf": "Berufskraftfahrer*in",
    "unternehmen": "Streck Transport"
  },
  {
    "id": "jP68513QULA",
    "beruf": "Chemielaborant*in",
    "unternehmen": "BERLIN-CHEMIE"
  },
  {
    "id": "90S8rvL42mQ",
    "beruf": "Diplom-Finanzwirt*in",
    "unternehmen": "Finanzverwaltung NRW"
  },
  {
    "id": "nuzdGbhsy2Q",
    "beruf": "Duales Studium Elektro- und Informationstechnik",
    "unternehmen": "Framatome GmbH"
  },
  {
    "id": "N_UllW7IAx4",
    "beruf": "Duales Studium Informatik",
    "unternehmen": "Polizei Berlin"
  },
  {
    "id": "7HBC3P56fAk",
    "beruf": "Einrichtungsberater*in",
    "unternehmen": "Porta"
  },
  {
    "id": "MufhsDA36dA",
    "beruf": "Einzelhandelskauffrau*mann",
    "unternehmen": "ROSSMANN"
  },
  {
    "id": "4c5R9_Jp7mQ",
    "beruf": "Einzelhandelskaufleute",
    "unternehmen": "Galeria Kaufhof"
  },
  {
    "id": "i6LAhHsbqvg",
    "beruf": "Elektrobereich",
    "unternehmen": "Hüttenwerke Krupp Mannesmann GmbH"
  },
  {
    "id": "oD1cFJVIJUQ",
    "beruf": "Elektroniker*in",
    "unternehmen": "JUMO"
  },
  {
    "id": "23SFX3dTUg0",
    "beruf": "Elektroniker*in",
    "unternehmen": "TRUMPF"
  },
  {
    "id": "9d0TOnGxR0E",
    "beruf": "Elektroniker*in für Automatisierungstechnik und Energie",
    "unternehmen": "ROM Technik"
  },
  {
    "id": "ot64lgvBJ7E",
    "beruf": "Elektroniker*in für Betriebstechnik",
    "unternehmen": "E.DIS"
  },
  {
    "id": "dUsf_u5P4H4",
    "beruf": "Elektroniker*in für Betriebstechnik & Industriemechaniker*in",
    "unternehmen": "STRABAG Rail"
  },
  {
    "id": "_MzOFFQ5M54",
    "beruf": "Elektroniker*in für Gebäudesystemintegration im E-Handwerk",
    "unternehmen": ""
  },
  {
    "id": "0m9HaDtTw1k",
    "beruf": "Elektroniker*in für IT/IoT Systeme der Gebäudetechnik",
    "unternehmen": "Siemens"
  },
  {
    "id": "nVPwVKbR654",
    "beruf": "Fachkraft für Bäderbetriebe",
    "unternehmen": "den Karlsruher Bädern"
  },
  {
    "id": "V4nBnFX7TFM",
    "beruf": "Fachkraft für Kreislauf- und Abfallwirtschaft",
    "unternehmen": "Stadtreinigung HH"
  },
  {
    "id": "_qbiy24L6Sk",
    "beruf": "Fachkraft für Lagerlogistik",
    "unternehmen": "DSV Global Transport and Logistics"
  },
  {
    "id": "n6uqzLlCHcA",
    "beruf": "Fachkraft im Fahrbetrieb",
    "unternehmen": "VAG Verkehrs-Aktiengesellschaft"
  },
  {
    "id": "Pa9dMGEvr_I",
    "beruf": "Fachmann/-frau für Systemgastronomie (m/w/d)",
    "unternehmen": "McDonalds"
  },
  {
    "id": "sVnYEbJJBmo",
    "beruf": "Feinwerkmechaniker*in",
    "unternehmen": "Bücker + Essing"
  },
  {
    "id": "_XtbM9evvJg",
    "beruf": "Finanzwirt*in",
    "unternehmen": "Finanzverwaltung NRW"
  },
  {
    "id": "ZWrWnwg2DfA",
    "beruf": "Gerüstbauer*in",
    "unternehmen": "Bundesinnung für das Gerüstbauer-Handwerk"
  },
  {
    "id": "tdXhwZX5Qkg",
    "beruf": "Gleisbauer*in und Baugeräteführer*in",
    "unternehmen": "STRABAG Rail"
  },
  {
    "id": "CZj-_98RDcY",
    "beruf": "Handelsfachwirt*in",
    "unternehmen": "Action Deutschland"
  },
  {
    "id": "4FGZiQVMAKg",
    "beruf": "Heilerziehungspfleger*in",
    "unternehmen": "Stiftung Haus Lindenhof"
  },
  {
    "id": "GaxDU5Ds3rs",
    "beruf": "Heilerziehungspfleger*in",
    "unternehmen": "HWBV"
  },
  {
    "id": "Zdm9fnK7K5g",
    "beruf": "Industriekaufleute",
    "unternehmen": "ROM Technik"
  },
  {
    "id": "RzjpwVKCslI",
    "beruf": "Industriekaufmann*frau",
    "unternehmen": "JUMO"
  },
  {
    "id": "ghPuM09bPb8",
    "beruf": "Industriemechaniker*in",
    "unternehmen": "MEILLER"
  },
  {
    "id": "GZyu3LiCM-E",
    "beruf": "Industriemechaniker*in",
    "unternehmen": "Carl Hirschmann GmbH"
  },
  {
    "id": "Ke11DYipChU",
    "beruf": "Kauffrau*mann für Büromanagement",
    "unternehmen": "Netto"
  },
  {
    "id": "yxGLRYGTd3Y",
    "beruf": "Kauffrau*mann für Digitalisierungsmanagement",
    "unternehmen": "Berlin-Chemie"
  },
  {
    "id": "b2MmnKW3yjE",
    "beruf": "Kaufleute für Spedition und Logistik",
    "unternehmen": "DSV Global Transport & Logistics"
  },
  {
    "id": "bKklOEHhbtE",
    "beruf": "Kaufleute im Gesundheitswesen",
    "unternehmen": "Techniker Krankenkasse"
  },
  {
    "id": "l9LjgJTBM4s",
    "beruf": "Kaufmann*frau für Digitalisierungsmanagement",
    "unternehmen": "GASAG"
  },
  {
    "id": "N7BVLoTsf9A",
    "beruf": "Kaufmann*frau für Versicherungen und Finanzanlagen",
    "unternehmen": "ERGO Group AG"
  },
  {
    "id": "sHdKMQb2id0",
    "beruf": "Kaufmann*frau im Groß- und Außenhandelsmanagement",
    "unternehmen": "KRAHN Chemie"
  },
  {
    "id": "AEKOoKTPti0",
    "beruf": "KFZ-Mechatroniker*in",
    "unternehmen": "Unternehmensgruppe KAHLE"
  },
  {
    "id": "4RZ05i6VJ-w",
    "beruf": "Konstruktionsmechaniker*in",
    "unternehmen": "EJ Deutschland GmbH"
  },
  {
    "id": "qyDXi98j7Jo",
    "beruf": "Land- und Baumaschinenmechatroniker*in",
    "unternehmen": "Vermeer"
  },
  {
    "id": "q8BdA0iRWdY",
    "beruf": "Landschaftsgärtner*in Augala",
    "unternehmen": ""
  },
  {
    "id": "lO6RiHyoHfA",
    "beruf": "Maschinen- und Anlagenführer*in",
    "unternehmen": "Berlin-Chemie"
  },
  {
    "id": "-4ktzZWk2OE",
    "beruf": "Mechaniker*in",
    "unternehmen": "JUMO"
  },
  {
    "id": "NRmry07irbs",
    "beruf": "Mechatroniker*in",
    "unternehmen": "Berlin-Chemie"
  },
  {
    "id": "AFpiRzr4X9E",
    "beruf": "Medientechnolog*in",
    "unternehmen": "Vogel Druck und Medienservice GmbH"
  },
  {
    "id": "wK0t1scyDk8",
    "beruf": "Medientechnolog*in Druck",
    "unternehmen": "Thüringer Papierwarenfabrik C. Schröter GmbH & Co KG"
  },
  {
    "id": "0X_b2aTDx98",
    "beruf": "Metallbereich",
    "unternehmen": "Hüttenwerke Krupp Mannesmann GmbH"
  },
  {
    "id": "rjvC_xOI1ao",
    "beruf": "Notfallsanitäter*in",
    "unternehmen": "Feuerwehr Hamburg"
  },
  {
    "id": "aRt3kJ_TEWA",
    "beruf": "Papiertechnolog*in",
    "unternehmen": "UPM Ettringen & UPM Schongau"
  },
  {
    "id": "48KRM_ZrJEs",
    "beruf": "Personaldienstleistungskauffrau*mann",
    "unternehmen": "Hays"
  },
  {
    "id": "5_RHij3VU-8",
    "beruf": "Pflegefachkraft",
    "unternehmen": "GGP-Gruppe"
  },
  {
    "id": "WtFhEt8-EPU",
    "beruf": "Pflegefachkraft",
    "unternehmen": "Stiftung Haus Lindenhof"
  },
  {
    "id": "hactlr8rNmI",
    "beruf": "Pflegefachkraft",
    "unternehmen": "Rehabilitationszentrum Godeshöhe e.V"
  },
  {
    "id": "BDRYJYtcPfc",
    "beruf": "Pflegefachkraft",
    "unternehmen": "Vitos Südhessen gemeinnützige GmbH"
  },
  {
    "id": "8Xhywx8gyqQ",
    "beruf": "Pflegefachkraft",
    "unternehmen": "Klinikverbund Landkreis Diepholz gGmbH"
  },
  {
    "id": "RmYdLUsjneg",
    "beruf": "Pflegefachkraft im Immanuel Klinikum Bernau Herzzentrum Brandenburg",
    "unternehmen": ""
  },
  {
    "id": "Hl9QjdJZh-0",
    "beruf": "Pflegefachkraft lernen",
    "unternehmen": "Elisabeth von Thüringen-Akademie in Marburg"
  },
  {
    "id": "JL9YMXA1vIY",
    "beruf": "Polizeisekretär*in",
    "unternehmen": "Polizei Berlin"
  },
  {
    "id": "lWQBN79R2cU",
    "beruf": "Polizeivollzugsbeamt*in gelernt",
    "unternehmen": "FH Güstrow"
  },
  {
    "id": "uGsxUGgQpBY",
    "beruf": "Polizist*in",
    "unternehmen": "Polizei Berlin"
  },
  {
    "id": "rhP6T4OQIe4",
    "beruf": "Speditionskaufmann*frau",
    "unternehmen": "Streck Transport"
  },
  {
    "id": "YTlE7OZfxEE",
    "beruf": "Steuerfachangestelle*r",
    "unternehmen": "Consilia"
  },
  {
    "id": "dMX_jYgcblc",
    "beruf": "Straßenbauer*in",
    "unternehmen": "STRABAG"
  },
  {
    "id": "TM98vsCY-k8",
    "beruf": "Süßwarentechnolog*in",
    "unternehmen": "Ludwig Schokolade GmbH & Co. KG"
  },
  {
    "id": "kDYH_Q3Inbg",
    "beruf": "Technische*r Systemplaner*in",
    "unternehmen": "ROM Technik"
  },
  {
    "id": "NT9E04QWR7I",
    "beruf": "Technische*r Systemplaner*in Fachrichtung Elektrotechnische Systeme",
    "unternehmen": "INNIUS DÖ"
  },
  {
    "id": "dWXge-y4se8",
    "beruf": "Verfahrensmechaniker*in Kunststoff und Kautschuk",
    "unternehmen": "Berry Global"
  },
  {
    "id": "74z0_fomRlQ",
    "beruf": "Verkäufer*in und Kaufmann*frau im Einzelhandel",
    "unternehmen": "Lidl"
  },
  {
    "id": "e9U8JlO4T-0",
    "beruf": "Verkäufer*in und Kaufmann*frau im Einzelhandel",
    "unternehmen": "Netto"
  },
  {
    "id": "jeAWuBn5jQ8",
    "beruf": "Verwaltungsfachangestellte*r",
    "unternehmen": "Johann Wolfgang Goethe-Universität"
  },
  {
    "id": "EEebn1Qq6A0",
    "beruf": "Verwaltungsfachangestellte*r",
    "unternehmen": "Landkreis Emsland"
  },
  {
    "id": "oK32xNPeODM",
    "beruf": "Zahnmedizinische*r Fachangestellte*r",
    "unternehmen": "Zahnärztekammer Hamburg"
  },
  {
    "id": "Paxj0tVDcjc",
    "beruf": "Zahnmedizinische*r Fachangestellte*r",
    "unternehmen": "Prof. Dr. Dhom & Kollegen MVZ GmbH"
  }
];

const VR_VIDEOS = [
  {
    "id": "Az7mEtBvOso",
    "beruf": "Anlagenmechaniker*in für Rohrsystemtechnik",
    "unternehmen": "NBB"
  },
  {
    "id": "kiJvBEB-hy0",
    "beruf": "Apotheker*in",
    "unternehmen": "ABDA"
  },
  {
    "id": "-CPkxh50Q5o",
    "beruf": "Bachelor Elektro- und Informationstechnik",
    "unternehmen": "Siemens"
  },
  {
    "id": "0fLkv7zN0fg",
    "beruf": "Bachelor IT-Management",
    "unternehmen": "Siemens"
  },
  {
    "id": "guie3RKobfA",
    "beruf": "Bachelor of Business Administration",
    "unternehmen": "Deichmann"
  },
  {
    "id": "244W5kZBjTk",
    "beruf": "Bankkauffrau*mann",
    "unternehmen": "Mittelbrandenburgischen Sparkasse"
  },
  {
    "id": "wWhgj2jyBbE",
    "beruf": "Bankkaufleute",
    "unternehmen": "Deutschen Bank"
  },
  {
    "id": "grm8wHmRLBk",
    "beruf": "Berufskraftfahrer*in",
    "unternehmen": "Alba"
  },
  {
    "id": "H9NGlt-3kII",
    "beruf": "Berufskraftfahrer*in",
    "unternehmen": "REWE"
  },
  {
    "id": "cMl4YOJap6s",
    "beruf": "Brunnenbauer*in im deutschen Baugewerbe",
    "unternehmen": ""
  },
  {
    "id": "7rwh06Zds10",
    "beruf": "Diplom Rechtspfleger*in",
    "unternehmen": "nordrhein-westfälischen Justizministerium"
  },
  {
    "id": "ff75Aec-lLM",
    "beruf": "Drogist*in",
    "unternehmen": "DM"
  },
  {
    "id": "4bpoEhCBzy4",
    "beruf": "Duales Studium Elektrotechnik",
    "unternehmen": "Siemens Mobility"
  },
  {
    "id": "UjX2Ha3NarQ",
    "beruf": "Duales Studium Finanzdienstleistungen",
    "unternehmen": "GRENKE"
  },
  {
    "id": "Lr3ieVdQQzk",
    "beruf": "Duales Studium Informatik",
    "unternehmen": "Siemens"
  },
  {
    "id": "J5On6v_Xixc",
    "beruf": "Duales Studium Zentralbankwesen/Central Banking",
    "unternehmen": "Deutschen Bundesbank"
  },
  {
    "id": "whyrt1L5xkM",
    "beruf": "Duales Studium: Elektrotechnik",
    "unternehmen": "Siemens"
  },
  {
    "id": "rA5nTNFzLtk",
    "beruf": "Duales Studium: Public Administration - Landeshauptstadt Kiel",
    "unternehmen": ""
  },
  {
    "id": "sJzzowTo_F4",
    "beruf": "Duales Studium: Wirtschaftsinformatik",
    "unternehmen": "Finanz Informatik GmbH"
  },
  {
    "id": "2F7xPmfdQ50",
    "beruf": "Elektroniker*in Fachrichtung Energie- & Gebäudetechnik im E-Handwerk",
    "unternehmen": ""
  },
  {
    "id": "2FUm1w72zN0",
    "beruf": "Elektroniker*in für Betriebstechnik",
    "unternehmen": "Bayernwerk Netz GmbH"
  },
  {
    "id": "5SyJae_sG5E",
    "beruf": "Elektroniker*in für Betriebstechnik",
    "unternehmen": "NEW AG"
  },
  {
    "id": "DAn0NBr6K-M",
    "beruf": "Elektroniker*in für Betriebstechnik",
    "unternehmen": "Siemens Mobility"
  },
  {
    "id": "JMpVxnjU8v8",
    "beruf": "Elektroniker*in für Betriebstechnik - Schleswig-Holstein Netz",
    "unternehmen": ""
  },
  {
    "id": "GsxGtyM_B_c",
    "beruf": "Elektroniker*in für Energie- und Gebäudetechnik",
    "unternehmen": "Unternehmensgruppe Beermann"
  },
  {
    "id": "sfJ1tDeN24g",
    "beruf": "Elektroniker*in für Geräte und Systeme",
    "unternehmen": "Bender GmbH & Co. KG"
  },
  {
    "id": "GeMDTtK-uv4",
    "beruf": "Elektroniker*in für IT/IoT-Systeme der Gebäudetechnik",
    "unternehmen": "Siemens"
  },
  {
    "id": "Mp-FiqOFQbc",
    "beruf": "Fachangestellte*r für Arbeitsmarktdienstleistungen",
    "unternehmen": "BA"
  },
  {
    "id": "baRhhYv2LVw",
    "beruf": "Fachinformatiker*in",
    "unternehmen": "GRENKE"
  },
  {
    "id": "uoAYoYFWguo",
    "beruf": "Fachinformatiker*in",
    "unternehmen": "Finanz Informatik GmbH"
  },
  {
    "id": "MOnK3G79kuw",
    "beruf": "Fachinformatiker*in für Systemintegration",
    "unternehmen": "Amazon"
  },
  {
    "id": "hdqGB48j64o",
    "beruf": "Fachkraft für Lagerlogistik",
    "unternehmen": "REWE"
  },
  {
    "id": "iSKniGi5-Hg",
    "beruf": "Fachkraft für Lagerlogistik",
    "unternehmen": "Rolls-Royce Solutions GmbH"
  },
  {
    "id": "gPZ10WrEqqk",
    "beruf": "Fachlagerist*in",
    "unternehmen": "POCO"
  },
  {
    "id": "e2P5EEhkGnM",
    "beruf": "Fachlagerist*in und Fachkraft für Lagerlogistik",
    "unternehmen": "DACHSER"
  },
  {
    "id": "xjNn-S83dgw",
    "beruf": "Fachmann*frau für Systemgastronomie",
    "unternehmen": "McDonald's"
  },
  {
    "id": "QUpub39zFNw",
    "beruf": "Fachverkäufer*in mit Schwerpunkt Fleischerei",
    "unternehmen": "Rewe"
  },
  {
    "id": "8RBcZOzjWWE",
    "beruf": "Finanzwirt*in",
    "unternehmen": "Finanzverwaltung Baden-Württemberg"
  },
  {
    "id": "we3l-Es8QGU",
    "beruf": "Finanzwirt*in",
    "unternehmen": "Finanzverwaltung NRW"
  },
  {
    "id": "8hkooXYnTuU",
    "beruf": "Fliesen-, Platten- und Mosaikleger*in im deutschen Baugewerbe",
    "unternehmen": ""
  },
  {
    "id": "SYqc0SbvSE8",
    "beruf": "Geomatiker*in",
    "unternehmen": "HVBG"
  },
  {
    "id": "GN1Iz8RYO7k",
    "beruf": "Gestalter*in für visuelles Marketing",
    "unternehmen": "Peek & Cloppenburg"
  },
  {
    "id": "ilKTLAncl6I",
    "beruf": "Holzbearbeitungsmechaniker*in",
    "unternehmen": "DeSH (Deutsche Säge- und Holzindustrie Bundesverband e. V.)"
  },
  {
    "id": "4285FlkBxTU",
    "beruf": "Immobilienkaufleute",
    "unternehmen": "Stadt und Land"
  },
  {
    "id": "Vos2irmffBc",
    "beruf": "Industrieinformatiker*in",
    "unternehmen": "Siemens"
  },
  {
    "id": "YZMHThsPn_E",
    "beruf": "Industriekaufleute",
    "unternehmen": "Konrad Reitz Ventilatoren"
  },
  {
    "id": "PZguo2R1BIQ",
    "beruf": "Industriemechaniker*in",
    "unternehmen": "PCK"
  },
  {
    "id": "ITSROcfqD2U",
    "beruf": "Industriemechaniker*in",
    "unternehmen": "Konrad Reitz Ventilatoren"
  },
  {
    "id": "ZHzpa7BPpYU",
    "beruf": "Informationselektroniker*in im E-Handwerk",
    "unternehmen": ""
  },
  {
    "id": "IJ3fWw4nx7o",
    "beruf": "IT specialist for system integration at Amazon | ENGLISH",
    "unternehmen": ""
  },
  {
    "id": "r2jkIQC6Vuc",
    "beruf": "Kauffrau*mann Groß- & Außenhandelsmanagement",
    "unternehmen": "REWE Group"
  },
  {
    "id": "dcrHskyWzLc",
    "beruf": "Kaufleute im Einzelhandel",
    "unternehmen": "Deichmann"
  },
  {
    "id": "xMRsgiTneIE",
    "beruf": "Kaufleute im Einzelhandel",
    "unternehmen": "Fressnapf"
  },
  {
    "id": "pzewQXvypcg",
    "beruf": "Kaufleute im Gesundheitswesen",
    "unternehmen": "BARMER"
  },
  {
    "id": "PE65q6VOAFI",
    "beruf": "Kaufmann*frau für Versicherungen und Finanzanlagen",
    "unternehmen": "Zurich Gruppe Deutschland"
  },
  {
    "id": "EfDsUkZdDuo",
    "beruf": "Kaufmann*frau im Einzelhandel",
    "unternehmen": "POCO"
  },
  {
    "id": "A-YntfC-cnQ",
    "beruf": "Kaufmann/-frau im Groß- und Außenhandel",
    "unternehmen": "Bär & Ollenroth | Ausbildung in 360°"
  },
  {
    "id": "Z8U8jh1pLCA",
    "beruf": "KFZ-Mechatroniker /-in",
    "unternehmen": "AWM | Ausbildung in 360°"
  },
  {
    "id": "06PZ82PBSMc",
    "beruf": "Kfz-Mechatroniker*in",
    "unternehmen": "Iveco"
  },
  {
    "id": "vXDEdbBSTuw",
    "beruf": "Kombimonteur*in – Rohrleitungsbauer*in & Industrieelektriker*in",
    "unternehmen": "Dahmen GmbH & Co. KG"
  },
  {
    "id": "_RsZDhPBBNM",
    "beruf": "Landschaftsgärtner*in",
    "unternehmen": "Ausbildungsförderwerk AUGALA"
  },
  {
    "id": "r_CQFwebG5Y",
    "beruf": "Landwirt*in",
    "unternehmen": "Die Deutschen Bauern"
  },
  {
    "id": "bjG_VMXHrVw",
    "beruf": "Maschinen- und Anlagenführer*in",
    "unternehmen": "KURZ"
  },
  {
    "id": "E2xZ0HzcLQw",
    "beruf": "Mechatronics technician at Amazon | ENGLISH",
    "unternehmen": ""
  },
  {
    "id": "oiXWmMFLbs4",
    "beruf": "Mechatroniker*in",
    "unternehmen": "Amazon"
  },
  {
    "id": "tZCpzoyX0nU",
    "beruf": "Mechatroniker*in",
    "unternehmen": "Siemens"
  },
  {
    "id": "W-sYG9Kr1d4",
    "beruf": "Mechatroniker*in",
    "unternehmen": "Sarstedt"
  },
  {
    "id": "zyLhuWtV2Pg",
    "beruf": "Mechatroniker*in",
    "unternehmen": "VON ARDENNE"
  },
  {
    "id": "2YCL6KHDOXk",
    "beruf": "Mechatroniker*in",
    "unternehmen": "Rolls-Royce Solutions GmbH"
  },
  {
    "id": "49QyM2qsmXg",
    "beruf": "Mechatroniker*in",
    "unternehmen": "MAN"
  },
  {
    "id": "spFQvMsR7ks",
    "beruf": "Mechatroniker*in",
    "unternehmen": "Dräxlmaier"
  },
  {
    "id": "VTkTubFTz6o",
    "beruf": "Mechatroniker*in",
    "unternehmen": "Siemens Mobility"
  },
  {
    "id": "W9xhm-JZQm4",
    "beruf": "Mehr als nur Kabel! So sieht die Ausbildung als Informationselektroniker*in wirklich aus",
    "unternehmen": ""
  },
  {
    "id": "WjfHpTS_hQo",
    "beruf": "Pflegefachkraft",
    "unternehmen": "Helios"
  },
  {
    "id": "qtehsic59tQ",
    "beruf": "Pflegefachkraft in den SRH Kliniken",
    "unternehmen": ""
  },
  {
    "id": "Jmi-5yTGM50",
    "beruf": "Pflegefachleute im Gemeinschaftsklinikum Mittelrhein",
    "unternehmen": ""
  },
  {
    "id": "GTcGYrpWsfY",
    "beruf": "Pflegefachmann*frau im Sana-HANSE Klinikum",
    "unternehmen": ""
  },
  {
    "id": "zwiAASX8YH0",
    "beruf": "Polizist*in",
    "unternehmen": "Polizei Berlin"
  },
  {
    "id": "rP_rp4uExJw",
    "beruf": "Rohrleitungsbauer*in",
    "unternehmen": "MRA"
  },
  {
    "id": "epsEm0wRnb4",
    "beruf": "Spezialtiefbauer*in",
    "unternehmen": "PORR Spezialtiefbau GmbH"
  },
  {
    "id": "-M0L8EvIvSY",
    "beruf": "Spécialiste informatique pour l'intégration de systèmes chez Amazon | FRANCAIS",
    "unternehmen": ""
  },
  {
    "id": "TqgPk1mxZJs",
    "beruf": "Steuerfachangestellte*r in der Steuerberaterbranche",
    "unternehmen": ""
  },
  {
    "id": "lFcBmFErcwg",
    "beruf": "Straßenbauer*in",
    "unternehmen": "STRABAG"
  },
  {
    "id": "otpwN4_r9fU",
    "beruf": "Straßenbauer*in im deutschen Baugewerbe",
    "unternehmen": ""
  },
  {
    "id": "RNEIxRxTyyk",
    "beruf": "Stuckateur*in im deutschen Baugewerbe",
    "unternehmen": ""
  },
  {
    "id": "EOe20p8U1Bc",
    "beruf": "Technicien en mécatronique chez Amazon | FRANCAIS",
    "unternehmen": ""
  },
  {
    "id": "3LiwAvjdpms",
    "beruf": "Verfahrensmechaniker*in Kunststoff- & Kautschuktechnik Viega",
    "unternehmen": ""
  },
  {
    "id": "WWkA2aMGmnc",
    "beruf": "Verwaltungsbeamt*in gelernt",
    "unternehmen": "FH Güstrow"
  },
  {
    "id": "Fe-gQbd89Lo",
    "beruf": "Verwaltungsfachangestellte*r",
    "unternehmen": "Landratsamt Bodenseekreis"
  },
  {
    "id": "Yso25GfFqBA",
    "beruf": "Zöllner*in Einsatzort Autobahn",
    "unternehmen": "Zoll"
  },
  {
    "id": "2ydWpddzpTk",
    "beruf": "Zöllner*in Einsatzort Flughafen",
    "unternehmen": "Zoll"
  },
  {
    "id": "d2NcVuJZZEs",
    "beruf": "Zöllner*in Einsatzort Innendienst",
    "unternehmen": "Zoll"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { KE_VIDEOS, VR_VIDEOS };
}
