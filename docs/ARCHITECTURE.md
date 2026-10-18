# Архитектура

Проект построен по **Feature-Sliced Design (FSD)** поверх Next.js App Router.

## Слои

```
src/
├─ app/        Next.js: маршруты, layouts, templates, metadata, sitemap/robots/manifest, route handlers
├─ views/      слой «pages» из FSD: сборка экрана из виджетов и фич
├─ widgets/    самостоятельные крупные блоки интерфейса
├─ features/   пользовательские сценарии (действие пользователя + его UI)
├─ entities/   бизнес-сущности: типы, API, query-хуки, «тупые» карточки
├─ shared/     переиспользуемое без бизнес-смысла: ui-kit, api, config, lib
└─ middleware.ts
```

Слой pages переименован в `views`, потому что папка `pages/` в Next.js зарезервирована под Pages Router.

### Правила импорта

- Импорт только **вниз**: `app → views → widgets → features → entities → shared`.
- Внутри слоя слайсы не импортируют друг друга. Исключение — сущности, ссылающиеся на `project` (см. ниже).
- Снаружи импортируем только **публичный API** слайса (`index.ts`), во внутренние файлы не лезем.
- `app/*` — тонкая обёртка: читает params/searchParams, задаёт metadata и рендерит view.

### Дополнительные публичные точки входа

| Файл                         | Зачем                                                                |
| ---------------------------- | -------------------------------------------------------------------- |
| `entities/session/server.ts` | `getServerSession()`: только сервер (`server-only`, `next/headers`)  |
| `entities/session/cookie.ts` | `decodeSession`, `SESSION_COOKIE` для edge-middleware без React-кода |

### Cross-import сущностей

`corporate-request` и `expertise` зависят от `project`: подборка и заявка на экспертизу строятся вокруг проекта.
FSD 2.1 допускает такие связи. Если связей станет больше, их стоит вынести в фасад `entities/project/@x/*`.

## Слайсы

### entities

| Слайс               | Содержимое                                                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `session`           | роли, cookie-сессия, стор на запрос (`SessionProvider`, `useSession`), mock auth API                                                                 |
| `project`           | модель проекта, справочники (стадии, направления…), API, query-хуки, карточки (`ProjectStatusCard`, `ProjectFeedCard`, `CompanyCard`, `ScoreDonut`…) |
| `startup`           | публичная витрина: модель, данные, `StartupCard`, `FundingProgress`, schema.org                                                                      |
| `corporate-request` | запросы корпораций и `RequestCard`                                                                                                                   |
| `expertise`         | заявки на экспертизу и `ExpertiseCard`                                                                                                               |
| `event`             | мероприятия, участие и `EventCard`                                                                                                                   |
| `notification`      | уведомления и `NotificationItem`                                                                                                                     |
| `analytics`         | статистика инвестора                                                                                                                                 |

### features

| Слайс                 | Сценарий                                                                    |
| --------------------- | --------------------------------------------------------------------------- |
| `auth/*`              | вход, регистрация, подтверждение почты, восстановление пароля               |
| `questionnaire`       | анкеты стартапа, инвестора и корпорации, завершение регистрации             |
| `project/*`           | фильтры ленты, запрос доступа, избранное, данные компании, редактор проекта |
| `corporate-request/*` | создание и закрытие запроса                                                 |
| `expertise-review`    | комментарии эксперта по блокам, оценка, публикация или доработка            |
| `event-participation` | заявка на участие                                                           |
| `profile/*`           | контакты, смена почты и пароля, выход                                       |
| `analytics-period`    | выбор периода (пресеты и календарь)                                         |

### widgets

`dashboard-sidebar`, `dashboard-page` (шапка страницы кабинета), `project-details` (полная карточка проекта, разбита на `sections/`), `auth-shell` (каркас auth и степпер), `onboarding-hero`, `public-header`, `public-footer`, `startup-hero`, `startup-tabs`.

## Состояние и данные

| Тип состояния                        | Инструмент                                                                               |
| ------------------------------------ | ---------------------------------------------------------------------------------------- |
| Серверные данные (проекты, запросы…) | TanStack Query, ключи в `entities/*/api`                                                 |
| Сессия                               | Zustand через контекст (отдельный стор на запрос, без утечек между пользователями в SSR) |
| Формы                                | react-hook-form + zod                                                                    |
| Тосты                                | Zustand (только клиент), `toast.success()` из `shared/ui`                                |
| Локальный UI                         | `useState`                                                                               |

Подробно о моках и переходе на реальный API — в [DATA-LAYER.md](./DATA-LAYER.md).

## Рендеринг

| Зона                      | Режим                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `/`, `/startups/[slug]/*` | SSG (`generateStaticParams`, `dynamicParams = false`)                                       |
| `/startups`               | динамический (поиск по `searchParams`), без `q` индексируется                               |
| `/auth/*`                 | статика, client-only формы                                                                  |
| `/dashboard/*`            | динамический: layout читает cookie на сервере, экраны — клиентские компоненты с React Query |

## Авторизация

1. Сессия хранится в cookie `sp_session` (в моках — JSON, пишется на клиенте).
2. `middleware.ts` не пускает гостей в `/dashboard/*`, а авторизованных уводит с `/auth` и `/auth/login`.
3. `app/dashboard/layout.tsx` ещё раз проверяет сессию на сервере и передаёт пользователя в `SessionProvider`.
4. `/dashboard` рендерит домашний экран по роли: `MyProjectsPage`, `ProjectFeedPage`, `MyRequestsPage` или `ExpertiseRequestsPage`.
