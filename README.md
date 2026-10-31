# mateusferrao.github.io

Portfólio de **Mateus Ferrão**, AI Builder. São 7 casos de IA aplicada a problemas de negócio, do problema à produção, cada um com demo interativa.

🔗 **https://mateusferrao.github.io** · [English](https://mateusferrao.github.io/en/)

## Como foi feito

- [Astro](https://astro.build) gerando um site estático, sem framework de UI. As demos são TypeScript puro.
- Português e inglês, com rotas `/` e `/en/`.
- Os textos e números de todos os casos ficam num só lugar, `src/data/casos.ts`. Cada número traz a origem: confirmado pela diretoria, medido, relatado por quem usa, em produção ou projeção.
- `scripts/checar-fatos.mjs` roda em todo build e bloqueia a publicação se o site tiver um número que não pode ser publicado, um dado de cliente ou algo com cara de segredo.
- Deploy automático no GitHub Pages pelo GitHub Actions.

**Todas as demos usam dados fictícios.** O código real dos casos fica em repositórios privados, por confidencialidade.

```bash
npm ci
npm run dev     # http://localhost:4321
npm run build   # build + checar-fatos
```
