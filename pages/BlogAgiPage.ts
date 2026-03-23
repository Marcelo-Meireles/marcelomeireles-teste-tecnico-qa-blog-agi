import { Page, Locator } from '@playwright/test';

const BASE = 'https://blog.agibank.com.br';

export class BlogAgiPage {
  readonly page: Page;
  readonly nextPageLink: Locator;
  readonly results: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nextPageLink = page.getByRole('link', { name: /próxima/i });
    // Um único elemento — evita strict mode em "main article" (vários <article>)
    this.results = page.locator('main.site-main');
  }

  async goto() {
    await this.page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  }

  /** Busca WordPress via GET (?s=) — mesmo destino do formulário da lupa (campo oculto no DOM). */
  async search(term: string) {
    await this.page.goto(`${BASE}/?s=${encodeURIComponent(term)}`, { waitUntil: 'domcontentloaded' });
  }

  async validatePage2() {
    const next = this.nextPageLink;
    await next.waitFor({ state: 'visible' });
    await next.click();
    await this.page.waitForURL(/page\/2/, { waitUntil: 'domcontentloaded' });
    await this.results.waitFor({ state: 'visible' });
  }

    /** Navega para a categoria Produtos e valida que ha artigos listados. */
  async navigateToCategory(category: string) {
    await this.page.click('button[aria-label="Main menu toggle"]');
    await this.page.getByRole('link', { name: category, exact: true }).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Clica no primeiro artigo da lista e retorna o titulo capturado antes do clique. */
  async openFirstArticle(): Promise<string> {
    const firstArticle = this.page.locator('main h3 a').first();
    const title = (await firstArticle.innerText()).trim();
    await firstArticle.click();
    await this.page.waitForLoadState('domcontentloaded');
    return title;
  }
}
