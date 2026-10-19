# Sechenov Platform

Платформа Сеченовского Университета для медицинских стартапов, инвесторов, корпораций и экспертов.
Вёрстка по макету Figma **SechinPlatform** (страницы Design и UI KIT). Бэкенда пока нет: логика работает на моках.

**Демо:** https://kalenimal.github.io/sechin-start/ (GitHub Pages, автодеплой из `main`, см. [docs/DEPLOY.md](docs/DEPLOY.md))

## Стек

Next.js 15 (App Router, Turbopack) · React 19 · TypeScript strict · CSS Modules + дизайн-токены · TanStack Query · Zustand · react-hook-form + zod · lucide-react · Prettier + ESLint

## Быстрый старт

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

| Скрипт                        | Что делает                  |
| ----------------------------- | --------------------------- |
| `npm run dev`                 | dev-сервер (Turbopack)      |
| `npm run build` / `npm start` | production-сборка и запуск  |
| `npm run check`               | typecheck + lint + prettier |
| `npm run format`              | форматирование              |

### Демо-доступ

Вход принимает **любую почту и пароль**, роль (стартап, инвестор, корпорация, эксперт) выбирается в форме.
Быстрый вход без формы: `/auth/demo?role=expert`. Письма не отправляются: на шаге подтверждения введите любые 6 цифр или нажмите «Продолжить».
Данные, изменённые в кабинетах, хранятся в `localStorage`; чтобы сбросить их, очистите storage сайта.

## Документация

| Документ                                     | О чём                                                 |
| -------------------------------------------- | ----------------------------------------------------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | FSD-слои, слайсы, состояние, рендеринг, авторизация   |
| [docs/ROUTES.md](docs/ROUTES.md)             | маршруты, роли, режимы страницы проекта               |
| [docs/UI-KIT.md](docs/UI-KIT.md)             | токены и компоненты `shared/ui`, доступность          |
| [docs/DATA-LAYER.md](docs/DATA-LAYER.md)     | моки, query-хуки, план перехода на реальный API       |
| [docs/SEO.md](docs/SEO.md)                   | метаданные, JSON-LD, sitemap, чек-лист новой страницы |
| [docs/PERFORMANCE.md](docs/PERFORMANCE.md)   | замеры Lighthouse, оптимизации, как перемерить        |
| [docs/DEPLOY.md](docs/DEPLOY.md)             | GitHub Pages, автодеплой, статическая сборка          |
| [docs/CONVENTIONS.md](docs/CONVENTIONS.md)   | код-стайл, стили, формы, данные                       |

## Структура

```
src/
├─ app/        маршруты Next.js (тонкие страницы, metadata, sitemap, robots)
├─ views/      экраны (слой pages из FSD)
├─ widgets/    сайдбар, карточка проекта, hero, auth-shell…
├─ features/   вход, регистрация, анкеты, фильтры, экспертиза, запросы…
├─ entities/   session, project, startup, corporate-request, expertise, event, notification, analytics
└─ shared/     ui-kit, api (моки), config, lib
```

## Чего не было в макете (сделано по аналогии)

- «Коммуникация» — заглушка, «Помощь» — FAQ.
- Выход из аккаунта, модалка «Данные компании», тосты-подтверждения действий.
- «Отправить на доработку» у эксперта, если оставлены комментарии.
- Адаптив под ноутбуки, планшеты и телефоны (макет сделан под 1920px), анимации интерфейса.
