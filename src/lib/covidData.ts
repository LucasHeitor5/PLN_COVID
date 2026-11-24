export interface CovidTextDocument {
  id: string;
  source: string;
  sourceUrl: string;
  period: string; // ano-mês
  year: number;
  category: 'Comunicação Oficial' | 'Vacinação' | 'Epidemiologia' | 'Variantes' | 'Desinformação e Checagem';
  title: string;
  text: string;
  license: string;
}

export const COVID_CORPUS: CovidTextDocument[] = [
  {
    id: "doc-01",
    source: "Organização Mundial da Saúde (OMS)",
    sourceUrl: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019",
    period: "2020-03",
    year: 2020,
    category: "Comunicação Oficial",
    title: "Declaração de Pandemia da COVID-19 pelo Diretor-Geral da OMS",
    text: "A OMS tem avaliado este surto 24 horas por dia e estamos profundamente preocupados com os níveis alarmantes de propagação e gravidade, bem como com os níveis alarmantes de inação. Por isso, avaliamos que a COVID-19 pode ser caracterizada como uma pandemia. Pandemia não é uma palavra para ser usada de forma leviana ou descuidada. É uma palavra que, se mal utilizada, pode causar medo irracional ou aceitação injustificada de que a luta acabou.",
    license: "Domínio Público / Licença Educacional WHO"
  },
  {
    id: "doc-02",
    source: "Ministério da Saúde do Brasil",
    sourceUrl: "https://www.gov.br/saude/pt-br",
    period: "2020-05",
    year: 2020,
    category: "Epidemiologia",
    title: "Orientações sobre Isolamento Social e Prevenção Comunitária",
    text: "O Ministério da Saúde reforça a importância das medidas não farmacológicas para conter a curva de contágio do novo coronavírus no Brasil. O distanciamento social, o uso sistemático de máscaras de proteção facial cobrindo nariz e boca, a frequente higienização das mãos com água e sabão ou álcool em gel 70% são fundamentais para evitar a sobrecarga dos leitos de UTI nos hospitais do SUS.",
    license: "Acesso Aberto / Governo Federal do Brasil"
  },
  {
    id: "doc-03",
    source: "Instituto Butantan & Governo do Estado de São Paulo",
    sourceUrl: "https://butantan.gov.br",
    period: "2021-01",
    year: 2021,
    category: "Vacinação",
    title: "Aprovação Emergencial da CoronaVac e Início da Imunização Nacional",
    text: "A Anvisa aprovou por unanimidade o uso emergencial da vacina CoronaVac, desenvolvida em parceria com o Instituto Butantan. A vacinação representa o marco decisivo para frear o avanço de casos graves e internações hospitalares. Estudos clínicos de fase 3 demonstraram eficácia global e 100% de proteção contra casos que necessitam de internação ou cuidados intensivos.",
    license: "Informativo Público Oficial"
  },
  {
    id: "doc-04",
    source: "Fiocruz (Fundação Oswaldo Cruz)",
    sourceUrl: "https://portal.fiocruz.br",
    period: "2021-04",
    year: 2021,
    category: "Vacinação",
    title: "Produção e Distribuição da Vacina AstraZeneca no Brasil",
    text: "A Fundação Oswaldo Cruz iniciou a entrega de milhões de doses da vacina Oxford-AstraZeneca (Vaxzevria) ao Programa Nacional de Imunizações (PNI). A produção do Ingrediente Farmacêutico Ativo (IFA) no Brasil fortalece a soberania sanitária e acelera a imunização de idosos e profissionais de saúde, garantindo proteção contra complicações da COVID-19.",
    license: "Fiocruz - Acesso Aberto Científico"
  },
  {
    id: "doc-05",
    source: "Agência Lupa / Fact-Checking Fiocruz",
    sourceUrl: "https://portal.fiocruz.br/noticia/fake-news-sobre-covid-19",
    period: "2021-08",
    year: 2021,
    category: "Desinformação e Checagem",
    title: "Checagem de Fatos: A Ineficácia de Tratamentos Sem Comprovação",
    text: "É falso que substâncias como hidroxicloroquina, cloroquina e ivermectina possuam eficácia profilática ou precoce contra a infecção pelo SARS-CoV-2. Estudos randomizados multicêntricos internacionais, revisados por pares e endossados pela OMS e Anvisa, demonstraram que esses medicamentos não reduzem hospitalizações nem mortalidade, podendo causar efeitos colaterais adversos.",
    license: "Creative Commons BY-NC 4.0"
  },
  {
    id: "doc-06",
    source: "Boletim Epidemiológico Fiocruz",
    sourceUrl: "https://portal.fiocruz.br/boletim-observatorio-covid-19",
    period: "2022-01",
    year: 2022,
    category: "Variantes",
    title: "Disseminação da Variante Ômicron e a Importância da Dose de Reforço",
    text: "O Observatório COVID-19 da Fiocruz identificou a rápida substituição genômica pela variante Ômicron (B.1.1.529). Embora apresente maior transmissibilidade devido a mutações na proteína Spike, a taxa de letalidade entre indivíduos que completaram o esquema vacinal primário e receberam a dose de reforço mantém-se significativamente reduzida.",
    license: "Boletim de Vigilância Epidemiológica Fiocruz"
  },
  {
    id: "doc-07",
    source: "Organização Mundial da Saúde (OMS)",
    sourceUrl: "https://www.who.int/news/item/05-05-2023-statement-on-the-fifteenth-meeting-of-the-international-health-regulations-(2005)-emergency-committee-regarding-the-coronavirus-disease-(covid-19)-pandemic",
    period: "2023-05",
    year: 2023,
    category: "Comunicação Oficial",
    title: "Fim da Emergência de Saúde Pública de Importância Internacional",
    text: "A OMS declarou o encerramento da Emergência de Saúde Pública de Importância Internacional (ESPII) para a COVID-19. O Diretor-Geral destacou que a redução de óbitos e internações graças à vacinação global permitiu a transição para a gestão de longo prazo da doença, mantendo o alerta de que o vírus continuará a sofrer mutações.",
    license: "Domínio Público / Licença Educacional WHO"
  }
];
