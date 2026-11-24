'use client';

import React, { useState } from 'react';
import { COVID_CORPUS } from '@/lib/covidData';
import { History, Calendar, ExternalLink, ShieldCheck, Tag, Filter } from 'lucide-react';

export default function PainelCovidPage() {
  const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string | 'ALL'>('ALL');

  const filteredDocs = COVID_CORPUS.filter((doc) => {
    const matchesYear = selectedYear === 'ALL' || doc.year === selectedYear;
    const matchesCat = selectedCategory === 'ALL' || doc.category === selectedCategory;
    return matchesYear && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Cabeçalho */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-cyan-400">
          Estudo de Caso Empírico
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          COVID-19: Análise Histórica de Dados e Textos (2020–2023)
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl">
          Linha do tempo documentada com comunicados oficiais, notas da Fiocruz, pronunciamentos da OMS e checagens de fatos. Todos os registros possuem fonte verificável, link de origem e licença de uso.
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Ano:
          </span>
          {[('ALL' as const), 2020, 2021, 2022, 2023].map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedYear === yr
                  ? 'bg-institutional-700 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {yr === 'ALL' ? 'Todos os Anos' : yr}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">Todas as Categorias</option>
            <option value="Comunicação Oficial">Comunicação Oficial</option>
            <option value="Vacinação">Vacinação</option>
            <option value="Epidemiologia">Epidemiologia</option>
            <option value="Variantes">Variantes</option>
            <option value="Desinformação e Checagem">Desinformação e Checagem</option>
          </select>
        </div>
      </div>

      {/* Linha do Tempo e Lista de Documentos */}
      <div className="space-y-6">
        {filteredDocs.map((doc, idx) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-institutional-100 text-institutional-800 dark:bg-institutional-900/60 dark:text-cyan-400">
                  {doc.period}
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {doc.source}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                  {doc.category}
                </span>
                <a
                  href={doc.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-institutional-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  Fonte Oficial
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {doc.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif bg-slate-50/50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                &ldquo;{doc.text}&rdquo;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Licença: {doc.license}
              </span>
              <span>Metadados validados pelo projeto acadêmico</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
