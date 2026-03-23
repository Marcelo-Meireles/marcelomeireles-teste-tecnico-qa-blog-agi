import { test, expect } from '@playwright/test';
import { BlogAgiPage } from '../pages/BlogAgiPage';

test.describe('Blog do Agi - Automação QA', () => {
  let blogPage: BlogAgiPage;

  test.beforeEach(async ({ page }) => {
    blogPage = new BlogAgiPage(page);
    await blogPage.goto();
  });

  test('Cenário 1: Pesquisa de artigo via lupa', async () => {
    await blogPage.search('eleições 2026');
    await expect(blogPage.results).toBeVisible();
    await expect(blogPage.page).toHaveURL(/[?&]s=/);
  });

  test('Cenário 2: Navegação por paginação', async () => {
    await blogPage.validatePage2();
    await expect(blogPage.page).toHaveURL(/page\/2/);
  });

      test('Cenário 3: Navegação por categoria', async () => {
      await blogPage.navigateToCategory('Produtos');
      await expect(blogPage.page).toHaveURL(/\/produtos\//i);
      const articles = blogPage.page.locator('main h2 a, main h3 a');
      await expect(articles.first()).toBeVisible();
    });

    test('Cenário 4: Abertura de artigo e validação de conteúdo', async () => {
      const title = await blogPage.openFirstArticle();
      await expect(blogPage.page).not.toHaveURL('https://blog.agibank.com.br/');
      const heading = blogPage.page.locator('h1').first();
      await expect(heading).toBeVisible();
      const headingText = await heading.innerText();
      expect(headingText.toLowerCase()).toContain(title.split(' ')[0].toLowerCase());
    });
});
