export interface Module {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  practicalExample: string;
  learningObjectives: string[];
  lessons: {
    id: number;
    title: string;
    concept: string;
    howItWorks: string;
    covidExample: string;
    tryItOut: string;
    interpretation: string;
  }[];
  quiz: {
    questions: {
      id: number;
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }[];
  };
}

export const COURSE_MODULES: Module[] = [
  {
    id: 1,
    title: "Módulo 1 — Introdução à Mineração de Texto",
    subtitle: "Do Texto Bruto ao Conhecimento Acionável",
    description: "Compreenda a distinção entre dados estruturados e não estruturados, o fluxo metodológico de KDD em texto e o papel vital do PLN durante a crise da COVID-19.",
    practicalExample: "Análise de títulos de comunicados da OMS e Ministério da Saúde no início de 2020.",
    learningObjectives: [
      "Diferenciar dados relacionais de textos livres",
      "Mapear as etapas do ciclo de vida de Mineração de Texto",
      "Identificar aplicações de monitoramento de infodemia em saúde pública"
    ],
    lessons: [
      {
        id: 1,
        title: "1.1 O que é Mineração de Texto e PLN?",
        concept: "A Mineração de Texto (Text Mining) é o processo de extrair padrões e informações relevantes a partir de documentos não estruturados, articulando PLN e Aprendizado de Máquina.",
        howItWorks: "Converte sequências de caracteres em representações vetoriais computáveis que algoritmos estatísticos podem processar.",
        covidExample: "Durante o início de 2020, mais de 100.000 artigos científicos e notas sanitárias foram publicados em questão de meses. A leitura manual era inviável; sistemas automatizados sintetizaram achados sobre sintomas e transmissibilidade.",
        tryItOut: "Observe um conjunto de manchetes de janeiro de 2020 e identifique termos que surgiram subitamente: 'pneumonia misteriosa', 'Wuhan', 'quarentena'.",
        interpretation: "O surgimento abrupto de termos novos serve de sinal precursor em vigilância epidemiológica baseada em texto."
      }
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "Qual a principal diferença entre Mineração de Texto e busca tradicional por palavras-chave?",
          options: [
            "A busca por palavras-chave extrai padrões ocultos e semântica automaticamente",
            "A Mineração de Texto descobre relações, agrupa assuntos e quantifica padrões estruturados a partir de dados não estruturados",
            "A Mineração de Texto só funciona com bancos de dados relacionais SQL",
            "Não existe diferença, ambos apenas contam ocorrências exatas"
          ],
          correctIndex: 1,
          explanation: "Enquanto a busca apenas recupera correspondências pontuais, a Mineração de Texto aplica PLN e estatística para revelar novos insights e estruturas a partir do corpus."
        },
        {
          id: 2,
          question: "No contexto da pandemia de COVID-19, qual termo designou a sobrecarga de informações, verídicas ou falsas, que dificultou o acesso a orientações confiáveis?",
          options: [
            "Pandemia Textual",
            "Infodemia",
            "Sobrecarga de N-gramas",
            "Vetorização Crítica"
          ],
          correctIndex: 1,
          explanation: "Infodemia (termo formalizado pela OMS) refere-se ao excesso de informações gerado durante uma crise sanitária, muitas vezes contendo boatos e desinformação."
        }
      ]
    }
  },
  {
    id: 2,
    title: "Módulo 2 — Fundamentos de Linguagem Natural",
    subtitle: "Tokenização, Normalização e o Desafio do Português",
    description: "Aprenda como computadores quebram sentenças em tokens, eliminam ruídos morfológicos e enfrentam a rica flexão verbal e ambiguidade do português brasileiro.",
    practicalExample: "Pré-processamento de comunicados de vacinação do Instituto Butantan e Fiocruz.",
    learningObjectives: [
      "Aplicar tokenização orientada a domínio de saúde",
      "Distinguir e comparar Stemming e Lematização",
      "Avaliar o impacto da remoção de stopwords no significado"
    ],
    lessons: [
      {
        id: 1,
        title: "2.1 Tokenização e Normalização Morfológica",
        concept: "Tokenização é a segmentação de uma cadeia de texto em unidades elementares (tokens). A lematização recupera a forma canônica do dicionário (lema), enquanto o stemming aplica regras de truncamento de sufixos (radical).",
        howItWorks: "Algoritmos como RSLP no Português utilizam regras sucessivas para cortar afixos (ex: 'vacinados' -> 'vacin'). Lematizadores usam análises sintáticas e dicionários léxicos.",
        covidExample: "Em textos sobre 'vacinar', 'vacinou', 'vacinação', o stemmer agrupa todos sob 'vacin', permitindo quantificar a menção ao ato de imunizar uniformemente.",
        tryItOut: "Teste a palavra 'hospitalizações' no laboratório e veja o radical gerado pelo Stemmer comparado à sua forma original.",
        interpretation: "Reduzir palavras variantes a uma raiz comum condensa a dimensionalidade do vocabulário em até 60%."
      }
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "Qual a diferença central entre Lematização e Stemming?",
          options: [
            "Stemming usa dicionário para achar a raiz canônica válida; lematização faz cortes heurísticos",
            "Lematização considera classe gramatical e dicionário retornando uma palavra real (ex: 'foi' -> 'ser'); stemming aplica regras heurísticas de corte",
            "Ambas são idênticas na língua portuguesa",
            "Lematização serve apenas para textos em inglês"
          ],
          correctIndex: 1,
          explanation: "A lematização utiliza análise morfológica e vocabulário real para encontrar o lema do termo, enquanto o stemming remove sufixos por regras simples, podendo gerar radicais não dicionarizados."
        }
      ]
    }
  },
  {
    id: 3,
    title: "Módulo 3 — Preparação e Limpeza de Dados Textuais",
    subtitle: "Remoção de Ruídos e Construção de Corpus Confiáveis",
    description: "Tratamento de caracteres especiais, remoção de URLs, menções e tags de comunicados oficiais e postagens em redes sociais.",
    practicalExample: "Higienização de tweets públicos e notícias sobre medidas não farmacológicas.",
    learningObjectives: ["Expressões regulares para limpeza", "Tratamento de acentuação", "Ética na seleção de corpus"],
    lessons: [{
      id: 1,
      title: "3.1 Pipeline de Limpeza de Textos Sanitários",
      concept: "Dados brutos da web contêm código HTML, pontuação dispersa e caracteres corrompidos que prejudicam modelos de aprendizado.",
      howItWorks: "Aplica-se regex para remoção de metadados desnecessários mantendo entidades de interesse intactas.",
      covidExample: "Tweets com hashtags '#UseMascara' e links de agências foram padronizados para texto plano.",
      tryItOut: "No laboratório, cole um texto com pontuação e verifique a limpeza.",
      interpretation: "Uma boa limpeza previne que termos idênticos sejam contados como vocábulos distintos devido a pontuações coladas."
    }],
    quiz: {
      questions: [{
        id: 1,
        question: "Por que não se deve simplesmente remover toda a pontuação sem análise prévia no contexto da COVID-19?",
        options: [
          "Porque os algoritmos exigem ponto final para funcionar",
          "Porque termos técnicos como 'COVID-19' ou 'SARS-CoV-2' podem ser corrompidos se o hífen for removido indiscriminadamente",
          "Pontuação nunca deve ser removida",
          "Porque o português não possui caracteres especiais"
        ],
        correctIndex: 1,
        explanation: "Hífens em nomes de patógenos e variantes ('COVID-19') devem ser preservados para não quebrar a entidade em dois tokens desconexos ('covid' e '19')."
      }]
    }
  },
  {
    id: 4,
    title: "Módulo 4 — Frequência de Termos e Vetorização",
    subtitle: "Bag of Words, TF-IDF e Espaços Vetoriais",
    description: "Como documentos são transformados em vetores numéricos de alta dimensão e como o TF-IDF penaliza termos onipresentes.",
    practicalExample: "Comparação do TF-IDF de notícias de 2020 (fase de isolamento) vs 2021 (fase de vacinação).",
    learningObjectives: ["Entender a formulação matemática do TF-IDF", "Calcular Similaridade do Cosseno", "Criar Matrizes Termo-Documento"],
    lessons: [{
      id: 1,
      title: "4.1 A Matemática do TF-IDF",
      concept: "TF-IDF (Term Frequency - Inverse Document Frequency) mede a relevância de uma palavra em um documento específico em relação a todo o corpus.",
      howItWorks: "TF multiplica a frequência local do termo no documento; IDF calcula o logaritmo da razão do número total de documentos pelo número de documentos que contêm a palavra.",
      covidExample: "A palavra 'vírus' aparece em todos os documentos de COVID-19 (baixo IDF). Já 'CoronaVac' aparece apenas em textos sobre vacinas (alto IDF).",
      tryItOut: "Compare dois comunicados no laboratório para calcular o TF-IDF e a similaridade de cosseno.",
      interpretation: "Termos com alto TF-IDF são os melhores descritores do tópico do documento."
    }],
    quiz: {
      questions: [{
        id: 1,
        question: "Se a palavra 'pandemia' ocorre em 100% dos documentos de uma base sobre COVID-19, o que acontece com o seu valor IDF?",
        options: [
          "Fica muito alto, pois ela é a palavra mais importante",
          "Aproxima-se de zero, indicando que ela não tem poder discriminativo entre os documentos daquela coleção",
          "Torna-se infinito",
          "Transforma todos os outros termos em zero"
        ],
        correctIndex: 1,
        explanation: "Como log(N/N) = log(1) = 0, termos presentes em todos os documentos recebem IDF zero ou próximo a zero, perdendo peso de diferenciação."
      }]
    }
  },
  {
    id: 5,
    title: "Módulo 5 — Análise de Sentimentos e Mineração de Opinião",
    subtitle: "Classificação Afetiva e Limitações em Textos Complexos",
    description: "Métodos baseados em léxicos e classificadores estatísticos para polaridade textual, ironia e linguagem informal.",
    practicalExample: "Avaliação do tom de comentários públicos a respeito da chegada das primeiras doses da vacina em 2021.",
    learningObjectives: ["Identificar polaridade positiva, neutra e negativa", "Reconhecer limitações em ironia e negações", "Diferenciar sentimento do texto da emoção humana real"],
    lessons: [{
      id: 1,
      title: "5.1 Polaridade Textual e Desafios de Contexto",
      concept: "Análise de sentimentos busca identificar a orientação semântica (positiva, negativa ou neutra) expressa em um texto.",
      howItWorks: "Léxicos atribuem pesos afetivos pré-determinados a cada palavra; somatórios e ponderações contextuais determinam o escore final.",
      covidExample: "A frase 'Não tivemos falta de leitos' possui uma palavra negativa ('falta') precedida por um modificador de negação ('Não'), invertendo o sentido.",
      tryItOut: "Experimente frases com negações e contraste as classificações no laboratório.",
      interpretation: "Classificadores simples de saco de palavras falham em negações compostas e sarcasmo."
    }],
    quiz: {
      questions: [{
        id: 1,
        question: "Por que a análise de sentimentos em posts sobre a pandemia exige cautela ao interpretar resultados automatizados?",
        options: [
          "Porque computadores sentem emoções com maior intensidade que humanos",
          "Porque sarcasmo, ironia, negações e termos clínicos de gravidade podem ser mal interpretados como ódio ou positividade espúria",
          "Porque textos de saúde nunca possuem adjetivos",
          "Porque os algoritmos de sentimento são 100% imunes a erros"
        ],
        correctIndex: 1,
        explanation: "A linguagem humana em momentos de crise é rica em ironias, metáforas e negações, gerando desvios quando analisada estritamente por palavras isoladas."
      }]
    }
  },
  {
    id: 6,
    title: "Módulo 6 — Classificação Automática de Textos",
    subtitle: "Modelos Supervisionados e Métricas de Avaliação",
    description: "Classificadores Naive Bayes, Regressão Logística e Transformers aplicados à categorização temática de notícias da pandemia.",
    practicalExample: "Categorização de artigos em: Prevenção, Sintomas, Vacinas e Políticas Públicas.",
    learningObjectives: ["Divisão Treino/Teste", "Matriz de Confusão", "Precisão, Recall e F1-Score"],
    lessons: [{
      id: 1,
      title: "6.1 Métricas de Avaliação em Saúde",
      concept: "Em tarefas de classificação, a acurácia isolada é insuficiente, especialmente quando classes são desbalanceadas.",
      howItWorks: "Calcula-se a Matriz de Confusão para derivar Precisão (verdadeiros positivos sobre todos previstos positivos) e Recall (capacidade de encontrar todos os casos reais).",
      covidExample: "Na triagem de textos sobre sintomas graves, um Recall alto é prioritário para que nenhum paciente com risco seja ignorado.",
      tryItOut: "Veja a matriz de confusão e compare classes no módulo interativo.",
      interpretation: "O equilíbrio entre precisão e revocação é sintetizado pelo F1-Score harmônico."
    }],
    quiz: {
      questions: [{
        id: 1,
        question: "Se um modelo prevê corretamente 95 de 100 notícias normais, mas deixa passar 8 de 10 notícias falsas críticas, qual métrica reflete essa falha?",
        options: [
          "Acurácia geral alta",
          "Baixo Recall (Revocação) na classe de notícias falsas críticas",
          "Excesso de tokens no vocabulário",
          "Superajuste de stopwords"
        ],
        correctIndex: 1,
        explanation: "O Recall mede a capacidade do classificador de capturar instâncias da classe de interesse. Um baixo recall indica que a maioria dos casos críticos não foi detectada."
      }]
    }
  },
  {
    id: 7,
    title: "Módulo 7 — Modelagem de Tópicos",
    subtitle: "Descoberta de Assuntos Não Supervisionada com LDA",
    description: "Latent Dirichlet Allocation para descoberta automática de temas em coleções volumosas de comunicados sem anotação prévia.",
    practicalExample: "Identificação dos 4 tópicos dominantes nos editoriais de saúde entre 2020 e 2022.",
    learningObjectives: ["Compreender a natureza probabilística do LDA", "Interpretar distribuições palavra-tópico", "Avaliar coerência semântica"],
    lessons: [{
      id: 1,
      title: "7.1 Como o LDA Agrupa Documentos",
      concept: "O LDA assume que cada documento é uma mistura probabilística de tópicos latentes, e cada tópico é uma distribuição de palavras.",
      howItWorks: "Através de amostragem de Gibbs ou inferência variacional, ajusta-se as probabilidades até que as palavras coocorrentes formem aglomerados coerentes.",
      covidExample: "O Tópico 1 agrupa ['máscara', 'distanciamento', 'higiene']; o Tópico 2 agrupa ['ensaio', 'clínico', 'eficácia', 'vacina'].",
      tryItOut: "Observe os tópicos gerados pelo corpus da pandemia no laboratório.",
      interpretation: "Permite mapear a agenda pública sem a necessidade de rotulagem humana exaustiva."
    }],
    quiz: {
      questions: [{
        id: 1,
        question: "A modelagem de tópicos com LDA é um algoritmo de aprendizado:",
        options: [
          "Supervisionado, necessitando de rótulos prévios de especialistas para cada texto",
          "Não supervisionado, descobrindo padrões latentes de coocorrência de palavras sem rótulos",
          "Por reforço, que aplica punições a documentos errados",
          "Determinístico, que sempre gera exatamente os mesmos tópicos em qualquer ordem"
        ],
        correctIndex: 1,
        explanation: "O LDA é não supervisionado; ele descobre a estrutura temática a partir das correlações estatísticas entre os termos do próprio corpus."
      }]
    }
  },
  {
    id: 8,
    title: "Módulo 8 — Reconhecimento de Entidades Nomeadas (NER)",
    subtitle: "Extração de Organizações, Locais, Drogas e Autoridades",
    description: "Identificação e classificação contextual de entidades específicas (NER) em documentos biomédicos e governamentais.",
    practicalExample: "Extração de menções a 'Fiocruz', 'CoronaVac', 'Anvisa' e 'Ministério da Saúde' em decretos e notícias.",
    learningObjectives: ["Compreender marcação BIO / IOB", "Identificar entidades de saúde", "Lidar com polissemias e ambiguidades"],
    lessons: [{
      id: 1,
      title: "8.1 Entidades em Saúde Pública",
      concept: "NER (Named Entity Recognition) localiza e categoriza elementos em texto livre em classes pré-definidas como Pessoas, Organizações, Locais e Medicamentos.",
      howItWorks: "Modelos de sequência (CRF, spaCy, BiLSTM, BERT) utilizam janelas de contexto para determinar os limites e o rótulo de cada entidade.",
      covidExample: "Em 'A Anvisa aprovou o uso emergencial no Brasil', 'Anvisa' é categorizada como ORGANIZAÇÃO e 'Brasil' como LOCAL.",
      tryItOut: "Teste a extração de entidades no laboratório com frases sobre vacinação.",
      interpretation: "Possibilita construir grafos de conhecimento ligando órgãos reguladores a vacinas autorizadas."
    }],
    quiz: {
      questions: [{
        id: 1,
        question: "Qual problema de ambiguidade ocorre frequentemente ao tentar reconhecer entidades de saúde sem contexto?",
        options: [
          "Palavras que podem ser nomes de pessoas e nomes de instituições ao mesmo tempo (ex: Oswaldo Cruz - cientista vs Fiocruz - fundação)",
          "O português não permite distinguir substantivos de adjetivos",
          "Entidades só podem ter uma única letra",
          "Nenhuma entidade pode ser localizada em textos curtos"
        ],
        correctIndex: 0,
        explanation: "A polissemia e a sobreposição de nomes próprios exigem que o classificador considere a vizinhança sintática para classificar corretamente."
      }]
    }
  },
  {
    id: 9,
    title: "Módulo 9 — Desinformação e Análise Crítica da Linguagem",
    subtitle: "Padrões Linguísticos de Fake News e Checagem de Fatos",
    description: "Investigação dos traços morfossintáticos de mensagens sensacionalistas, viés em classificadores automáticos e a importância da checagem humana.",
    practicalExample: "Comparação de mensagens virais de aplicativos de mensagens com notas de verificação de agências de fact-checking.",
    learningObjectives: ["Detectar sensacionalismo e apelo emocional em textos", "Entender que a IA não é árbitro final da verdade", "Reconhecer limitações éticas de classificadores"],
    lessons: [{
      id: 1,
      title: "9.1 A Linguística do Boato",
      concept: "Textos de desinformação frequentemente utilizam excesso de pontuação exclamativa, palavras de urgência ('URGENTE! COMPARTILHEM!'), ausência de fontes e apelo à conspiração.",
      howItWorks: "Extraem-se atributos de estilo (número de adjetivos, polaridade extrema, caixa alta) para alimentar modelos estatísticos.",
      covidExample: "Mensagens recomendando substâncias sem eficácia comprovada usavam termos apelativos e solicitavam compartilhamento massivo.",
      tryItOut: "Compare uma checagem da agência Fiocruz com uma corrente viral no laboratório.",
      interpretation: "Modelos de IA auxiliam na triagem de suspeitas, mas a verificação definitiva requer checadores e evidências científicas."
    }],
    quiz: {
      questions: [{
        id: 1,
        question: "Por que uma previsão de um modelo de aprendizado de máquina não deve ser apresentada como prova absoluta de veracidade de um fato?",
        options: [
          "Porque os modelos apenas identificam padrões estatísticos e correlações no texto, e não possuem compreensão de mundo ou evidências científicas factuais externas",
          "Porque todos os modelos de IA foram proibidos pela OMS",
          "Porque notícias falsas são sempre escritas em código binário",
          "Porque o português é impossível de ser analisado estatisticamente"
        ],
        correctIndex: 0,
        explanation: "Modelos capturam padrões textuais e de redação, mas a verdade científica requer validação empírica e revisão por pares, jamais sendo delegada cegamente a um escore estatístico."
      }]
    }
  },
  {
    id: 10,
    title: "Módulo 10 — Projeto Integrador e Síntese de Conhecimento",
    subtitle: "Pipeline Completo de Análise Textual da COVID-19",
    description: "Atividade prática integradora: da seleção do corpus até a interpretação de resultados e discussão de limitações éticas.",
    practicalExample: "Construção de um relatório analítico unindo pré-processamento, TF-IDF, NER e Sentimento em dados reais de 2020 a 2023.",
    learningObjectives: ["Executar um fluxo de ponta a ponta", "Relatar vieses e incertezas nos dados", "Apresentar conclusões baseadas em evidências"],
    lessons: [{
      id: 1,
      title: "10.1 Do Corpus à Tomada de Decisão",
      concept: "O projeto integrador consolida todas as etapas aprendidas em um produto analítico fundamentado.",
      howItWorks: "Seleção do dataset -> Limpeza -> Vetorização -> Extração de Padrões -> Validação Cruzada -> Relatório Crítico.",
      covidExample: "Avaliação diacrônica mostrando como o foco do discurso público migrou de leitos de UTI (2020) para variantes e vacinas de reforço (2022).",
      tryItOut: "Utilize o Laboratório de Texto para processar o conjunto de dados completo do Painel Histórico.",
      interpretation: "A mineração de texto é uma lente poderosa para compreender transformações sociotécnicas e sanitárias em escala histórica."
    }],
    quiz: {
      questions: [{
        id: 1,
        question: "Qual é o principal passo metodológico ao concluir uma análise de PLN antes de publicar recomendações para a sociedade?",
        options: [
          "Ignorar os erros do modelo caso a acurácia seja acima de 80%",
          "Documentar as fontes dos dados, período de coleta, possíveis vieses da amostra e limitações conhecidas das técnicas empregadas",
          "Substituir todos os dados reais por exemplos fictícios",
          "Deletar o código-fonte após a execução"
        ],
        correctIndex: 1,
        explanation: "A transparência metodológica, a documentação de limitações e a rastreabilidade dos datasets são pilares fundamentais da integridade acadêmica e científica."
      }]
    }
  }
];
