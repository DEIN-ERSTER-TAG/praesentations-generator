require('dotenv').config();
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

// Neue Bedrock-API-Keys (AWS_BEARER_TOKEN_BEDROCK) haben Vorrang - dann
// erkennt der SDK-Default-Provider sie automatisch. Fallback auf das alte
// Access-Key/Secret-Paar, falls kein Bearer-Token gesetzt ist.
const bedrock = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'eu-central-1',
  ...(process.env.AWS_BEARER_TOKEN_BEDROCK ? {} : {
    credentials: {
      accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  }),
});

// Feste Eigenschaften-Liste (deckungsgleich mit den Icons in "Icons Eigenschaften-update" /
// eigenschaften-icons.js) – falls die "traits" beim Refine geändert werden, muss der Name
// weiterhin exakt aus dieser Liste kommen, sonst fehlt in der Schulcard das passende Icon.
const TRAIT_NAMES = ["Analytisches Denken", "Arbeitet gerne im Büro", "Ausdauer", "Belastbarkeit", "Beobachtungsgabe", "Beratungskompetenz", "Bleibt ruhig", "Bühnenpräsenz", "Computer-Fan", "Ehrlichkeit", "Empathie", "Entscheidungsfreude", "Feinschmecker", "Findet Fehler", "Führungsstärke", "Geduld", "Genauigkeit", "Gern unterwegs", "Gern an der frischen Luft", "Geschickte Hände", "Grüner Daumen", "Gutes Farbsehen", "Handwerkliches Geschick", "Hilfsbereitschaft", "Hitzetoleranz", "Hygienebewusstsein", "Kommunikationsstärke", "Konzentrationsfähigkeit", "Körperliche Belastbarkeit", "Kreativität", "Leseratte", "Logisches Denken", "Maschinenverständnis", "Mathematisches Denken", "Multitaskingfähigkeit", "Mut", "Naturverbundenheit", "Offen für Schichtdienst", "Organisationsgeschick", "Orientierungssinn", "Planungsfähigkeit", "Präzision", "Qualitätsbewusstsein", "Räumliches Vorstellungsvermögen", "Reaktionsschnelligkeit", "Rechtliches Verständnis", "Regeltreue", "Respektvoll", "Schwindelfrei", "Selbstständigkeit", "Serviceorientierung", "Sicherheitsbewusstsein", "Sorgfalt", "Sprachtalent", "Stressresistenz", "Systhematisches Denken", "Teamfähigkeit", "Technikbegeisterung", "Technisches Verständnis", "Tierliebe", "Umweltbewusstsein", "Überblick", "Verantwortungsbewusstsein", "Verkaufstalent", "Vertrauenswürdigkeit", "Wetterfestigkeit", "Zahlenverständnis", "Zeichentalent", "Zusammenhänge erkennen", "Zuverlässigkeit", "verhandlungsgeschick"];

const SYSTEM_PROMPT = `Du bist ein Experte für deutsche Ausbildungsberufe, Duale Studiengänge und Unternehmen. Du erstellst und pflegst Inhalte für Schulcards – visuelle Berufserkundungskarten für Schüler*innen (14–16 Jahre). WICHTIGSTE REGELN: (1) Alle Inhalte müssen 100% zum genannten Beruf und Unternehmen passen. Verwende niemals Inhalte aus anderen Berufsfeldern. (2) Verwende KEIN Markdown in Textwerten (keine **Fettung**, keine Unterstriche). (3) Gendering: IMMER *in-Schreibweise (Mechaniker*in, Informatiker*in), niemals /in, (in) oder andere Formen. (4) Behalte alle nicht geänderten Felder exakt bei.`;

// Fallback-Modell: eu.anthropic.claude-sonnet-4-6 lieferte ab Okt. 2026 dauerhaft
// ServiceUnavailableException (503), Sonnet 4.5 lief im selben Account weiter. Bei
// 503/Throttling wird deshalb automatisch auf das Fallback-Modell ausgewichen.
const FALLBACK_MODEL_ID = 'eu.anthropic.claude-sonnet-4-5-20250929-v1:0';
const RETRYABLE = ['ServiceUnavailableException', 'ThrottlingException', 'ModelNotReadyException'];

async function callBedrock(prompt) {
  const primary = process.env.BEDROCK_MODEL_ID || 'eu.anthropic.claude-sonnet-4-6';
  const modelIds = primary === FALLBACK_MODEL_ID ? [primary] : [primary, FALLBACK_MODEL_ID];
  for (let i = 0; i < modelIds.length; i++) {
    try {
      const res = await bedrock.send(new InvokeModelCommand({
        modelId: modelIds[i],
        contentType: 'application/json',
        accept:      'application/json',
        body: JSON.stringify({
          anthropic_version: 'bedrock-2023-05-31',
          max_tokens: 8096,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: prompt }]
        })
      }));
      const body = JSON.parse(Buffer.from(res.body).toString('utf8'));
      return body.content[0].text;
    } catch (err) {
      if (i === modelIds.length - 1 || !RETRYABLE.includes(err.name)) throw err;
      console.warn(`Bedrock ${modelIds[i]}: ${err.name} – weiche auf ${modelIds[i + 1]} aus`);
    }
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { currentData, instruction } = req.body;
    if (!instruction) return res.status(400).json({ error: 'Keine Anweisung angegeben.' });

    const prompt = `Du hast diese Schulcard-Daten generiert:\n\n${JSON.stringify(currentData, null, 2)}\n\nDer Nutzer möchte folgende Änderungen:\n"${instruction}"\n\nPasse nur die betroffenen Felder an, behalte alle anderen exakt bei. Falls du "traits" änderst: jeder "name" muss EXAKT (Schreibweise 1:1) einer dieser Werte sein: ${TRAIT_NAMES.join(', ')}. Antworte NUR mit dem vollständigen aktualisierten JSON – kein Markdown, keine Erklärungen.`;

    let raw = await callBedrock(prompt);
    raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      raw = await callBedrock(prompt + '\n\nWICHTIG: Antworte AUSSCHLIESSLICH mit rohem JSON-Objekt. Kein Text davor oder danach, keine Codeblöcke.');
      raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
      data = JSON.parse(raw);
    }

    res.json({ data });
  } catch (err) {
    console.error(err);
    // AWS-Fehlertyp + HTTP-Status mitliefern, damit Bedrock-Fehler ohne Log-Zugriff diagnostizierbar sind
    res.status(500).json({ error: err.message, errorName: err.name, awsStatus: err.$metadata?.httpStatusCode });
  }
};

module.exports.config = { api: { bodyParser: { sizeLimit: '1mb' } } };
