# Hive Intelligence — сайт

Лендинг IT-сервісу Hive Intelligence (Дніпро): ремонт техніки, мережі, відеонагляд, резервне живлення, IT-супровід бізнесу та HoReCa.

**Стек:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · статичний експорт сторінки.

## Запуск локально

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # продакшн-збірка
```

## Де що редагувати

| Що | Файл |
| --- | --- |
| Тексти, ціни, контакти, FAQ, кейси | `src/content/site.ts` |
| Кольори, шрифти | `src/app/globals.css` (блок `@theme`) |
| SEO, заголовок, опис, schema.org | `src/app/layout.tsx` |
| Логотип (вектор) | `src/lib/logo.ts`, іконка вкладки — `src/app/icon.svg` |
| Фото в блоці «Про мене» | покладіть `public/about.jpg` і вкажіть `photo: "/about.jpg"` у `site.ts` |

## Деплой на GitHub Pages

Workflow `.github/workflows/pages.yml` збирає статичну версію і публікує її на `https://vegamond.github.io/hive-intelligence-site/` після кожного пушу в `main`.

Одноразово ввімкнути: **Settings → Pages → Build and deployment → Source: GitHub Actions**. На безкоштовному тарифі GitHub Pages працює лише для публічних репозиторіїв.

## Деплой на Vercel

1. Увійдіть на [vercel.com](https://vercel.com) через GitHub.
2. **Add New → Project** → оберіть цей репозиторій → **Deploy** (налаштування за замовчуванням).
3. **Settings → Domains** → додайте свій домен (наприклад `hive-intelligence.com.ua`) і пропишіть DNS-записи, які покаже Vercel, у реєстратора домену.
4. **Settings → Environment Variables** → `NEXT_PUBLIC_SITE_URL=https://ваш-домен` (для коректних посилань у соцмережах).

Кожен `git push` у гілку `main` автоматично оновлює сайт.

## Особливості

- Адаптив під телефон: мобільне меню, фіксована панель «Подзвонити / Telegram».
- Анімації з'являються при прокрутці й вимикаються, якщо в системі ввімкнено «зменшити рух».
- Шрифти Manrope та Michroma підключені локально (ліцензія SIL OFL).
- Розмітка schema.org `ComputerRepair` для Google.
