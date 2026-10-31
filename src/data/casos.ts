import type { T } from './i18n';

/**
 * FONTE ÚNICA DOS CASOS E NÚMEROS.
 * Cada número tem `selo` dizendo de onde vem. Não publique número sem fonte.
 * Fontes: CV oficial + briefing ("fatos confirmados") + respostas do Mateus em 31/10/2026.
 */

export type Selo = 'confirmado' | 'medido' | 'relatado' | 'projecao' | 'producao';

export const selos: Record<Selo, T> = {
  confirmado: { pt: 'Confirmado pela diretoria', en: 'Confirmed by leadership' },
  medido: { pt: 'Medido por link/UTM', en: 'Measured via link/UTM' },
  relatado: { pt: 'Relatado por quem usa', en: 'Reported by users' },
  projecao: { pt: 'Projeção, não resultado', en: 'Projection, not a result' },
  producao: { pt: 'Em produção', en: 'In production' },
};

export type No = { t: T; sub?: T; tipo?: 'fonte' | 'ia' | 'acao' | 'pessoa' };
export type Trilha = { titulo?: T; nos: No[] };

export type Caso = {
  slug: string;
  slugEn: string;
  nivel: 'destaque' | 'outro';
  org: T;
  titulo: T;
  resumo: T;
  numero: { valor: T; rotulo: T; selo: Selo };
  prazo?: T;
  problema: T;
  construi: T[];
  resultado: T[];
  ferramentas: string[];
  demo: 'docs' | 'erp' | 'paciente' | 'adocao' | 'recuperacao' | 'alerta' | 'blackfriday';
  arquitetura: Trilha[];
};

export const casos: Caso[] = [
  {
    slug: 'agente-documentos-fiscais',
    slugEn: 'tax-document-agent',
    nivel: 'destaque',
    org: { pt: 'Hy Brazil Energia', en: 'Hy Brazil Energia' },
    titulo: {
      pt: 'Agente multimodal que analisa documentos fiscais',
      en: 'A multimodal agent that reviews tax documents',
    },
    resumo: {
      pt: 'A análise quinzenal da contabilidade caiu de ~15h para ~1h. O diretor usa toda semana.',
      en: 'The fortnightly accounting review dropped from ~15h to ~1h. The director uses it every week.',
    },
    numero: { valor: { pt: '15h → 1h', en: '15h → 1h' }, rotulo: { pt: 'por análise quinzenal', en: 'per fortnightly review' }, selo: 'confirmado' },
    problema: {
      pt: 'A cada quinzena, a diretoria precisava revisar os documentos fiscais vindos da contabilidade. Era trabalho manual, de leitura documento a documento, e consumia cerca de 15 horas.',
      en: 'Every two weeks, leadership had to review the tax documents coming from accounting. It was manual, document-by-document reading, and took about 15 hours.',
    },
    construi: [
      {
        pt: 'Um agente multimodal com Gemini, que lê os documentos fiscais e entrega a análise para a diretoria.',
        en: 'A multimodal agent on Gemini that reads the tax documents and delivers the review to leadership.',
      },
      {
        pt: 'Construído com o Claude.',
        en: 'Built with Claude.',
      },
    ],
    resultado: [
      { pt: 'A análise quinzenal caiu de ~15h para ~1h. O número foi confirmado pelo diretor.', en: 'The fortnightly review went from ~15h to ~1h, a figure confirmed by the director.' },
      { pt: 'O diretor usa o agente semanalmente.', en: 'The director uses the agent weekly.' },
    ],
    ferramentas: ['Gemini (multimodal)', 'Claude'],
    demo: 'docs',
    arquitetura: [
      {
        nos: [
          { t: { pt: 'Documentos fiscais', en: 'Tax documents' }, sub: { pt: 'PDF e imagem', en: 'PDF and image' }, tipo: 'fonte' },
          { t: { pt: 'Agente multimodal', en: 'Multimodal agent' }, sub: { pt: 'Gemini', en: 'Gemini' }, tipo: 'ia' },
          { t: { pt: 'Análise pronta', en: 'Ready review' }, sub: { pt: 'feita pelo agente', en: 'done by the agent' }, tipo: 'acao' },
          { t: { pt: 'Diretoria', en: 'Leadership' }, sub: { pt: 'uso semanal', en: 'weekly use' }, tipo: 'pessoa' },
        ],
      },
    ],
  },
  {
    slug: 'agente-teams-mcp-erp',
    slugEn: 'teams-agent-mcp-erp',
    nivel: 'destaque',
    org: { pt: 'Hy Brazil Energia', en: 'Hy Brazil Energia' },
    titulo: {
      pt: 'Agente no Teams que conversa com o ERP legado via MCP',
      en: 'A Teams agent that talks to the legacy ERP through MCP',
    },
    resumo: {
      pt: 'Consultas e operações do ERP (UAU) direto no chat, para a empresa toda, por servidores MCP que eu criei. ~30 pessoas usam por semana.',
      en: 'ERP (UAU) queries and operations straight from chat, for the whole company, through MCP servers I built. ~30 people use it weekly.',
    },
    numero: { valor: { pt: '~30', en: '~30' }, rotulo: { pt: 'pessoas usam por semana', en: 'people use it weekly' }, selo: 'producao' },
    problema: {
      pt: 'O ERP da empresa é um sistema legado. Para consultar uma informação ou fazer uma operação, a pessoa precisava conhecer as telas do ERP ou pedir a quem conhece.',
      en: "The company's ERP is a legacy system. To look something up or run an operation, people had to know the ERP screens or ask someone who did.",
    },
    construi: [
      {
        pt: 'Servidores MCP próprios que expõem consultas e operações do ERP como ferramentas que a IA pode chamar.',
        en: 'In-house MCP servers that expose ERP queries and operations as tools the AI can call.',
      },
      {
        pt: 'Um agente de IA dentro do Microsoft Teams, onde as pessoas já trabalham, que usa essas ferramentas para responder e executar no chat.',
        en: 'An AI agent inside Microsoft Teams, where people already work, that uses those tools to answer and act in chat.',
      },
      {
        pt: 'Os mesmos servidores MCP também conectam a IA aos dados em tempo real das usinas solares, com um dashboard de geração.',
        en: 'The same MCP servers also connect the AI to real-time solar plant data, with a generation dashboard.',
      },
    ],
    resultado: [
      { pt: 'Usado pela empresa toda; ~30 pessoas por semana.', en: 'Used company-wide; ~30 people per week.' },
      { pt: 'Quem não conhece o ERP consulta e opera em linguagem natural.', en: "People who don't know the ERP can query and operate it in plain language." },
    ],
    ferramentas: ['MCP (servidores próprios)', 'Microsoft Teams', 'ERP UAU'],
    demo: 'erp',
    arquitetura: [
      {
        nos: [
          { t: { pt: 'Pessoa no Teams', en: 'Person on Teams' }, sub: { pt: 'pergunta em português', en: 'asks in plain language' }, tipo: 'pessoa' },
          { t: { pt: 'Agente de IA', en: 'AI agent' }, sub: { pt: 'escolhe a ferramenta', en: 'picks the tool' }, tipo: 'ia' },
          { t: { pt: 'Servidores MCP', en: 'MCP servers' }, sub: { pt: 'feitos por mim', en: 'built by me' }, tipo: 'acao' },
          { t: { pt: 'ERP legado (UAU)', en: 'Legacy ERP (UAU)' }, sub: { pt: 'consultas e operações', en: 'queries and operations' }, tipo: 'fonte' },
        ],
      },
    ],
  },
  {
    slug: 'custo-por-paciente',
    slugEn: 'cost-per-patient',
    nivel: 'destaque',
    org: { pt: 'Trackify · clínica (anônima)', en: 'Trackify · clinic (anonymous)' },
    titulo: {
      pt: 'Custo por paciente, não por agendamento',
      en: 'Cost per patient, not per booking',
    },
    resumo: {
      pt: 'Cruzei o CRM com o Meta Ads e ranqueei os anúncios pelo que importa: quem virou paciente. A análise achou ~R$15 mil/mês de verba mal alocada, e a clínica realocou.',
      en: 'I joined the CRM with Meta Ads and ranked ads by what matters: who became a patient. The analysis found ~R$15k/month of misallocated spend, and the clinic reallocated it.',
    },
    numero: { valor: { pt: '~R$15 mil/mês', en: '~R$15k/month' }, rotulo: { pt: 'de verba mal alocada, realocada', en: 'of misallocated spend, reallocated' }, selo: 'producao' },
    problema: {
      pt: 'A clínica avaliava os anúncios por custo por agendamento. Só que agendamento não é paciente: um criativo pode trazer muito agendamento barato e quase nenhum paciente.',
      en: "The clinic judged ads by cost per booking. But a booking isn't a patient: an ad can bring lots of cheap bookings and almost no patients.",
    },
    construi: [
      {
        pt: 'Um workflow no n8n que rastreia cada negócio marcado como paciente no CRM (Kinbox) até o criativo de origem.',
        en: 'An n8n workflow that traces every deal tagged as a patient in the CRM (Kinbox) back to its source ad.',
      },
      {
        pt: 'O cruzamento com o gasto de cada criativo no Meta Ads, em 2 contas de anúncio, e um ranking por custo por paciente.',
        en: 'A join with each ad’s spend in Meta Ads, across 2 ad accounts, and a ranking by cost per patient.',
      },
    ],
    resultado: [
      { pt: 'A análise identificou ~R$15 mil/mês de verba mal alocada.', en: 'The analysis identified ~R$15k/month of misallocated spend.' },
      { pt: 'A clínica realocou essa verba.', en: 'The clinic reallocated that budget.' },
    ],
    ferramentas: ['n8n', 'Kinbox (CRM)', 'Meta Ads API'],
    demo: 'paciente',
    arquitetura: [
      {
        nos: [
          { t: { pt: 'CRM', en: 'CRM' }, sub: { pt: 'negócios com a tag Paciente', en: 'deals tagged Patient' }, tipo: 'fonte' },
          { t: { pt: 'n8n', en: 'n8n' }, sub: { pt: 'rastreia o criativo de origem', en: 'traces the source ad' }, tipo: 'acao' },
          { t: { pt: 'Meta Ads', en: 'Meta Ads' }, sub: { pt: 'gasto por criativo, 2 contas', en: 'spend per ad, 2 accounts' }, tipo: 'fonte' },
          { t: { pt: 'Ranking', en: 'Ranking' }, sub: { pt: 'custo por paciente', en: 'cost per patient' }, tipo: 'pessoa' },
        ],
      },
    ],
  },
  {
    slug: 'programa-adocao-ia',
    slugEn: 'ai-adoption-program',
    nivel: 'outro',
    org: { pt: 'Hy Brazil Energia', en: 'Hy Brazil Energia' },
    titulo: {
      pt: 'Programa de adoção de IA em 11 setores',
      en: 'An AI adoption program across 11 departments',
    },
    resumo: {
      pt: '~60 pessoas treinadas, 25 licenças de Claude e 10 skills internas para que times não técnicos usem IA com segurança, sem expor dados.',
      en: '~60 people trained, 25 Claude licenses and 10 internal skills so non-technical teams can use AI safely, without exposing data.',
    },
    numero: { valor: { pt: '11 setores', en: '11 departments' }, rotulo: { pt: '~60 pessoas treinadas', en: '~60 people trained' }, selo: 'producao' },
    problema: {
      pt: 'Sendo o único especialista de IA da empresa, eu não escalo construindo tudo sozinho. As áreas precisavam usar IA no dia a dia, sem depender de mim e sem colocar dados da empresa em risco.',
      en: "As the company's only AI specialist, I can't scale by building everything myself. Departments needed to use AI day to day, without depending on me and without putting company data at risk.",
    },
    construi: [
      { pt: 'Treinamento para ~60 pessoas em 11 setores.', en: 'Training for ~60 people across 11 departments.' },
      { pt: '25 licenças de Claude implantadas, com meta de 35 até o fim do ano.', en: '25 Claude licenses rolled out, with a target of 35 by year-end.' },
      { pt: '10 skills internas, prontas para times não técnicos usarem IA com segurança, sem expor dados.', en: '10 internal skills that let non-technical teams use AI safely, without exposing data.' },
    ],
    resultado: [
      { pt: 'IA no trabalho de 11 setores.', en: 'AI in the daily work of 11 departments.' },
      { pt: 'Uma das skills poupa ~4h/dia de trabalho manual, segundo a pessoa que a usa.', en: 'One of the skills saves ~4h/day of manual work, according to the person who uses it.' },
    ],
    ferramentas: ['Claude', 'Skills'],
    demo: 'adocao',
    arquitetura: [
      {
        nos: [
          { t: { pt: 'Treinamento', en: 'Training' }, sub: { pt: '~60 pessoas, 11 setores', en: '~60 people, 11 departments' }, tipo: 'pessoa' },
          { t: { pt: 'Licenças de Claude', en: 'Claude licenses' }, sub: { pt: '25 de 35', en: '25 of 35' }, tipo: 'acao' },
          { t: { pt: '10 skills seguras', en: '10 safe skills' }, sub: { pt: 'sem expor dados', en: 'no data exposure' }, tipo: 'ia' },
          { t: { pt: 'Uso no dia a dia', en: 'Everyday use' }, sub: { pt: 'ex.: ~4h/dia poupadas', en: 'e.g. ~4h/day saved' }, tipo: 'fonte' },
        ],
      },
    ],
  },
  {
    slug: 'recuperacao-vendas-whatsapp',
    slugEn: 'whatsapp-sales-recovery',
    nivel: 'outro',
    org: { pt: 'Trackify · Filgueiras Academy', en: 'Trackify · Filgueiras Academy' },
    titulo: {
      pt: 'Recuperação de vendas automática via WhatsApp',
      en: 'Automated sales recovery over WhatsApp',
    },
    resumo: {
      pt: 'Quem abandonava o checkout recebia templates oficiais em 1h, 24h e 48h. Só essa automação trouxe ~R$20 mil num lançamento de ~R$100 mil.',
      en: 'People who abandoned checkout got official templates at 1h, 24h and 48h. That automation alone brought ~R$20k in a ~R$100k launch.',
    },
    numero: { valor: { pt: '~R$20 mil', en: '~R$20k' }, rotulo: { pt: 'recuperados em vendas', en: 'in recovered sales' }, selo: 'medido' },
    problema: {
      pt: 'Assumi o lançamento da Filgueiras Academy no meio do caminho. Quem chegava ao checkout e não comprava não recebia nenhum contato automático.',
      en: 'I took over the Filgueiras Academy launch midway. People who reached checkout and did not buy got no automatic follow-up.',
    },
    construi: [
      {
        pt: 'Um workflow no n8n: o webhook da Ticto põe cada abandono numa fila e a compra aprovada tira a pessoa da fila.',
        en: 'An n8n workflow: the Ticto webhook queues every abandoned checkout, and an approved purchase removes the person from the queue.',
      },
      {
        pt: 'A cada 10 minutos, o fluxo envia os templates oficiais de 1h, 24h e 48h pela WhatsApp Cloud API.',
        en: 'Every 10 minutes, the flow sends the official 1h, 24h and 48h templates through the WhatsApp Cloud API.',
      },
      {
        pt: 'No mesmo lançamento, também construí a oferta, as páginas de venda, a liberação de acesso e o rastreamento da jornada do lead.',
        en: 'In the same launch I also built the offer, the sales pages, access provisioning and lead-journey tracking.',
      },
    ],
    resultado: [
      { pt: '~R$20 mil em vendas vindas dos links dos templates (medido por link/UTM).', en: '~R$20k in sales from the template links (measured via link/UTM).' },
      { pt: 'O lançamento completo faturou ~R$100 mil (bruto) em 30 dias.', en: 'The full launch grossed ~R$100k in 30 days.' },
    ],
    ferramentas: ['n8n', 'WhatsApp Cloud API', 'Ticto (webhooks)'],
    demo: 'recuperacao',
    arquitetura: [
      {
        titulo: { pt: 'Entrada', en: 'In' },
        nos: [
          { t: { pt: 'Ticto', en: 'Ticto' }, sub: { pt: 'checkout abandonado', en: 'abandoned checkout' }, tipo: 'fonte' },
          { t: { pt: 'Fila no n8n', en: 'n8n queue' }, sub: { pt: 'um lead por vez', en: 'one lead at a time' }, tipo: 'acao' },
          { t: { pt: 'A cada 10 min', en: 'Every 10 min' }, sub: { pt: 'templates 1h · 24h · 48h', en: '1h · 24h · 48h templates' }, tipo: 'ia' },
          { t: { pt: 'WhatsApp', en: 'WhatsApp' }, sub: { pt: 'Cloud API oficial', en: 'official Cloud API' }, tipo: 'pessoa' },
        ],
      },
      {
        titulo: { pt: 'Saída', en: 'Out' },
        nos: [
          { t: { pt: 'Ticto', en: 'Ticto' }, sub: { pt: 'compra aprovada', en: 'approved purchase' }, tipo: 'fonte' },
          { t: { pt: 'Sai da fila', en: 'Leaves the queue' }, sub: { pt: 'para de receber mensagens', en: 'stops getting messages' }, tipo: 'acao' },
        ],
      },
    ],
  },
  {
    slug: 'alerta-vencimento-tributos',
    slugEn: 'tax-due-date-alerts',
    nivel: 'outro',
    org: { pt: 'Hy Brazil Energia', en: 'Hy Brazil Energia' },
    titulo: {
      pt: 'Alerta proativo de vencimento de guias de tributos',
      en: 'Proactive alerts for tax payment due dates',
    },
    resumo: {
      pt: 'Guias federais, estaduais e municipais de centenas de CNPJs, com aviso antes de vencer. Da reunião de requisitos à produção em 5 dias.',
      en: 'Federal, state and municipal tax slips for hundreds of company IDs (CNPJs), flagged before they are due. From the requirements meeting to production in 5 days.',
    },
    numero: { valor: { pt: '5 dias', en: '5 days' }, rotulo: { pt: 'da reunião à produção', en: 'from meeting to production' }, selo: 'producao' },
    prazo: { pt: '5 dias, da reunião de requisitos à produção', en: '5 days, from the requirements meeting to production' },
    problema: {
      pt: 'São centenas de CNPJs com guias de tributos federais, estaduais e municipais. Uma guia esquecida vira multa e juros, e acompanhar tudo à mão não escala.',
      en: 'There are hundreds of company IDs with federal, state and municipal tax slips. A forgotten slip turns into fines and interest, and tracking it all by hand does not scale.',
    },
    construi: [
      {
        pt: 'Um alerta proativo que acompanha os vencimentos das guias de todos os CNPJs e avisa antes que vençam.',
        en: 'A proactive alert that tracks the due dates of every slip across all company IDs and warns before they are due.',
      },
      {
        pt: 'Saiu em 5 dias, da reunião de requisitos à produção.',
        en: 'It shipped in 5 days, from the requirements meeting to production.',
      },
    ],
    resultado: [
      { pt: 'Em produção, usado pelos times fiscal e financeiro para evitar multas e juros.', en: 'In production, used by the tax and finance teams to avoid fines and interest.' },
    ],
    ferramentas: [],
    demo: 'alerta',
    arquitetura: [
      {
        nos: [
          { t: { pt: 'Guias de tributos', en: 'Tax slips' }, sub: { pt: 'federais, estaduais, municipais', en: 'federal, state, municipal' }, tipo: 'fonte' },
          { t: { pt: 'Centenas de CNPJs', en: 'Hundreds of CNPJs' }, sub: { pt: 'acompanhamento contínuo', en: 'continuous tracking' }, tipo: 'acao' },
          { t: { pt: 'Alerta proativo', en: 'Proactive alert' }, sub: { pt: 'antes de vencer', en: 'before the due date' }, tipo: 'ia' },
          { t: { pt: 'Fiscal e financeiro', en: 'Tax and finance' }, sub: { pt: 'pagam em dia', en: 'pay on time' }, tipo: 'pessoa' },
        ],
      },
    ],
  },
  {
    slug: 'black-friday-amar-saber',
    slugEn: 'amar-saber-black-friday',
    nivel: 'outro',
    org: { pt: 'Trackify · Amar Saber', en: 'Trackify · Amar Saber' },
    titulo: {
      pt: 'Toda a automação de uma Black Friday em 4 dias, com Claude + n8n via MCP',
      en: "A Black Friday's entire automation in 4 days, with Claude + n8n over MCP",
    },
    resumo: {
      pt: 'Captura de leads com API de Conversões, recuperação via WhatsApp, grupos VIP e liberação e remoção de acessos. O Claude, conectado ao n8n via MCP, construiu os fluxos comigo.',
      en: 'Lead capture with the Conversions API, WhatsApp recovery, VIP groups and automatic access grant and removal. Claude, connected to n8n over MCP, built the flows with me.',
    },
    numero: { valor: { pt: '4 dias', en: '4 days' }, rotulo: { pt: 'para montar toda a automação', en: 'to build the whole automation' }, selo: 'producao' },
    prazo: { pt: '4 dias', en: '4 days' },
    problema: {
      pt: 'A Amar Saber (educação veterinária) ia fazer sua Black Friday e precisava de toda a operação de captura, rastreamento, recuperação e acesso funcionando, num prazo curto.',
      en: 'Amar Saber (veterinary education) was about to run its Black Friday and needed the whole capture, tracking, recovery and access operation working on a tight deadline.',
    },
    construi: [
      {
        pt: 'Captura de leads com envio para a API de Conversões da Meta em 2 pixels, deduplicada com o evento do navegador.',
        en: 'Lead capture that sends to the Meta Conversions API on 2 pixels, deduplicated against the browser event.',
      },
      {
        pt: 'Recuperação via WhatsApp: eventos do checkout e do CRM entram numa fila por telefone e disparam a cadência pelo Kommo.',
        en: 'WhatsApp recovery: checkout and CRM events enter a per-phone queue and trigger the cadence through Kommo.',
      },
      {
        pt: 'Gestão dos grupos VIP (SendFlow) com relatório diário de entradas, saídas e de quem se cadastrou e não entrou.',
        en: 'VIP group management (SendFlow) with a daily report of joins, leaves and sign-ups who never joined.',
      },
      {
        pt: 'Compra paga libera o acesso à comunidade no WhatsApp por 3 meses e remove a pessoa no vencimento.',
        en: 'A paid purchase grants access to the WhatsApp community for 3 months and removes the person when it expires.',
      },
      {
        pt: 'Tudo construído com o Claude conectado ao n8n via MCP.',
        en: 'All built with Claude connected to n8n over MCP.',
      },
    ],
    resultado: [
      { pt: 'Toda a automação montada em 4 dias.', en: 'The entire automation built in 4 days.' },
      { pt: 'Projeção de faturamento mínimo de R$500 mil. A campanha ainda está em andamento, e o resultado real entra aqui quando sair.', en: 'Projected minimum revenue of R$500k. The campaign is still running, and the real result will be posted here once available.' },
    ],
    ferramentas: ['Claude', 'n8n (via MCP)', 'Meta API de Conversões', 'Kommo', 'WhatsApp', 'SendFlow', 'Google Sheets'],
    demo: 'blackfriday',
    arquitetura: [
      {
        titulo: { pt: 'Captura', en: 'Capture' },
        nos: [
          { t: { pt: 'Formulário', en: 'Form' }, sub: { pt: 'página da campanha', en: 'campaign page' }, tipo: 'fonte' },
          { t: { pt: 'n8n', en: 'n8n' }, sub: { pt: 'grava o lead', en: 'stores the lead' }, tipo: 'acao' },
          { t: { pt: 'Meta CAPI', en: 'Meta CAPI' }, sub: { pt: '2 pixels, deduplicado', en: '2 pixels, deduplicated' }, tipo: 'ia' },
        ],
      },
      {
        titulo: { pt: 'Recuperação', en: 'Recovery' },
        nos: [
          { t: { pt: 'Checkout + CRM', en: 'Checkout + CRM' }, sub: { pt: 'eventos', en: 'events' }, tipo: 'fonte' },
          { t: { pt: 'Fila por telefone', en: 'Per-phone queue' }, sub: { pt: 'n8n', en: 'n8n' }, tipo: 'acao' },
          { t: { pt: 'Kommo → WhatsApp', en: 'Kommo → WhatsApp' }, sub: { pt: 'cadência', en: 'cadence' }, tipo: 'pessoa' },
        ],
      },
      {
        titulo: { pt: 'Acesso', en: 'Access' },
        nos: [
          { t: { pt: 'Compra paga', en: 'Paid purchase' }, sub: { pt: 'checkout', en: 'checkout' }, tipo: 'fonte' },
          { t: { pt: 'Comunidade', en: 'Community' }, sub: { pt: 'SendFlow, 3 meses', en: 'SendFlow, 3 months' }, tipo: 'acao' },
          { t: { pt: 'Remoção', en: 'Removal' }, sub: { pt: 'no vencimento', en: 'on expiry' }, tipo: 'pessoa' },
        ],
      },
    ],
  },
];

export const destaques = casos.filter((c) => c.nivel === 'destaque');
export const outros = casos.filter((c) => c.nivel === 'outro');

export const numerosHome: { valor: T; rotulo: T; selo: Selo }[] = [
  { valor: { pt: '15h → 1h', en: '15h → 1h' }, rotulo: { pt: 'análise fiscal quinzenal', en: 'fortnightly tax review' }, selo: 'confirmado' },
  { valor: { pt: '~30/semana', en: '~30/week' }, rotulo: { pt: 'pessoas usando o agente do ERP', en: 'people using the ERP agent' }, selo: 'producao' },
  { valor: { pt: '~R$20 mil', en: '~R$20k' }, rotulo: { pt: 'recuperados via WhatsApp', en: 'recovered over WhatsApp' }, selo: 'medido' },
  { valor: { pt: '~R$15 mil/mês', en: '~R$15k/mo' }, rotulo: { pt: 'de verba de anúncio realocada', en: 'of ad spend reallocated' }, selo: 'producao' },
  { valor: { pt: '~60', en: '~60' }, rotulo: { pt: 'pessoas treinadas em 11 setores', en: 'people trained in 11 departments' }, selo: 'producao' },
  { valor: { pt: '5 dias', en: '5 days' }, rotulo: { pt: 'da reunião à produção', en: 'from meeting to production' }, selo: 'producao' },
];

export const maisEmProducao: { titulo: T; texto: T; org: T }[] = [
  {
    org: { pt: 'Hy', en: 'Hy' },
    titulo: { pt: 'Sistema fiscal SEFAZ × ERP', en: 'SEFAZ × ERP tax system' },
    texto: { pt: 'Cruza a SEFAZ com o ERP e aponta falhas de lançamento e notas não pagas.', en: 'Cross-checks the state tax authority (SEFAZ) against the ERP and flags booking errors and unpaid invoices.' },
  },
  {
    org: { pt: 'Hy', en: 'Hy' },
    titulo: { pt: 'Gestão de prazos ambientais', en: 'Environmental deadline tracking' },
    texto: { pt: 'Acompanha os prazos ambientais da empresa no lugar de um software pago.', en: "Tracks the company's environmental deadlines, replacing a paid tool." },
  },
  {
    org: { pt: 'Hy', en: 'Hy' },
    titulo: { pt: 'Assinatura de documentos via WhatsApp', en: 'Document signing over WhatsApp' },
    texto: { pt: 'Documentos internos assinados pelo WhatsApp.', en: 'Internal documents signed over WhatsApp.' },
  },
  {
    org: { pt: 'Hy', en: 'Hy' },
    titulo: { pt: 'Conferência de ponto automatizada', en: 'Automated timesheet checks' },
    texto: { pt: 'A conferência do ponto, que era manual, agora é automática.', en: 'Timesheet checks that used to be manual now run automatically.' },
  },
  {
    org: { pt: 'Hy', en: 'Hy' },
    titulo: { pt: 'Usinas solares em tempo real', en: 'Solar plants in real time' },
    texto: { pt: 'Servidor MCP e dashboard com os dados de geração das usinas.', en: 'MCP server and dashboard with live plant generation data.' },
  },
  {
    org: { pt: 'Trackify', en: 'Trackify' },
    titulo: { pt: '10 agentes de atendimento e vendas', en: '10 support and sales agents' },
    texto: { pt: 'Construídos em código, com Gemini Flash-Lite e DeepSeek e modelo configurável. Ativos para 3 clientes.', en: 'Built in code on Gemini Flash-Lite and DeepSeek, with a configurable model. Live for 3 clients.' },
  },
];

export const licencasNota: T = {
  pt: 'Parte das ferramentas internas substituiu softwares pagos (ambiental, jurídico, dois sistemas de notas fiscais, renderização 3D para aprovação de projetos, entre outros) cujas licenças somavam ~R$100 mil/ano.',
  en: 'Some of these internal tools replaced paid software (environmental, legal, two invoicing systems, 3D rendering for project approval, among others) whose licenses added up to ~R$100k/year.',
};
