// Stopwords em Português (comuns e do domínio da saúde)
export const STOPWORDS_PT = new Set([
  'a', 'ao', 'aos', 'aquela', 'aquelas', 'aquele', 'aqueles', 'aquilo', 'as', 'até',
  'com', 'como', 'da', 'das', 'de', 'dela', 'delas', 'dele', 'deles', 'depois',
  'do', 'dos', 'e', 'é', 'ela', 'elas', 'ele', 'eles', 'em', 'entre', 'era', 'eram',
  'éramos', 'essa', 'essas', 'esse', 'esses', 'esta', 'estas', 'este', 'estes',
  'estou', 'está', 'estávamos', 'estavam', 'estive', 'esteve', 'estiveram',
  'eu', 'foi', 'fomos', 'foram', 'for', 'fora', 'fosse', 'há', 'isso', 'isto',
  'já', 'lhe', 'lhes', 'mais', 'mas', 'me', 'mesmo', 'meu', 'meus', 'minha', 'minhas',
  'muito', 'na', 'nas', 'não', 'no', 'nos', 'nós', 'nossa', 'nossas', 'nosso', 'nossos',
  'num', 'numa', 'o', 'os', 'ou', 'para', 'pela', 'pelas', 'pelo', 'pelos', 'por',
  'qual', 'quando', 'que', 'quem', 'se', 'seja', 'sem', 'ser', 'será', 'seriam',
  'seu', 'seus', 'só', 'sua', 'suas', 'também', 'te', 'tem', 'temos', 'têm',
  'tenho', 'ter', 'teve', 'tinha', 'tinham', 'tive', 'tivemos', 'um', 'uma',
  'você', 'vocês', 'sobre', 'segundo', 'caso', 'casos', 'dia', 'dias', 'ano', 'anos'
]);

// Algoritmo Stemmer RSLP simplificado para língua portuguesa
export function stemRSLP(word: string): string {
  let w = word.toLowerCase();
  if (w.length <= 3) return w;

  // Plural
  if (w.endsWith('ns')) w = w.slice(0, -2) + 'm';
  else if (w.endsWith('res') || w.endsWith('zes')) w = w.slice(0, -2);
  else if (w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1);

  // Feminino
  if (w.endsWith('ona') || w.endsWith('ona')) w = w.slice(0, -3) + 'ao';
  else if (w.endsWith('ora')) w = w.slice(0, -1);
  else if (w.endsWith('a') && w.length > 4) w = w.slice(0, -1);

  // Sufixos verbais comuns
  const verbalSuffixes = ['mentos', 'mento', 'ando', 'endo', 'indo', 'aram', 'eram', 'iram', 'avam', 'aria', 'eria', 'iria', 'asse', 'esse', 'isse', 'ada', 'ado', 'ida', 'ido', 'coes', 'ções', 'ção', 'cao'];
  for (const suf of verbalSuffixes) {
    if (w.endsWith(suf) && w.length - suf.length >= 3) {
      w = w.slice(0, -suf.length);
      break;
    }
  }

  return w;
}

// Tokenizador básico respeitando pontuação e números
export function tokenizeText(text: string): string[] {
  if (!text) return [];
  const clean = text.toLowerCase().replace(/[\n\r\t]/g, ' ');
  const tokens = clean.match(/[\p{L}\p{N}]+(?:['\-_][\p{L}\p{N}]+)*/gu) || [];
  return tokens;
}

// Análise de Frequência de Termos
export function computeFrequency(tokens: string[], removeStopwords = true): { term: string; count: number; relativeFreq: number }[] {
  const filtered = removeStopwords ? tokens.filter(t => !STOPWORDS_PT.has(t.toLowerCase()) && t.length > 2) : tokens;
  const counts: Record<string, number> = {};
  filtered.forEach(t => {
    counts[t] = (counts[t] || 0) + 1;
  });

  const total = filtered.length || 1;
  const result = Object.entries(counts)
    .map(([term, count]) => ({
      term,
      count,
      relativeFreq: Number(((count / total) * 100).toFixed(2))
    }))
    .sort((a, b) => b.count - a.count);

  return result;
}

// Reconhecimento de Entidades Nomeadas (Dicionário com regex e regras para COVID-19 em PT-BR)
export interface EntityResult {
  text: string;
  type: 'ORGANIZAÇÃO' | 'LOCAL' | 'PESSOA' | 'MEDICAMENTO/VACINA' | 'DOENÇA/VÍRUS';
  start: number;
  end: number;
}

export function extractEntities(text: string): EntityResult[] {
  const entities: EntityResult[] = [];
  const patterns: { type: EntityResult['type']; regex: RegExp }[] = [
    { type: 'ORGANIZAÇÃO', regex: /\b(OMS|Ministério da Saúde|Fiocruz|Anvisa|Instituto Butantan|Butantan|Pfizer|AstraZeneca|Sinovac|Moderna|SUS|Universidade de São Paulo|USP|UFRJ)\b/gi },
    { type: 'LOCAL', regex: /\b(Brasil|São Paulo|Rio de Janeiro|Brasília|Manaus|China|Wuhan|Europa|Estados Unidos|Itália)\b/gi },
    { type: 'MEDICAMENTO/VACINA', regex: /\b(CoronaVac|Comirnaty|Vaxzevria|vacina|cloroquina|hidroxicloroquina|ivermectina|dexametasona|remdesivir)\b/gi },
    { type: 'DOENÇA/VÍRUS', regex: /\b(COVID-19|SARS-CoV-2|coronavírus|novo coronavírus|Ômicron|Delta|Gama|SRAG)\b/gi },
    { type: 'PESSOA', regex: /\b(Tedros Adhanom|Luiz Henrique Mandetta|Eduardo Pazuello|Marcelo Queiroga|Dimas Covas|Nísia Trindade)\b/gi }
  ];

  patterns.forEach(({ type, regex }) => {
    let match;
    while ((match = regex.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type,
        start: match.index,
        end: match.index + match[0].length
      });
    }
  });

  return entities.sort((a, b) => a.start - b.start);
}

// Análise de Sentimentos baseada em léxico de saúde pública
const POSITIVE_WORDS = new Set(['cura', 'recuperação', 'imunização', 'imunidade', 'eficácia', 'esperança', 'proteção', 'seguro', 'segurança', 'alta', 'avanço', 'sucesso', 'estabilidade', 'queda', 'redução', 'alívio']);
const NEGATIVE_WORDS = new Set(['morte', 'óbitos', 'óbito', 'crise', 'falta', 'risco', 'grave', 'urgência', 'sintomas', 'internação', 'uti', 'colapso', 'aumento', 'ameaça', 'isolamento', 'infecção', 'contágio', 'perigo']);

export function analyzeSentiment(tokens: string[]): {
  sentiment: 'Positivo' | 'Neutro' | 'Negativo';
  score: number;
  positiveCount: number;
  negativeCount: number;
  details: string;
} {
  let pos = 0;
  let neg = 0;

  tokens.forEach(t => {
    const word = t.toLowerCase();
    if (POSITIVE_WORDS.has(word)) pos++;
    if (NEGATIVE_WORDS.has(word)) neg++;
  });

  const total = pos + neg;
  let score = 0;
  let sentiment: 'Positivo' | 'Neutro' | 'Negativo' = 'Neutro';

  if (total > 0) {
    score = (pos - neg) / total;
    if (score > 0.15) sentiment = 'Positivo';
    else if (score < -0.15) sentiment = 'Negativo';
    else sentiment = 'Neutro';
  }

  return {
    sentiment,
    score: Number(score.toFixed(2)),
    positiveCount: pos,
    negativeCount: neg,
    details: `Foram detectados ${pos} termos associados a desfechos positivos/avanços e ${neg} termos associados a alerta/gravidade.`
  };
}

// TF-IDF e Similaridade de Cosseno entre dois textos
export function computeTFIDF(docs: string[]): { vocabulary: string[]; matrix: number[][] } {
  const tokenizedDocs = docs.map(d => tokenizeText(d).filter(t => !STOPWORDS_PT.has(t) && t.length > 2));
  const vocabSet = new Set<string>();
  tokenizedDocs.forEach(doc => doc.forEach(t => vocabSet.add(t)));
  const vocabulary = Array.from(vocabSet).sort();

  const N = docs.length;
  const df: Record<string, number> = {};
  vocabulary.forEach(term => {
    let count = 0;
    tokenizedDocs.forEach(doc => {
      if (doc.includes(term)) count++;
    });
    df[term] = count;
  });

  const matrix = tokenizedDocs.map(doc => {
    const termCount: Record<string, number> = {};
    doc.forEach(t => termCount[t] = (termCount[t] || 0) + 1);
    const totalTerms = doc.length || 1;

    return vocabulary.map(term => {
      const tf = (termCount[term] || 0) / totalTerms;
      const idf = Math.log(1 + (N / (1 + (df[term] || 0))));
      return Number((tf * idf).toFixed(4));
    });
  });

  return { vocabulary, matrix };
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return Number((dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))).toFixed(4));
}
