// Falha o build se o site publicar algo que não pode ser publicado.
// Regras vêm do briefing: projeções não viram resultado, nada de dado real de cliente.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

const proibidos = [
  [/\b90\s?%/, 'redução de ~90% em multas é PROJEÇÃO'],
  [/economia l[ií]quida|net savings/i, '~R$100 mil/ano não é economia líquida'],
  [/agente de tr[áa]fego|traffic agent/i, 'agente de tráfego nunca rodou'],
  [/st[eé]ticos/i, 'nome da clínica não pode aparecer'],
  [/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/, 'formato de CNPJ real'],
  [/99481|1420\b/, 'telefone pessoal'],
  [/ghp_[A-Za-z0-9]{10,}|sk-[A-Za-z0-9]{16,}|AIza[0-9A-Za-z_-]{20,}/, 'parece um segredo'],
];

const arquivos = [];
(function andar(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) andar(p);
    else if (p.endsWith('.html')) arquivos.push(p);
  }
})(DIST);

const texto = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, (s) => (s.includes('application/json') ? s : ''))
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');

let erros = 0;
for (const f of arquivos) {
  const t = texto(readFileSync(f, 'utf8'));
  for (const [re, motivo] of proibidos) {
    const m = t.match(re);
    if (m) {
      console.error(`✗ ${f.replace(DIST, '')}: "${m[0]}" — ${motivo}`);
      erros++;
    }
  }
  // "500 mil" só pode aparecer na mesma frase que "projeção"
  for (const frase of t.split(/(?<=[.!?])\s+/)) {
    if (/500\s?mil|500k|500,000|500\.000/i.test(frase) && !/proje[çc][ãa]o|projected|projection/i.test(frase)) {
      console.error(`✗ ${f.replace(DIST, '')}: R$500 mil sem "projeção": "${frase.slice(0, 120)}"`);
      erros++;
    }
  }
}
if (erros) {
  console.error(`\n${erros} problema(s). Build bloqueado.`);
  process.exit(1);
}
console.log(`✓ checar-fatos: ${arquivos.length} páginas sem termos proibidos.`);
