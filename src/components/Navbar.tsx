'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthContext';
import { BookOpen, FlaskConical, History, LayoutDashboard, Moon, Sun, UserCheck, ShieldAlert } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { user, logout, isDarkMode, toggleDarkMode } = useAuth();

  const navLinks = [
    { href: '/', label: 'Início', icon: BookOpen },
    { href: '/dashboard', label: 'Painel do Estudante', icon: LayoutDashboard },
    { href: '/modulos', label: 'Módulos', icon: BookOpen },
    { href: '/laboratorio', label: 'Laboratório de Texto', icon: FlaskConical },
    { href: '/painel-covid', label: 'Painel COVID-19', icon: History },
  ];

  if (user?.role === 'PROFESSOR' || user?.role === 'ADMIN') {
    navLinks.push({ href: '/admin', label: 'Docência', icon: ShieldAlert });
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-institutional-800 dark:bg-institutional-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            PLN
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base tracking-tight leading-none">
              Mineração de Texto & PLN
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Estudo de Caso: Pandemia COVID-19
            </div>
          </div>
        </Link>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-institutional-50 text-institutional-700 dark:bg-slate-800 dark:text-cyan-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Controles de Usuário & Tema */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            aria-label="Alternar tema claro/escuro"
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 font-mono">
                {user.name} ({user.role})
              </span>
              <button
                onClick={logout}
                className="text-xs bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-md font-medium transition"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 bg-institutional-700 hover:bg-institutional-800 text-white text-xs sm:text-sm font-medium px-3.5 py-2 rounded-md transition shadow-sm"
            >
              <UserCheck className="w-4 h-4" />
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
