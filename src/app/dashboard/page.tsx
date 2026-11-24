'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';
import { COURSE_MODULES } from '@/lib/courseData';
import { BookOpen, CheckCircle, Clock, Trophy, ArrowRight, FlaskConical, Award } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const totalLessons = COURSE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = user?.completedLessons?.length || 0;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const completedQuizzesCount = Object.keys(user?.quizScores || {}).length;
  const totalQuizzes = COURSE_MODULES.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Cabeçalho de Boas-Vindas */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-cyan-400">
            Painel do Estudante
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Olá, {user?.name || 'Estudante'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Bem-vindo à disciplina de Mineração de Texto e PLN. Acompanhe seu progresso e continue seus estudos.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/laboratorio"
            className="inline-flex items-center gap-2 bg-institutional-50 dark:bg-slate-800 text-institutional-700 dark:text-cyan-400 border border-institutional-200 dark:border-slate-700 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-institutional-100 transition"
          >
            <FlaskConical className="w-4 h-4" />
            Abrir Laboratório
          </Link>
          <Link
            href="/modulos"
            className="inline-flex items-center gap-2 bg-institutional-700 hover:bg-institutional-800 text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition shadow-sm"
          >
            Continuar Curso
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-2">
            <span>Progresso Geral do Curso</span>
            <Clock className="w-4 h-4 text-institutional-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {progressPercent}%
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-institutional-600 dark:bg-cyan-500 h-full rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            {completedCount} de {totalLessons} aulas finalizadas
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-2">
            <span>Questionários Realizados</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {completedQuizzesCount} / {totalQuizzes}
          </div>
          <p className="text-[11px] text-slate-400">
            {completedQuizzesCount === totalQuizzes ? 'Todos concluídos!' : 'Responda aos questionários ao final de cada módulo.'}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-2">
            <span>Conquistas Acadêmicas</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {completedCount > 0 ? 'Iniciado' : 'Nenhuma'}
          </div>
          <p className="text-[11px] text-slate-400">
            {progressPercent >= 100 ? 'Certificado disponível!' : 'Conclua os 10 módulos para obter o certificado final.'}
          </p>
        </div>
      </div>

      {/* Trilha de Módulos */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Grade Curricular dos 10 Módulos
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Ordem pedagógica recomendada
          </span>
        </div>

        <div className="space-y-4">
          {COURSE_MODULES.map((m) => {
            const hasScore = user?.quizScores?.[m.id] !== undefined;
            const score = user?.quizScores?.[m.id];
            return (
              <div
                key={m.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 transition gap-4"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-institutional-100 dark:bg-slate-800 text-institutional-700 dark:text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">
                    {m.id}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {m.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  {hasScore ? (
                    <span className="text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-md font-medium">
                      Questionário: {score}%
                    </span>
                  ) : (
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2.5 py-1 rounded-md">
                      Pendente
                    </span>
                  )}

                  <Link
                    href={`/modulos/${m.id}`}
                    className="text-xs font-semibold text-institutional-700 dark:text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    Estudar
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
