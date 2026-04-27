# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Rockit Talent** — рекрутингове агентство для iGaming, affiliate та performance marketing ніш. Сайт є маркетинговим лендінгом + job board + AI-матчинг платформою.

Сайт будується як **єдиний проєкт** (один `index.html` + окремі CSS/JS файли), на відміну від референсу де кожна секція — окремий iframe-файл. Хостинг: GitHub Pages.

## Tech Stack

- Pure HTML5, CSS3, Vanilla JavaScript — без фреймворків і бандлерів
- Шрифти: Google Fonts — `Unbounded` (заголовки, 700–900), `Poppins` (тіло, 400–600)
- Деплой: GitHub Pages з гілки `main`, файл `index.html` в корені репозиторію

## Local Development

Відкрити локально (без сервера):
```
open index.html
```

Або запустити локальний сервер (рекомендовано для коректної роботи fetch/form):
```
npx serve .
# або
python3 -m http.server 8080
```

Деплой на GitHub Pages — просто push до `main`. Сайт буде доступний за адресою `https://<username>.github.io/<repo>/`.

## File Structure

```
/
├── index.html          # Єдина HTML-сторінка з усіма секціями
├── css/
│   ├── reset.css       # CSS reset / base
│   ├── variables.css   # Design tokens (кольори, шрифти, відступи)
│   ├── components.css  # Кнопки, картки, бейджі, форми
│   └── sections/       # По одному файлу на секцію (nav.css, hero.css, тощо)
├── js/
│   ├── nav.js          # Sticky nav, smooth scroll, mobile menu
│   ├── animations.js   # Intersection Observer fade-up анімації
│   ├── jobboard.js     # Фільтрація вакансій, сортування
│   ├── match.js        # AI-матч свайп-демо інтерактив
│   └── form.js         # Валідація та сабміт форми вакансії
└── assets/
    └── fonts/          # Якщо шрифти локальні (інакше Google Fonts CDN)
```

## Design System

### Кольори (CSS custom properties)
```css
--color-bg: #000000;
--color-accent: #B5E726;    /* lime green — primary CTA, highlights */
--color-purple: #7134E8;    /* purple — secondary accent, glow effects */
--color-white: #ffffff;
--color-muted: #6b6b6b;     /* secondary text */
--color-card: #111111;      /* card backgrounds */
--color-border: #222222;    /* borders, dividers */
```

### Типографіка
- Заголовки (`h1`–`h3`): `Unbounded`, 700–900, uppercase або mixed
- Тіло, UI: `Poppins`, 400–600
- Акцентний текст (теги, бейджі): `Poppins`, 500–600, `--color-accent` або `--color-purple`

### Ключові UI-патерни
- Sticky nav з `backdrop-filter: blur(12px)` та напів-прозорим фоном
- Grid-фон секцій: `background-image: linear-gradient(...)` тонка сітка + radial glow `--color-purple` зверху-справа
- Картки: темний фон `#111`, border `1px solid #222`, border-radius 16px, hover з `border-color: --color-accent`
- Анімації: fade-up через `IntersectionObserver` (opacity 0→1, translateY 20px→0, `transition: 0.5s ease`)
- CTA-кнопки: primary — `background: --color-accent`, `color: #000`, secondary — outline `border: 1px solid #333`

## Page Sections (в порядку на сторінці)

| ID | Назва | Опис |
|----|-------|------|
| `#nav` | Navigation | Sticky хедер: лого "⚡ Rockit TALENT", посилання, CTA "Зв'язатись →" |
| `#hero` | Hero | Headline, 4 статистики, два CTA: "Знайти спеціаліста →" / "Я кандидат →" |
| `#for-whom` | Для кого | Split-картки: Companies vs Candidates, статистики внизу |
| `#who-we-are` | Хто ми | Бекграунд агенції, 6 карток з областями експертизи |
| `#why` | Чому Rockit | 6 диференціаторів у форматі карток з іконками |
| `#pipeline` | Процес | 7 кроків найму у вигляді timeline/steps |
| `#ai-match` | AI-Матч | Інтерактивне демо анонімного матчингу (свайп-картка) |
| `#pricing` | Прайс | Дві моделі: Search from Base (таблиця цін) + Cold Search (10%) |
| `#guarantees` | Гарантії | 3 картки: заміна 30 днів, фікс ціна, Premium 60 днів |
| `#jobs` | Вакансії | Фільтрований job board з 7 позиціями (моковані дані) |
| `#contact` | Форма | Форма для розміщення вакансії (назва, формат, міто, завдання, контакт) |
| `#geo` | Географія | 3 блоки: Україна / Європа (Warsaw, Limassol, Riga, Malta) / Worldwide |
| `#footer` | Footer | Лого, посилання, соцмережі, copyright © 2026 ROCKIT TALENT |

## Navigation Links (українською)

`Чому ми` → `#why` | `Процес` → `#pipeline` | `Прайс` → `#pricing` | `Вакансії` → `#jobs` | `AI-Матч` → `#ai-match` | `Зв'язатись →` → `#contact`

## Key Content Details

### Статистики (Hero + For Whom)
- 2 дні — перші кандидати з бази
- 90% — проходять внутрішній скринінг
- Fix без % від зарплати
- 95% — нерелевантних відсівається

### Прайс — Search from Base
| Ніша | Рівень | Ціна |
|------|--------|------|
| Media Buying / Affiliate / BizDev | Middle | від $500 |
| | Senior | від $800 |
| | Lead | від $1,200 |
| | Head | від $1,500 |
| Sales / Support / Retention | Junior | від $300 |
| | Middle | від $500 |
| | Senior | від $800 |
| Tech / Dev / QA / PM | Junior | від $350 |
| | Middle | від $900 |
| | Senior | від $1,500 |
| | Team Lead | від $1,800 |
| C-Level | — | від $2,000 |

Cold Search: 10% від річної компенсації (мінімум: Middle $2k, Senior $3k, TL $4k, Head/C $5k+)

Оплата: 50% в перший день + 50% через місяць. Складні позиції: 20% депозит + залишок після виходу.

### Job Board — категорії фільтрів
`All` | `Remote` | `iGaming` | `Affiliate` | `Media Buying` | `Senior+` | `Tech`

### Форма вакансії — поля
`fRole` (назва), `fFormat` (Remote/Office/Hybrid/Relocate), `fCity`, `fTasks` (3–5 пунктів), `fExpect` (вимоги), `fPerks` (переваги компанії), `fContact`

## Contacts & Branding

- Telegram: @rockit_talent
- Instagram: @rockit_talent
- Пов'язаний бренд: rockitmedia.io (Rockit Media — материнська компанія)
- Copyright: © 2026 ROCKIT TALENT

## Important Notes

- Весь UI-текст — **українською мовою**
- Job board працює на **мокованих даних** (масив об'єктів у `jobboard.js`), без бекенду
- Форма вакансії — `mailto:` або Formspree/Netlify Forms (без серверного бекенду)
- AI-матч секція — **інтерактивне демо**, не реальна платформа; свайп-картка з анімацією
- Сайт — SPA (single page), навігація через anchor-посилання зі smooth scroll
- Референс (поганий підхід): https://aleksandrovnairina.github.io/rockit_talent/ — iframe-архітектура, яку **не треба повторювати**
