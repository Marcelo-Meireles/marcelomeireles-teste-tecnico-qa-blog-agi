# Teste Técnico QA – Blog do Agi (Playwright)

Automação end-to-end do **Blog do Agi** utilizando Playwright + TypeScript, aplicando Page Object Model (POM), boas práticas de estrutura e execução em múltiplos browsers (Chromium, Firefox, WebKit). [web:9]

Repositório criado para o teste técnico de QA, focado na funcionalidade de **pesquisa de artigos (lupa)** e **navegação por paginação** do Blog do Agi. [page:1]

---

## 📚 Índice

- [Objetivo do projeto](#-objetivo-do-projeto)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Cenários automatizados](#-cenários-automatizados)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação do projeto](#-instalação-do-projeto)
- [Como executar os testes](#-como-executar-os-testes)
- [Relatórios e evidências](#-relatórios-e-evidências)
- [Page Object Model](#-page-object-model)
- [Integração Contínua (GitHub Actions)](#-integração-contínua-github-actions)
- [Boas práticas de QA adotadas](#-boas-práticas-de-qa-adotadas)
- [Melhorias futuras](#-melhorias-futuras)
- [Short English summary](#-short-english-summary)

---

## 🎯 Objetivo do projeto

- Demonstrar capacidade de:
  - analisar um fluxo real de produto (blog com busca e paginação);
  - selecionar cenários relevantes para automação;
  - implementar testes E2E estáveis usando Playwright e POM;
  - disponibilizar o projeto pronto para execução em qualquer sistema operacional (Linux/Windows/macOS). [page:1][web:9]

---

## 🧩 Tecnologias utilizadas

- Node.js 20+  
- Playwright Test (TypeScript) [web:9]  
- Page Object Model (POM) [web:9]  
- Git e GitHub  
- GitHub Actions (CI para execução automática dos testes) [web:11]

---

## 📁 Estrutura do projeto

Projeto organizado de forma semelhante a um repositório dedicado exclusivamente a testes, facilitando entendimento e manutenção. [web:8][web:9]

```text
.
├─ src/
│  ├─ pages/
│  │  └─ BlogAgiPage.ts        # Page Object da home do Blog do Agi
│  └─ tests/
│     └─ blog-agi.spec.ts      # Cenários de teste end-to-end
│
├─ playwright-report/          # Relatório HTML gerado pelo Playwright (após execução)
├─ test-results/               # Evidências (prints, vídeos, traces) geradas pelo Playwright
│
├─ playwright.config.ts        # Configuração do Playwright
├─ package.json
├─ tsconfig.json               # Configuração TypeScript (quando aplicável)
└─ README.md
src/pages/BlogAgiPage.ts: encapsula locators e fluxos da página (navegação, busca e paginação) com o padrão Page Object Model. [page:1][web:9]

src/tests/blog-agi.spec.ts: descreve os cenários de negócio, reutilizando os métodos do Page Object. [page:1]

playwright.config.ts: define browsers, diretórios de testes, relatórios e configurações globais. [web:9]

🧪 Cenários automatizados
Cenário 1 – Pesquisa de artigo via lupa
Descrição funcional [page:1]

Acessar a home do Blog do Agi.

Realizar uma busca de artigos utilizando o mecanismo de pesquisa do site (lupa).

Validar que a busca foi processada com sucesso.

Validações principais [page:1]

A área de resultados (conteúdo principal) está visível.

A URL contém a query string de busca do WordPress (?s=), indicando que a pesquisa foi realizada.

Exemplo de asserções em TypeScript: [page:1]

ts
await expect(blogPage.resultsSection).toBeVisible();
await expect(blogPage.page).toHaveURL(/[?&]s=/);
Cenário 2 – Navegação por paginação
Descrição funcional [page:1]

Acessar a home do Blog do Agi.

Navegar para a segunda página de artigos utilizando o link de paginação “Próxima”.

Validar que o conteúdo da página 2 foi carregado.

Validações principais [page:1]

A URL contém /page/2.

O container principal de resultados está visível.

Exemplo de asserções em TypeScript: [page:1]

ts
await expect(blogPage.page).toHaveURL(/page\/2/);
await expect(blogPage.resultsSection).toBeVisible();
⚙️ Pré-requisitos
Node.js 20+ instalado

npm configurado

Git instalado e acesso ao GitHub [web:9]

📦 Instalação do projeto
Clone o repositório e instale as dependências: [web:9]

bash
git clone https://github.com/Marcelo-Meireles/marcelomeireles-teste-tecnico-qa-blog-agi.git
cd marcelomeireles-teste-tecnico-qa-blog-agi

npm install
npx playwright install
▶️ Como executar os testes
Executar todos os testes em todos os browsers configurados: [web:9]

bash
npx playwright test
Executar apenas em Chromium (mais rápido para desenvolvimento): [web:9]

bash
npx playwright test --project=chromium
Executar em modo interativo (UI), com vídeo, timeline e inspeção de locators: [web:9]

bash
npx playwright test --project=chromium --ui
Se preferir, você pode adicionar scripts no package.json para encurtar os comandos: [web:9]

json
{
  "scripts": {
    "test": "playwright test",
    "test:chromium": "playwright test --project=chromium",
    "test:ui": "playwright test --project=chromium --ui",
    "report": "playwright show-report"
  }
}
📊 Relatórios e evidências
Após a execução dos testes, o Playwright gera automaticamente: [web:9]

Relatório HTML em playwright-report/index.html

Evidências em test-results/ (vídeos, screenshots, traces)

Para abrir o relatório HTML: [web:9]

bash
npx playwright show-report
# ou, se tiver script configurado
npm run report
Esses artefatos são úteis para análise de falhas, rastreabilidade e apresentação do trabalho ao recrutador. [web:9]

🧱 Page Object Model
BlogAgiPage
Responsável pelos fluxos principais da home do blog: [page:1][web:9]

goto() – navega para a home do Blog do Agi (https://blog.agibank.com.br/ ou URL oficial atual).

search(term) – executa uma busca reutilizando a mesma rota que o formulário de pesquisa do WordPress (?s=termo). [page:1]

goToPage2() / validatePage2() – navega para a página 2 e garante que o conteúdo foi carregado. [page:1]

Benefícios do POM neste projeto: [web:9]

Separação clara entre fluxo de negócio (arquivo de teste em src/tests) e detalhes de UI (Page Object em src/pages).

Facilidade de manutenção de seletores, centralizados em uma única classe.

Reutilização de métodos para novos cenários, reduzindo duplicação de código.

🔁 Integração Contínua (GitHub Actions)
Sugestão de workflow para rodar os testes automaticamente a cada push/pull request na branch main: [web:11]

text
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
Esse workflow garante execução em ambiente Linux (Ubuntu), atendendo ao requisito de ser executável em diferentes sistemas operacionais via CI. [web:11]

✅ Boas práticas de QA adotadas
Escopo focado: seleção de cenários críticos (busca e paginação), alinhados com a experiência principal do usuário no blog. [page:1]

Testes determinísticos: uso de asserções claras em URL e visibilidade de elementos, reduzindo falsos positivos. [page:1][web:9]

Padrão POM: encapsulamento de detalhes de UI em Page Objects, deixando os testes mais legíveis e orientados ao negócio. [web:9]

Execução multi-browser: cobertura dos principais motores (Chromium, Firefox, WebKit), aumentando a confiança na compatibilidade. [web:9]

Relatórios e evidências: geração automática de HTML report, vídeos, screenshots e traces para facilitar debugging. [web:9]

Preparado para CI: workflow de GitHub Actions pronto para rodar em pipelines de integração contínua. [web:11]

🚀 Melhorias futuras
Algumas evoluções planejadas / sugeridas para o projeto:

Adicionar novos cenários, como:

validação de navegação para páginas de detalhes de artigos;

filtros adicionais de conteúdo (tags/categorias), se disponíveis no blog. [page:1]

Parametrizar dados de teste (termos de busca, URLs) via data-driven ou arquivos de configuração. [web:9]

Integrar ferramenta de análise de qualidade de código (ESLint/Prettier) para padronização do código dos testes. [web:9]

Publicar o relatório de testes como artefato em CI e, opcionalmente, em GitHub Pages. [web:11]

Adicionar testes de acessibilidade básicos (como verificação de títulos, landmarks e atributos ARIA). [web:9]

🌍 Short English summary
This repository contains an end‑to‑end test suite for Agi’s blog, built with Playwright + TypeScript following the Page Object Model pattern. [web:9][page:1]
The suite covers two key flows: searching for articles using the blog search feature and navigating through article pagination. [page:1]
The project is ready to run on any OS (Linux/Windows/macOS) and integrates easily with GitHub Actions for CI, providing HTML reports, videos and traces for analysis. [web:9][web:11]
