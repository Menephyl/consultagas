# Consulta Gás do Povo / Auxílio Gás

Projeto web informativo, responsivo e acessível para orientar cidadãos sobre elegibilidade e consulta oficial do benefício do gás.

## Rodar localmente

Como é um site estático, basta abrir `index.html` no navegador.

Opcionalmente, use servidor local:

```bash
python -m http.server 4173
```

Depois acesse `http://localhost:4173`.

## Publicar na Vercel

1. Suba este projeto para um repositório no GitHub.
2. No painel da Vercel, clique em **Add New → Project**.
3. Importe o repositório e mantenha as opções padrão (projeto estático).
4. Clique em **Deploy**.

Este repositório já inclui `vercel.json` com configuração para servir o `index.html` em qualquer rota e aplicar headers básicos de segurança.

## Publicar no GitHub Pages

### Opção recomendada (automática com GitHub Actions)

1. Envie o código para a branch `main` (ou `master`).
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **GitHub Actions**.
4. O workflow `.github/workflows/deploy-gh-pages.yml` fará o deploy automático a cada push.

### Opção manual (sem Actions)

1. No GitHub, abra **Settings → Pages**.
2. Em **Source**, escolha **Deploy from a branch**.
3. Selecione a branch `main` e pasta `/ (root)`.
4. Salve e aguarde a publicação.

O arquivo `.nojekyll` já está incluído para evitar processamento Jekyll no GitHub Pages.

## Estrutura

- `index.html`: estrutura completa das seções e conteúdo.
- `styles.css`: design system, layout responsivo, animações e acessibilidade visual.
- `script.js`: interatividade (abas/canais, simulador orientativo, copiar Pix, menu mobile, reveal).
- `favicon.svg`: ícone do site.
- `vercel.json`: configuração de deploy para Vercel.
- `.github/workflows/deploy-gh-pages.yml`: deploy automático no GitHub Pages.
- `.nojekyll`: desativa processamento Jekyll no GitHub Pages.
