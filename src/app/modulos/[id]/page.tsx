'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COURSE_MODULES } from '@/lib/courseData';
import { useAuth } from '@/components/AuthContext';
import { BookOpen, CheckCircle, ArrowLeft, ArrowRight, HelpCircle, Check, X, FlaskConical } from 'lucide-react';

export default function ModuloDetailPage({ params }: { params: { id: string } }) {
  const moduleId = parseInt(params.id, 10);
  const currentModule = COURSE_MODULES.find((m) => m.id === moduleId);

  const { markLessonComplete, saveQuizScore, user } = useAuth();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  if (!currentModule) {
    return notFound();
  }

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleFinishQuiz = () => {
    let correctCount = 0;
    currentModule.quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / currentModule.quiz.questions.length) * 100);
    saveQuizScore(moduleId, score);
    setShowResults(true);
    markLessonComplete(currentModule.lessons[0].id);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Navegação Superior */}
      <div>
        <Link
          href="/modulos"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-4 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para todos os módulos
        </Link>
        <div className="text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-cyan-400">
          Módulo 0{currentModule.id}
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          {currentModule.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
          {currentModule.subtitle}
        </p>
      </div>

      {/* Objetivos de Aprendizagem */}
      <div className="bg-institutional-50/50 dark:bg-slate-900 border border-institutional-100 dark:border-slate-800 rounded-xl p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-institutional-800 dark:text-cyan-400 mb-3">
          Objetivos de Aprendizagem Deste Módulo:
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currentModule.learningObjectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle className="w-4 h-4 text-institutional-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Conteúdo Pedagógico Estruturado das Aulas */}
      <div className="space-y-8">
        {currentModule.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
          >
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {lesson.title}
              </h2>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md font-mono">
                Aula Teórico-Prática
              </span>
            </div>

            {/* 1. Entenda o Conceito */}
            <div>
              <div className="text-xs font-semibold text-institutional-700 dark:text-cyan-400 uppercase tracking-wider mb-1">
                1. Entenda o Conceito
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {lesson.concept}
              </p>
            </div>

            {/* 2. Como Funciona Tecnicamente */}
            <div>
              <div className="text-xs font-semibold text-institutional-700 dark:text-cyan-400 uppercase tracking-wider mb-1">
                2. Como Funciona (Técnica & Algoritmo)
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {lesson.howItWorks}
              </p>
            </div>

            {/* 3. Aplicação com Dados da COVID-19 */}
            <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-institutional-600 dark:text-cyan-400" />
                3. Exemplo Real na Pandemia de COVID-19
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {lesson.covidExample}
              </p>
            </div>

            {/* 4. Experimente no Laboratório */}
            <div className="border-l-4 border-cyan-500 pl-4 py-1">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                4. Experimente & Analise
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2">
                {lesson.tryItOut}
              </p>
              <Link
                href="/laboratorio"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                Abrir Laboratório de Texto com este exemplo
              </Link>
            </div>

            {/* 5. Interpretação Crítica */}
            <div>
              <div className="text-xs font-semibold text-institutional-700 dark:text-cyan-400 uppercase tracking-wider mb-1">
                5. Como Interpretar o Resultado
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {lesson.interpretation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Questionário Avaliativo do Módulo */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-cyan-400">
              Avaliação de Aprendizagem
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Questionário: {currentModule.title}
            </h2>
          </div>
          {showResults && (
            <span className="text-xs font-semibold bg-institutional-100 dark:bg-slate-800 text-institutional-800 dark:text-cyan-400 px-3 py-1.5 rounded-full">
              Pontuação Registrada: {user?.quizScores?.[moduleId] ?? 0}%
            </span>
          )}
        </div>

        <div className="space-y-6">
          {currentModule.quiz.questions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                {idx + 1}. {q.question}
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  const isCorrect = q.correctIndex === optIdx;

                  let optionStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-institutional-400';
                  if (isSelected && !showResults) {
                    optionStyle = 'border-institutional-600 bg-institutional-50 dark:bg-slate-700 text-institutional-800 dark:text-white font-medium';
                  } else if (showResults) {
                    if (isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-medium';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 line-through';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg text-xs sm:text-sm border transition flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {showResults && isCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                      {showResults && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-600 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-800 dark:text-white">Explicação Pedagógica:</span>{' '}
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          {showResults ? (
            <button
              onClick={handleResetQuiz}
              className="text-xs text-slate-600 dark:text-slate-400 hover:underline"
            >
              Refazer Questionário
            </button>
          ) : (
            <div className="text-xs text-slate-400">
              Responda a todas as questões para registrar sua nota no histórico do aluno.
            </div>
          )}

          {!showResults && (
            <button
              onClick={handleFinishQuiz}
              className="bg-institutional-700 hover:bg-institutional-800 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg transition shadow-sm"
            >
              Enviar e Corrigir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
