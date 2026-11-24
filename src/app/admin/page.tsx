'use client';

import React from 'react';
import { useAuth } from '@/components/AuthContext';
import { ShieldCheck, Users, BookOpen, BarChart3, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { user } = useAuth();

  if (user?.role !== 'PROFESSOR' && user?.role !== 'ADMIN') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Acesso Restrito à Docência</h1>
        <p className="text-xs text-slate-500">
          Você precisa estar conectado com perfil de <strong>Professor</strong> ou <strong>Administrador</strong> para acessar este painel.
        </p>
        <Link
          href="/login"
          className="inline-block bg-institutional-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
        >
          Fazer Login como Professor
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-institutional-600 dark:text-cyan-400">
          Painel de Gestão Acadêmica
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Acompanhamento de Turmas & Docência
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Monitoramento do engajamento dos estudantes na disciplina de Mineração de Texto e PLN.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Estudantes Inscritos</span>
            <Users className="w-4 h-4 text-institutional-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">42</div>
          <p className="text-[11px] text-slate-400 mt-1">Engenharia de Software (Semestre 2026.1)</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Taxa Média de Conclusão</span>
            <BarChart3 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">78.4%</div>
          <p className="text-[11px] text-slate-400 mt-1">+12% após inclusão do laboratório interativo</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Módulos Ativos</span>
            <BookOpen className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">10 / 10</div>
          <p className="text-[11px] text-slate-400 mt-1">Todos os questionários publicados</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Amostra de Estudantes e Rendimento Recente
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-3">Nome / Matrícula</th>
                <th className="p-3">E-mail</th>
                <th className="p-3">Aulas Concluídas</th>
                <th className="p-3">Média nos Questionários</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Lucas Heitor (20220198)</td>
                <td className="p-3 font-mono text-slate-500">lucas.heitor@universidade.edu.br</td>
                <td className="p-3">10 / 10</td>
                <td className="p-3 font-bold text-emerald-600">96%</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[11px]">Concluído</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Mariana Costa (20220204)</td>
                <td className="p-3 font-mono text-slate-500">mariana.costa@universidade.edu.br</td>
                <td className="p-3">8 / 10</td>
                <td className="p-3 font-bold text-institutional-600 dark:text-cyan-400">88%</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-[11px]">Em Andamento</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Gabriel Alves (20220311)</td>
                <td className="p-3 font-mono text-slate-500">gabriel.alves@universidade.edu.br</td>
                <td className="p-3">5 / 10</td>
                <td className="p-3 font-bold text-amber-600">75%</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[11px]">Em Andamento</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
