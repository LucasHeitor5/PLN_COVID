'use client';

import React, { useState } from 'react';
import { COVID_CORPUS } from '@/lib/covidData';
import {
  tokenizeText,
  computeFrequency,
  STOPWORDS_PT,
  stemRSLP,
  extractEntities,
  analyzeSentiment,
  computeTFIDF,
  cosineSimilarity,
  EntityResult
} from '@/lib/nlp';
import {
  FlaskConical,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  BarChart3,
  Tag,
  Smile,
  FileCheck2,
  Download,
  AlertCircle
} from 'lucide-react';

export default function LaboratorioPage() {
  const [selectedExampleId, setSelectedExampleId] = useState<string>('doc-03');
  const [inputText, setInputText] = useState<string>(COVID_CORPUS[2].text);
  const [activeTab, setActiveTab] = useState<'preprocess' | 'frequency' | 'sentiment' | 'ner' | 'tfidf'>('preprocess');

  // Estados dos Resultados Reais
  const [tokens, setTokens] = useState<string[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<string[]>([]);
  const [stemmedTokens, setStemmedTokens] = useState<{ original: string; stem: string }[]>([]);
  const [frequencies, setFrequencies] = useState<{ term: string; count: number; relativeFreq: number }[]>([]);
  const [entities, setEntities] = useState<EntityResult[]>([]);
  const [sentiment, setSentiment] = useState<{ sentiment: string; score: number; details: string; positiveCount: number; negativeCount: number } | null>(null);

  // Estados para comparação TF-IDF
  const [compareDocIndex, setCompareDocIndex] = useState<number>(1);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [topTermsTFIDF, setTopTermsTFIDF] = useState<{ term: string; score: number }[]>([]);

  const handleSelectPreset = (id: string) => {
    setSelectedExampleId(id);
    const doc = COVID_CORPUS.find(d => d.id === id);
    if (doc) {
      setInputText(doc.text);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.txt') && !file.name.endsWith('.csv')) {
      alert('Por favor, selecione apenas arquivos .txt ou .csv');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInputText(content.slice(0, 15000)); // Limite seguro para análise
      }
    };
    reader.readAsText(file);
  };

  const runAnalysis = () => {
    if (!inputText.trim()) return;

    // 1. Tokenização
    const rawToks = tokenizeText(inputText);
    setTokens(rawToks);

    // 2. Remoção de Stopwords
    const filtered = rawToks.filter(t => !STOPWORDS_PT.has(t.toLowerCase()) && t.length > 2);
    setFilteredTokens(filtered);

    // 3. Stemming RSLP
    const stems = filtered.slice(0, 25).map(t => ({
      original: t,
      stem: stemRSLP(t)
    }));
    setStemmedTokens(stems);

    // 4. Frequência
    const freq = computeFrequency(rawToks, true);
    setFrequencies(freq);

    // 5. NER
    const extractedEnts = extractEntities(inputText);
    setEntities(extractedEnts);

    // 6. Sentimento
    const sent = analyzeSentiment(rawToks);
    setSentiment(sent);

    // 7. TF-IDF com documento de comparação
    const doc2 = COVID_CORPUS[compareDocIndex]?.text || COVID_CORPUS[0].text;
    const tfidfResult = computeTFIDF([inputText, doc2]);
    const sim = cosineSimilarity(tfidfResult.matrix[0], tfidfResult.matrix[1]);
    setSimilarityScore(sim);

    // Top termos por TF-IDF no doc 1
    const doc1Scores = tfidfResult.vocabulary
      .map((term, i) => ({ term, score: tfidfResult.matrix[0][i] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    setTopTermsTFIDF(doc1Scores);
  };

  const exportJSON = () => {
    const data = {
      inputText,
      tokenCount: tokens.length,
      topFrequencies: frequencies.slice(0, 20),
      entities,
      sentiment
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analise_pln_resultado.json';
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Cabeçalho */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-cyan-400">
          Ambiente Computacional
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Laboratório Interativo de Processamento de Linguagem Natural
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl">
          Execute algoritmos reais de PLN diretamente no navegador. Analise notícias, comunicados da OMS e Ministério da Saúde, ou faça upload de seus próprios dados em TXT/CSV.
        </p>
      </div>

      {/* Caixa de Entrada e Configurações */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Exemplos da Pandemia:
            </span>
            <select
              value={selectedExampleId}
              onChange={(e) => handleSelectPreset(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              {COVID_CORPUS.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  [{doc.year}] {doc.title} ({doc.source})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium px-3 py-1.5 rounded-lg cursor-pointer transition border border-slate-200 dark:border-slate-700">
              Carregar TXT / CSV
              <input type="file" accept=".txt,.csv" onChange={handleFileUpload} className="hidden" />
            </label>
            <button
              onClick={runAnalysis}
              className="inline-flex items-center gap-2 bg-institutional-700 hover:bg-institutional-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Executar Análise Completa
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Texto para Processamento:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
            className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-institutional-500 font-mono"
            placeholder="Insira ou cole seu texto em português aqui..."
          />
          <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
            <span>Caracteres: {inputText.length} • Palavras estimadas: {inputText.trim().split(/\s+/).length}</span>
            <span>Algoritmos implementados: RSLP Stemmer, Stopwords PT-BR, TF-IDF Cosseno, Léxico Afetivo e NER Regulatório</span>
          </div>
        </div>
      </div>

      {/* Abas de Resultados */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('preprocess')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'preprocess'
                ? 'border-institutional-600 text-institutional-700 dark:text-cyan-400 dark:border-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            1. Pré-Processamento & Stemming
          </button>
          <button
            onClick={() => setActiveTab('frequency')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'frequency'
                ? 'border-institutional-600 text-institutional-700 dark:text-cyan-400 dark:border-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            2. Frequência & Nuvem de Palavras
          </button>
          <button
            onClick={() => setActiveTab('ner')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'ner'
                ? 'border-institutional-600 text-institutional-700 dark:text-cyan-400 dark:border-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Tag className="w-4 h-4" />
            3. Entidades Nomeadas (NER)
          </button>
          <button
            onClick={() => setActiveTab('sentiment')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'sentiment'
                ? 'border-institutional-600 text-institutional-700 dark:text-cyan-400 dark:border-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Smile className="w-4 h-4" />
            4. Análise de Sentimentos
          </button>
          <button
            onClick={() => setActiveTab('tfidf')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'tfidf'
                ? 'border-institutional-600 text-institutional-700 dark:text-cyan-400 dark:border-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            5. TF-IDF & Similaridade
          </button>
        </div>

        {/* Conteúdo da Aba 1: Pré-Processamento */}
        {activeTab === 'preprocess' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Tokenização e Normalização
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total de tokens extraídos: <strong>{tokens.length}</strong> • Tokens válidos após remoção de stopwords: <strong>{filteredTokens.length}</strong>
                </p>
              </div>
              {tokens.length > 0 && (
                <button
                  onClick={exportJSON}
                  className="flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 font-medium transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Exportar JSON
                </button>
              )}
            </div>

            {tokens.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Clique em &quot;Executar Análise Completa&quot; para visualizar a tokenização.
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Amostra de Tokens (Itens em cinza foram identificados como stopwords eliminadas):
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                    {tokens.map((tok, idx) => {
                      const isStop = STOPWORDS_PT.has(tok.toLowerCase());
                      return (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-0.5 rounded font-mono ${
                            isStop
                              ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 line-through'
                              : 'bg-institutional-100 dark:bg-institutional-900/60 text-institutional-800 dark:text-cyan-300 font-semibold'
                          }`}
                        >
                          {tok}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Comparativo de Stemming (Algoritmo RSLP - Remoção de Afixos em Português):
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {stemmedTokens.map((item, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                        <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Original:</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{item.original}</span>
                        <span className="text-slate-500 dark:text-slate-400 block text-[11px] mt-1">Radical (Stem):</span>
                        <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono">{item.stem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Conteúdo da Aba 2: Frequência e Nuvem */}
        {activeTab === 'frequency' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Frequência de Termos & Representação Visual
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calculada sobre a distribuição real de palavras sem stopwords.
              </p>
            </div>

            {frequencies.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Execute a análise para visualizar as frequências.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Nuvem de Palavras Ponderada por Frequência:
                  </div>
                  <div className="p-6 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-center gap-3 min-h-[220px]">
                    {frequencies.slice(0, 25).map((item, i) => {
                      const scale = Math.min(28, Math.max(12, 12 + item.count * 4));
                      const colors = ['text-institutional-700', 'text-cyan-600', 'text-blue-500', 'text-indigo-600', 'text-slate-700 dark:text-slate-300'];
                      const color = colors[i % colors.length];
                      return (
                        <span
                          key={i}
                          style={{ fontSize: `${scale}px` }}
                          className={`font-bold ${color} hover:scale-110 transition cursor-default`}
                          title={`Ocorrências: ${item.count} (${item.relativeFreq}%)`}
                        >
                          {item.term}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Tabela de Frequência Absoluta e Relativa (%):
                  </div>
                  <div className="overflow-x-auto max-h-[240px] overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <tr>
                          <th className="p-2.5">Termo</th>
                          <th className="p-2.5">Ocorrências</th>
                          <th className="p-2.5">Frequência Relativa</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {frequencies.slice(0, 12).map((item, i) => (
                          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                            <td className="p-2.5 font-medium">{item.term}</td>
                            <td className="p-2.5 font-bold text-institutional-600 dark:text-cyan-400">{item.count}</td>
                            <td className="p-2.5">{item.relativeFreq}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Conteúdo da Aba 3: NER */}
        {activeTab === 'ner' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Reconhecimento de Entidades Nomeadas (NER)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Extração e classificação semântica de órgãos reguladores, medicamentos, patógenos e locais no texto.
              </p>
            </div>

            {entities.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Nenhuma entidade foi extraída ou a análise ainda não foi executada.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-semibold">ORGANIZAÇÃO</span>
                  <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">LOCAL</span>
                  <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-semibold">MEDICAMENTO/VACINA</span>
                  <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold">DOENÇA/VÍRUS</span>
                  <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-semibold">PESSOA</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {entities.map((ent, i) => {
                    let color = 'bg-slate-100 text-slate-800';
                    if (ent.type === 'ORGANIZAÇÃO') color = 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';
                    if (ent.type === 'LOCAL') color = 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
                    if (ent.type === 'MEDICAMENTO/VACINA') color = 'bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
                    if (ent.type === 'DOENÇA/VÍRUS') color = 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
                    if (ent.type === 'PESSOA') color = 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';

                    return (
                      <div key={i} className={`p-3 rounded-xl border text-xs ${color}`}>
                        <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">{ent.type}</span>
                        <span className="font-semibold text-sm">{ent.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Conteúdo da Aba 4: Sentimentos */}
        {activeTab === 'sentiment' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Análise de Sentimentos em Comunicações Sanitárias
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ponderação baseada em léxico especializado em termos de gravidade vs avanços/imunização.
              </p>
            </div>

            {!sentiment ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Execute a análise para visualizar a polaridade textual.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Polaridade Prevista</span>
                    <span className={`text-xl font-extrabold ${
                      sentiment.sentiment === 'Positivo' ? 'text-emerald-600' :
                      sentiment.sentiment === 'Negativo' ? 'text-rose-600' : 'text-slate-600 dark:text-slate-300'
                    }`}>
                      {sentiment.sentiment}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Escore de Polaridade [-1.0 a +1.0]</span>
                    <span className="text-xl font-bold font-mono text-institutional-600 dark:text-cyan-400">
                      {sentiment.score > 0 ? `+${sentiment.score}` : sentiment.score}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Termos Positivos / Negativos</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {sentiment.positiveCount} termos / {sentiment.negativeCount} termos
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Aviso Pedagógico:</span> {sentiment.details} Esta classificação reflete apenas termos do léxico no texto e <strong>não representa a opinião ou emoção individual de seres humanos</strong>.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Conteúdo da Aba 5: TF-IDF & Cosseno */}
        {activeTab === 'tfidf' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Vetorização TF-IDF & Similaridade do Cosseno
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compare o documento analisado com outro documento do corpus oficial da pandemia.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Selecione o documento de comparação do corpus:
              </label>
              <select
                value={compareDocIndex}
                onChange={(e) => setCompareDocIndex(parseInt(e.target.value, 10))}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                {COVID_CORPUS.map((doc, idx) => (
                  <option key={doc.id} value={idx}>
                    Doc {idx + 1}: [{doc.year}] {doc.title}
                  </option>
                ))}
              </select>
            </div>

            {similarityScore === null ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Execute a análise para calcular a similaridade de cosseno.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-institutional-50/50 dark:bg-slate-850 border border-institutional-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                      Similaridade do Cosseno Entre os Dois Documentos:
                    </span>
                    <span className="text-2xl font-extrabold text-institutional-700 dark:text-cyan-400 font-mono">
                      {similarityScore} ({(similarityScore * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 max-w-sm">
                    Um escore próximo a 1.0 indica alta sobreposição temática de termos com alto peso discriminativo; escores abaixo de 0.2 indicam tópicos distintos.
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Termos Mais Representativos do Texto Analisado (Maior Peso TF-IDF):
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {topTermsTFIDF.map((item, i) => (
                      <div key={i} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs flex justify-between items-center">
                        <span className="font-medium text-slate-800 dark:text-slate-200">{item.term}</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{item.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
