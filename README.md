# Teste Técnico QA – Blog do Agi (Playwright)

![Playwright Tests](https://github.com/Marcelo-Meireles/marcelomeireles-teste-tecnico-qa-blog-agi/actions/workflows/playwright.yml/badge.svg)

Automação end-to-end do **Blog do Agi** utilizando Playwright + TypeScript, aplicando Page Object Model (POM), boas práticas de estrutura e execução em múltiplos browsers (Chromium, Firefox, WebKit).

Repositório criado para o teste técnico de QA, cobrindo quatro cenários funcionais: **pesquisa de artigos**, **navegação por paginação**, **navegação por categoria** e **abertura e validação de artigo**.

---

## Índice

- [Objetivo do projeto](#objetivo-do-projeto)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Cenários automatizados](#cenários-automatizados)
- [Pré-requisitos](#pré-requisitos)
- [Instalação do projeto](#instalação-do-projeto)
- [Como executar os testes](#como-executar-os-testes)
- [Relatórios e evidências](#relatórios-e-evidências)
- [Page Object Model](#page-object-model)
- [Integração Contínua – GitHub Actions](#integração-contínua--github-actions)
- [Boas práticas de QA adotadas](#boas-práticas-de-qa-adotadas)
- [Melhorias futuras](#melhorias-futuras)
- [Short English summary](#short-english-summary)

---

## Objetivo do projeto

- Demonstrar capacidade de:
  - analisar um fluxo real de produto (blog com busca, paginação, categorias e artigos);
  - selecionar cenários relevantes para automação;
  - implementar testes E2E estáveis usando Playwright e POM;
  - disponibilizar o projeto pronto para execução em qualquer sistema operacional (Linux/Windows/macOS).

---

## Tecnologias utilizadas

- Node.js 20+
- Playwright Test (TypeScript)
- Page Object Model (POM)
- Git e GitHub
- GitHub Actions (CI para execução automática dos testes)

---

## Estrutura do projeto

```text
.
├─ pages/
│  └─ BlogAgiPage.ts        # Page Object do Blog do Agi
├─ tests/
│  └─ blog-agi.spec.ts      # Cenários de teste end-to-end
├─ playwright-report/        # Relatório HTML gerado após execução
├─ test-results/             # Evidências (prints, vídeos, traces)
├─ playwright.config.ts      # Configuração do Playwright
├─ package.json
└─ README.md
```

- `pages/BlogAgiPage.ts` — encapsula locators e fluxos da página (navegação, busca, paginação, categoria e abertura de artigo) seguindo o padrão POM.
- `tests/blog-agi.spec.ts` — descreve os cenários de negócio, reutilizando os métodos do Page Object.
- `playwright.config.ts` — define browsers, diretórios de testes, relatórios e configurações globais.

---

## Cenários automatizados

### Cenário 1 – Pesquisa de artigo via lupa

**Descrição funcional**

- Acessar a home do Blog do Agi.
- Realizar uma busca de artigos utilizando o mecanismo de pesquisa do site.
- Validar que a busca foi processada com sucesso.

**Validações principais**

- A área de resultados (conteúdo principal) está visível.
- A URL contém a query string de busca do WordPress (`?s=`), indicando que a pesquisa foi realizada.

```ts
await expect(blogPage.results).toBeVisible();
await expect(blogPage.page).toHaveURL(/[?&]s=/);
```

---

### Cenário 2 – Navegação por paginação

**Descrição funcional**

- Acessar a home do Blog do Agi.
- Navegar para a segunda página de artigos utilizando o link de paginação "Próxima".
- Validar que o conteúdo da página 2 foi carregado.

**Validações principais**

- A URL contém `/page/2`.
- O container principal de resultados está visível.

```ts
await expect(blogPage.page).toHaveURL(/page\/2/);
await expect(blogPage.results).toBeVisible();
```

---

### Cenário 3 – Navegação por categoria

**Descrição funcional**

- Acessar a home do Blog do Agi.
- Navegar para a categoria "Produtos" via URL direta.
- Validar que a página de categoria foi carregada e que há artigos listados.

**Validações principais**

- A URL contém `/produtos/`.
- Ao menos um link de artigo (`h2 a` ou `h3 a`) está visível na área principal.

```ts
await expect(blogPage.page).toHaveURL(/\/produtos\//i);
await expect(articles.first()).toBeVisible();
```

---

### Cenário 4 – Abertura de artigo e validação de conteúdo

**Descrição funcional**

- Acessar a home do Blog do Agi.
- Clicar no primeiro artigo listado.
- Validar que a página do artigo foi aberta corretamente.

**Validações principais**

- A URL mudou (o usuário saiu da home).
- Um título `<h1>` está visível na página do artigo.
- O texto do `<h1>` contém ao menos a primeira palavra do título capturado antes do clique.

```ts
await expect(blogPage.page).not.toHaveURL('https://blog.agibank.com.br/');
await expect(heading).toBeVisible();
expect(headingText.toLowerCase()).toContain(title.split(' ')[0].toLowerCase());
```

---

## Pré-requisitos

- Node.js 20+ instalado
- npm configurado
- Git instalado e acesso ao GitHub

---

## Instalação do projeto

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Marcelo-Meireles/marcelomeireles-teste-tecnico-qa-blog-agi.git
cd marcelomeireles-teste-tecnico-qa-blog-agi
npm install
npx playwright install
```

---

## Como executar os testes

Executar todos os testes em todos os browsers configurados:

```bash
npx playwright test
```

Executar apenas em Chromium (mais rápido para desenvolvimento):

```bash
npx playwright test --project=chromium
```

Executar em modo interativo (UI), com vídeo, timeline e inspeção de locators:

```bash
npx playwright test --project=chromium --ui
```

Adicione scripts no `package.json` para encurtar os comandos:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:chromium": "playwright test --project=chromium",
    "test:ui": "playwright test --project=chromium --ui",
    "report": "playwright show-report"
  }
}
```

---

## Relatórios e evidências

Após a execução dos testes, o Playwright gera automaticamente:

- Relatório HTML em `playwright-report/index.html`
- Evidências em `test-results/` (vídeos, screenshots, traces)

Para abrir o relatório HTML:

```bash
npx playwright show-report
```

---

## Page Object Model

### BlogAgiPage

Responsável pelos fluxos principais do blog:

- `goto()` — navega para a home do Blog do Agi.
- `search(term)` — executa uma busca usando a rota do WordPress (`?s=termo`).
- `validatePage2()` — clica em "Próxima" e confirma que `/page/2/` foi carregada.
- `navigateToCategory(category)` — navega diretamente para a URL da categoria (ex: `Produtos` → `/produtos/`).
- `openFirstArticle()` — clica no primeiro artigo e retorna o título capturado antes do clique.

**Benefícios do POM neste projeto:**

- Separação clara entre fluxo de negócio (arquivo de teste em `tests/`) e detalhes de UI (Page Object em `pages/`).
- Facilidade de manutenção de seletores, centralizados em uma única classe.
- Reutilização de métodos para novos cenários, reduzindo duplicação de código.

---

## Integração Contínua – GitHub Actions

Workflow para rodar os testes automaticamente a cada `push` ou `pull request` na branch `main`:

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

Esse workflow garante execução em ambiente Linux (Ubuntu), atendendo ao requisito de ser executável em diferentes sistemas operacionais via CI.

---

## Boas práticas de QA adotadas

- **Escopo focado:** seleção de cenários críticos (busca, paginação, categoria e leitura de artigo), alinhados com a experiência principal do usuário no blog.
- **Testes determinísticos:** uso de asserções claras em URL e visibilidade de elementos, reduzindo falsos positivos.
- **Padrão POM:** encapsulamento de detalhes de UI em Page Objects, deixando os testes mais legíveis e orientados ao negócio.
- **Execução multi-browser:** cobertura dos principais motores (Chromium, Firefox, WebKit), aumentando a confiança na compatibilidade.
- **Relatórios e evidências:** geração automática de HTML report, vídeos, screenshots e traces para facilitar debugging.
- **Preparado para CI:** workflow de GitHub Actions pronto para rodar em pipelines de integração contínua.

---

## Melhorias futuras

- Parametrizar dados de teste (termos de busca, categorias, URLs) via data-driven ou arquivos de configuração.
- Integrar ESLint/Prettier para padronização do código dos testes.
- Publicar o relatório de testes no GitHub Pages após execução no CI.
- Adicionar testes de acessibilidade básicos (títulos, landmarks e atributos ARIA).
- Ampliar cobertura com cenários de filtros por tags e validação de formulários de newsletter.

---

## Short English summary

This repository contains an end-to-end test suite for **Agi's blog**, built with **Playwright + TypeScript** following the **Page Object Model** pattern.

The suite covers four key flows:

- searching for articles using the blog search feature;
- navigating through the article pagination;
- navigating to a content category page;
- opening an article and validating its content.

The project is ready to run on any OS (Linux/Windows/macOS) and integrates with **GitHub Actions** for CI, providing HTML reports, videos and traces for analysis.
