# Plataforma Educacional de Mineração de Texto e PLN: Pandemia de COVID-19

Uma plataforma web institucional, moderna, responsiva e interativa desenvolvida para a disciplina **Mineração de Texto e Linguagem Natural** do curso de Engenharia de Software.

**Link da Aplicação em Produção (Vercel):**  
👉 **[https://pln-covid-edu.vercel.app](https://pln-covid-edu.vercel.app)**

---

## 📌 Tema Central
**"Mineração de Texto e Processamento de Linguagem Natural: uma análise da informação durante a pandemia de COVID-19 (2020–2023)."**

A plataforma utiliza comunicados oficiais da Organização Mundial da Saúde (OMS), notas técnicas do Ministério da Saúde do Brasil, boletins epidemiológicos da Fiocruz e dados verificados de agências de checagem para demonstrar a aplicação empírica dos algoritmos de PLN na análise de infodemias em saúde pública.

---

## 🚀 Funcionalidades da Plataforma

### 1. Página Inicial Institucional
- Contextualização histórica do período da pandemia de COVID-19.
- Apresentação pedagógica e objetivos da disciplina de Engenharia de Software.
- **Demonstração Interativa Pública:** Tokenização, remoção de stopwords em PT-BR e contagem de termos frequentes diretamente na home sem necessidade de autenticação.
- Visão geral da trilha de 10 módulos.

### 2. Laboratório Interativo de PLN (`/laboratorio`)
Execução de algoritmos reais em linguagem natural diretamente na interface:
- **Pré-processamento & Stemming:** Segmentação de sentenças, remoção seletiva de stopwords em língua portuguesa e stemmer morfológico baseado no algoritmo RSLP.
- **Frequência & Nuvem de Palavras:** Matrizes de contagem absoluta, frequências relativas percentuais e representação visual em Word Cloud ponderada por tamanho real.
- **Reconhecimento de Entidades Nomeadas (NER):** Categorização com identificadores visuais para `ORGANIZAÇÃO`, `LOCAL`, `MEDICAMENTO/VACINA`, `DOENÇA/VÍRUS` e `PESSOA`.
- **Análise de Sentimentos:** Polaridade léxica especializada em saúde pública acompanhada de explicações pedagógicas sobre as limitações do método em ironias e negações.
- **TF-IDF & Similaridade do Cosseno:** Cálculo de importância relativa de termos entre documentos e métrica de similaridade angular de cosseno.
- Suporte a upload de arquivos `.txt` e `.csv`, além de exportação dos resultados em `.json`.

### 3. Painel Histórico da COVID-19 (`/painel-covid`)
- Linha do tempo de 2020 a 2023 com filtros por ano e categoria temática (*Comunicação Oficial, Vacinação, Epidemiologia, Variantes, Desinformação e Checagem*).
- Corpus com fontes oficiais verificadas (OMS, Ministério da Saúde, Fiocruz, Instituto Butantan, Agência Lupa).
- Identificação de licenças e notas de conformidade com ética e LGPD.

### 4. Grade dos 10 Módulos Didáticos (`/modulos`)
1. **Módulo 1:** Introdução à Mineração de Texto e Infodemia
2. **Módulo 2:** Fundamentos de Linguagem Natural e Desafios do Português
3. **Módulo 3:** Preparação e Limpeza de Dados Textuais
4. **Módulo 4:** Frequência de Termos, TF-IDF e Representação Vetorial
5. **Módulo 5:** Análise de Sentimentos e Mineração de Opinião
6. **Módulo 6:** Classificação Automática e Métricas (Precisão, Recall, F1)
7. **Módulo 7:** Modelagem de Tópicos (LDA)
8. **Módulo 8:** Reconhecimento de Entidades Nomeadas (NER)
9. **Módulo 9:** Desinformação, Fake News e Análise Crítica
10. **Módulo 10:** Projeto Prático Integrador

Cada módulo possui aulas estruturadas (*O que vai aprender, Conceito, Como funciona o algoritmo, Exemplo real COVID-19, Experimente, Interpretação*) e **Questionários Avaliativos** com correção automática, pontuação individual e feedback explicativo para cada opção.

### 5. Perfis e Painéis Administrativos
- **Painel do Estudante (`/dashboard`):** Cálculo de progresso percentual, histórico de questionários e acesso rápido ao laboratório.
- **Painel da Docência (`/admin`):** Indicadores de desempenho das turmas, taxa de conclusão e rendimento discente.
- Suporte completo a Modo Claro e Modo Escuro (Dark Mode).

---

## 🛠️ Tecnologias Utilizadas
- **Frontend / Core:** [Next.js 14](https://nextjs.org/) (App Router), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Deploy & Infraestrutura:** [Vercel](https://vercel.com/)
- **Versionamento:** [Git & GitHub](https://github.com/LucasHeitor5/PLN_COVID)
