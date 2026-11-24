'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COURSE_MODULES } from '@/lib/courseData';
import { tokenizeText, computeFrequency, STOPWORDS_PT, stemRSLP } from '@/lib/nlp';
import { ArrowRight, BookOpen, FlaskConical, History, Award, CheckCircle2, FileText, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [demoInput, setDemoInput] = useState(
    'A vacinação e a imunização com a CoronaVac e AstraZeneca no Brasil reduziram as hospitalizações graves e óbitos por COVID-19.'
  );
  const [demoTokens, setDemoTokens] = useState<string[]>([]);
  const [demoFreq, setDemoFreq] = useState<{ term: string; count: number }[]>([]);
  const [hasExecuted, setHasExecuted] = useState(false);

  const runQuickDemo = () => {
    const rawTokens = tokenizeText(demoInput);
    const stems = rawTokens.map(t => stemRSLP(t));
    const freq = computeFrequency(rawTokens, true);
    setDemoTokens(rawTokens);
    setDemoFreq(freq.slice(0, 6));
    setHasExecuted(true);
  };

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-institutional-100 text-institutional-800 dark:bg-institutional-900/60 dark:text-cyan-400 border border-institutional-200 dark:border-institutional-800">
            <Sparkles className="w-3.5 h-3.5" />
            Engenharia de Software • Disciplina de Mineração de Texto e PLN
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Mineração de Texto e Processamento de Linguagem Natural
          </h1>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
            Uma abordagem analítica, rigorosa e empírica da circulação de informações, comunicados oficiais e publicações sanitárias durante a pandemia de <strong>COVID-19 (2020–2023)</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/modulos"
              className="inline-flex items-center gap-2 bg-institutional-700 hover:bg-institutional-800 text-white font-medium px-5 py-3 rounded-lg shadow-sm transition"
            >
              Explorar os 10 Módulos
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/laboratorio"
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 font-medium px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-700 transition"
            >
              <FlaskConical className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Laboratório Interativo de PLN
            </Link>
          </div>
        </div>
      </section>

      {/* Demonstração Interativa Simplificada (Sem necessidade de login) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-cyan-400">
                Demonstração Pública Instantânea
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Experimente o Pipeline de Mineração de Texto
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Veja o algoritmo real de tokenização, remoção de stopwords do português e contagem de termos frequentes.
              </p>
            </div>
            <button
              onClick={runQuickDemo}
              className="inline-flex items-center justify-center gap-2 bg-institutional-600 hover:bg-institutional-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
            >
              Executar Algoritmo
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Texto de Entrada (Comunicado Sanitário):
              </label>
              <textarea
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                rows={4}
                className="w-full text-xs sm:text-sm p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-institutional-500 font-mono"
              />
              <div className="text-[11px] text-slate-400 mt-1">
                Você pode editar o texto acima livremente para testar com outras frases sobre a pandemia.
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Resultado do Processamento:
              </div>
              {hasExecuted ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Tokens identificados ({demoTokens.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5 max-h-24 overflow-y-auto">
                      {demoTokens.map((tok, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-0.5 rounded font-mono ${
                            STOPWORDS_PT.has(tok.toLowerCase())
                              ? 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 line-through'
                              : 'bg-institutional-100 dark:bg-institutional-900/60 text-institutional-800 dark:text-cyan-300 font-medium'
                          }`}
                        >
                          {tok}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Palavras Mais Relevantes (Sem Stopwords):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {demoFreq.map((item, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                          <span className="font-medium text-slate-700 dark:text-slate-200">{item.term}</span>
                          <span className="font-bold text-institutional-600 dark:text-cyan-400">{item.count}x</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-40 flex flex-col items-center justify-center text-slate-400 text-xs text-center">
                  <FileText className="w-8 h-8 mb-2 opacity-50" />
                  Clique em &quot;Executar Algoritmo&quot; para testar a tokenização e filtragem sem login.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grade com os 10 Módulos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-cyan-400">
            Estrutura Pedagógica Completa
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Trilha Progressiva da Disciplina
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Organizada pedagogicamente do entendimento básico de caracteres até a modelagem de tópicos e análise crítica de desinformação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_MODULES.map((m) => (
            <div
              key={m.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-institutional-100 dark:bg-institutional-900/60 text-institutional-700 dark:text-cyan-400 flex items-center justify-center font-bold text-sm mb-4">
                  0{m.id}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
                  {m.title}
                </h3>
                <p className="text-xs text-institutional-600 dark:text-cyan-400 font-medium mb-3">
                  {m.subtitle}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {m.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Exercício + Questionário
                </span>
                <Link
                  href={`/modulos/${m.id}`}
                  className="text-xs font-semibold text-institutional-700 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
                >
                  Acessar
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Destaque do Contexto COVID-19 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-institutional-900 to-slate-900 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <History className="w-3.5 h-3.5" />
              Estudo de Caso Empírico
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              A Análise da Informação durante a Crise da COVID-19
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Entre 2020 e 2023, o mundo vivenciou não apenas uma crise sanitária, mas um fenômeno informacional de proporções históricas. Esta plataforma utiliza documentos oficiais de OMS, Ministério da Saúde e Fiocruz como corpus real para ensinar como técnicas de PLN são indispensáveis para filtrar ruídos e apoiar decisões com evidências.
            </p>
            <div className="pt-2">
              <Link
                href="/painel-covid"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 rounded-lg text-sm transition"
              >
                Abrir Linha do Tempo e Corpus Histórico
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
