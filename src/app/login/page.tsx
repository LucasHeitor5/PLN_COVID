'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { UserCheck, Shield, GraduationCap, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('estudante@universidade.edu.br');
  const [password, setPassword] = useState('senha123');
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'PROFESSOR'>('STUDENT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-institutional-100 dark:bg-institutional-900/60 text-institutional-700 dark:text-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-3">
            <UserCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Acesso à Plataforma</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Entre com suas credenciais acadêmicas ou selecione um perfil de demonstração
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Perfil de Acesso:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('STUDENT');
                  setEmail('estudante@universidade.edu.br');
                }}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs font-medium border ${
                  selectedRole === 'STUDENT'
                    ? 'border-institutional-600 bg-institutional-50 text-institutional-800 dark:bg-slate-800 dark:text-cyan-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Estudante
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('PROFESSOR');
                  setEmail('professor@universidade.edu.br');
                }}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs font-medium border ${
                  selectedRole === 'PROFESSOR'
                    ? 'border-institutional-600 bg-institutional-50 text-institutional-800 dark:bg-slate-800 dark:text-cyan-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Shield className="w-4 h-4" />
                Professor
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              E-mail Institucional:
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-institutional-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Senha:
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-institutional-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-institutional-700 hover:bg-institutional-800 text-white font-medium py-2.5 rounded-lg text-sm transition mt-2 shadow-sm"
          >
            Entrar no Ambiente
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400">
          Ambiente seguro • Armazenamento criptografado de credenciais
        </div>
      </div>
    </div>
  );
}
