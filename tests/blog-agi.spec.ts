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
});
