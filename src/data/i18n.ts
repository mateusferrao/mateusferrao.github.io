export type Lang = 'pt' | 'en';
export type T = { pt: string; en: string };

export const tr = (v: T | string, lang: Lang): string => (typeof v === 'string' ? v : v[lang]);

export const rotas = {
  home: { pt: '/', en: '/en/' },
  caso: (slug: string, lang: Lang) => (lang === 'pt' ? `/casos/${slug}/` : `/en/cases/${slug}/`),
};

export const contato = {
  email: 'mateusferraocosta2000@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mateusferrao',
  github: 'https://github.com/mateusferrao',
};

export const ui = {
  navCasos: { pt: 'Casos', en: 'Cases' },
  navComo: { pt: 'Como construo', en: 'How I build' },
  navTrajetoria: { pt: 'Trajetória', en: 'Background' },
  navContato: { pt: 'Contato', en: 'Contact' },
  outraLingua: { pt: 'EN', en: 'PT' },
  outraLinguaLabel: { pt: 'Read in English', en: 'Ler em português' },
  heroKicker: { pt: 'AI Builder · Nova Lima, MG', en: 'AI Builder · Nova Lima, Brazil' },
  heroTitulo: {
    pt: 'Resolvo problemas de negócio com IA, do problema à produção.',
    en: 'I solve business problems with AI, from the problem to production.',
  },
  heroSub: {
    pt: 'Único especialista de IA da Hy Brazil Energia e cofundador da Trackify. Construo agentes, servidores MCP, ferramentas internas e automações que rodam em produção, muitas vezes em poucos dias.',
    en: 'The only AI specialist at Hy Brazil Energia and co-founder of Trackify. I build agents, MCP servers, internal tools and automations that run in production, often within a few days.',
  },
  verCasos: { pt: 'Ver os 7 casos', en: 'See the 7 cases' },
  consoleLegenda: {
    pt: 'Replay ilustrativo com dados fictícios do agente de documentos fiscais.',
    en: 'Illustrative replay of the tax-document agent, using fictitious data.',
  },
  replay: { pt: 'Rodar de novo', en: 'Replay' },
  numerosTitulo: { pt: 'Em produção, com número', en: 'In production, with numbers' },
  destaquesTitulo: { pt: 'Casos em destaque', en: 'Featured cases' },
  destaquesSub: {
    pt: 'Problema → o que construí → resultado. Demos com dados fictícios: nada de cliente ou da Hy aparece aqui.',
    en: 'Problem → what I built → result. Demos use fictitious data: nothing from clients or Hy appears here.',
  },
  outrosTitulo: { pt: 'Outros casos', en: 'More cases' },
  maisTitulo: { pt: 'Mais coisas que construí e estão em produção', en: 'More things I built that are in production' },
  comoTitulo: { pt: 'Como eu construo', en: 'How I build' },
  trajetoriaTitulo: { pt: 'Trajetória', en: 'Background' },
  contatoTitulo: { pt: 'Vamos conversar', en: "Let's talk" },
  contatoSub: {
    pt: 'A maior parte do que construo é para empresas e clientes, em repositórios privados por confidencialidade. Os casos acima mostram o que dá para mostrar.',
    en: 'Most of what I build is for companies and clients, in private repositories for confidentiality. The cases above show what can be shown.',
  },
  lerCaso: { pt: 'Ler o caso', en: 'Read the case' },
  problema: { pt: 'Problema', en: 'Problem' },
  construi: { pt: 'O que construí', en: 'What I built' },
  ferramentas: { pt: 'Ferramentas', en: 'Tools' },
  prazo: { pt: 'Prazo', en: 'Timeline' },
  resultado: { pt: 'Resultado', en: 'Result' },
  demo: { pt: 'Demo', en: 'Demo' },
  demoAviso: { pt: 'Dados fictícios', en: 'Fictitious data' },
  arquitetura: { pt: 'Como funciona', en: 'How it works' },
  voltar: { pt: '← Todos os casos', en: '← All cases' },
  anterior: { pt: 'Anterior', en: 'Previous' },
  proximo: { pt: 'Próximo', en: 'Next' },
  rodape: {
    pt: 'Feito com Astro e Claude. Código aberto no GitHub. Todos os dados das demos são fictícios.',
    en: 'Built with Astro and Claude. Open source on GitHub. All demo data is fictitious.',
  },
};
