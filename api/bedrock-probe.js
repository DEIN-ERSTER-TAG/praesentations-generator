// TEMPORÄR: prüft, welche Bedrock-Modell-IDs im Account antworten. Wird nach der Diagnose wieder gelöscht.
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

const CANDIDATES = [
  'eu.anthropic.claude-sonnet-4-6',
  'global.anthropic.claude-sonnet-4-6',
  'eu.anthropic.claude-sonnet-4-5-20250929-v1:0',
  'global.anthropic.claude-sonnet-4-5-20250929-v1:0',
  'eu.anthropic.claude-haiku-4-5-20251001-v1:0',
  'eu.anthropic.claude-opus-4-6-v1',
  'eu.anthropic.claude-sonnet-5-5',
  'global.anthropic.claude-sonnet-5-5',
  'eu.anthropic.claude-sonnet-5-5-v1:0',
  'global.anthropic.claude-sonnet-5-5-v1:0',
];

module.exports = async (req, res) => {
  if (req.query.k !== 'probe-2dfa') return res.status(404).end();
  const bedrock = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'eu-central-1',
    ...(process.env.AWS_BEARER_TOKEN_BEDROCK ? {} : {
      credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY },
    }),
  });
  const results = await Promise.all(CANDIDATES.map(async (modelId) => {
    try {
      await bedrock.send(new InvokeModelCommand({
        modelId, contentType: 'application/json', accept: 'application/json',
        body: JSON.stringify({ anthropic_version: 'bedrock-2023-05-31', max_tokens: 5, messages: [{ role: 'user', content: 'Hi' }] }),
      }));
      return { modelId, ok: true };
    } catch (err) {
      return { modelId, ok: false, errorName: err.name, status: err.$metadata?.httpStatusCode, msg: err.message.slice(0, 120) };
    }
  }));
  res.json({ region: process.env.AWS_REGION, configured: process.env.BEDROCK_MODEL_ID, bearer: !!process.env.AWS_BEARER_TOKEN_BEDROCK, results });
};
