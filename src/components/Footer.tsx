import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 text-slate-500 dark:text-slate-400 text-xs sm:text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-2">
          <div className="font-semibold text-slate-800 dark:text-slate-200 text-base">
            Plataforma Acadêmica de Mineração de Texto e PLN
          </div>
          <p className="max-w-md text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Ambiente educacional desenvolvido para o curso de Engenharia de Software. Explora fundamentos de Processamento de Linguagem Natural com foco empírico nas comunicações públicas da pandemia de COVID-19 (2020–2023).
          </p>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">
            Dados coletados de fontes abertas: OMS, Ministério da Saúde do Brasil e Fiocruz. Em estrita conformidade com preceitos éticos e LGPD.
          </div>
        </div>

        <div>
          <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Recursos da Disciplina</div>
          <ul className="space-y-2 text-xs">
            <li><Link href="/modulos" className="hover:underline">Grade de 10 Módulos</Link></li>
            <li><Link href="/laboratorio" className="hover:underline">Laboratório Textual Interativo</Link></li>
            <li><Link href="/painel-covid" className="hover:underline">Linha do Tempo e Corpus COVID-19</Link></li>
            <li><Link href="/dashboard" className="hover:underline">Acompanhamento de Rendimento</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Institucional</div>
          <ul className="space-y-2 text-xs">
            <li>Curso de Engenharia de Software</li>
            <li>Docência & Coordenação Acadêmica</li>
            <li>Código-Fonte: Repositório GitHub Oficial</li>
            <li>Licença Educacional Aberta</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
        <div>© 2026 Plataforma Educacional de Mineração de Texto e PLN. Todos os direitos reservados.</div>
        <div className="mt-2 sm:mt-0 flex gap-4">
          <span>Acessibilidade WCAG 2.2 AA</span>
          <span>Privacidade LGPD</span>
        </div>
      </div>
    </footer>
  );
}
