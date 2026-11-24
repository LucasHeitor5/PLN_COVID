import React from 'react';
import Link from 'next/link';
import { COURSE_MODULES } from '@/lib/courseData';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

export default function ModulosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-cyan-400">
          Programa Didático
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Módulos da Disciplina
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          Acesse a ementa completa dos 10 módulos de Mineração de Texto e PLN com exemplos reais extraídos do contexto histórico da pandemia de COVID-19.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COURSE_MODULES.map((m) => (
          <div
            key={m.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-institutional-100 dark:bg-institutional-900/60 text-institutional-700 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                  {m.id}
                </span>
                <span className="text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full">
                  {m.lessons.length} Aula(s) • Questionário
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {m.title}
              </h2>
              <div className="text-xs font-semibold text-institutional-600 dark:text-cyan-400 mb-3">
                {m.subtitle}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {m.description}
              </p>

              <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-xs mb-4">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Exemplo Prático na COVID-19:
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {m.practicalExample}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Disponível
              </span>
              <Link
                href={`/modulos/${m.id}`}
                className="inline-flex items-center gap-1.5 bg-institutional-700 hover:bg-institutional-800 text-white text-xs font-medium px-4 py-2 rounded-lg transition"
              >
                Acessar Conteúdo
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
