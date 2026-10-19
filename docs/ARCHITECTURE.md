# Архитектура

Проект построен по **Feature-Sliced Design (FSD)** поверх Next.js App Router.

## Слои

```
src/
├─ app/        Next.js: маршруты, layouts, templates, metadata, sitemap/robots/manifest
├─ views/      слой «pages» из FSD: сборка экрана из виджетов и фич
├─ widgets/    самостоятельные крупные блоки интерфейса
├─ features/   пользовательские сценарии (действие пользователя + его UI)
├─ entities/   бизнес-сущности: типы, API, query-хуки, «тупые» карточки
└─ shared/     переиспользуемое без бизнес-смысла: ui-kit, api, config, lib
```

Слой pages переименован в `views`, потому что папка `pages/` в Next.js зарезервирована под Pages Router.
Каждый экран — отдельный слайс (`views/login`, `views/sign-up`, `views/dashboard/project`…). Объединять экраны в один barrel нельзя: серверная страница, импортировавшая barrel, тянет клиентский код всех экранов в свой бандл.

### Правила импорта

- Импорт только **вниз**: `app → views → widgets → features → entities → shared`.
- Внутри слоя слайсы не импортируют друг друга. Исключение — сущности, ссылающиеся на `project` (см. ниже).
- Снаружи импортируем только **публичный API** слайса (`index.ts`), во внутренние файлы не лезем.
- `app/*` — тонкая обёртка: читает params, задаёт metadata и рендерит view. Query-параметры читаются на клиенте (`useSearchParams` внутри `<Suspense>`), потому что сайт статический.

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

| Тип состояния                        | Инструмент                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| Серверные данные (проекты, запросы…) | TanStack Query, ключи в `entities/*/api`                                       |
| Сессия                               | Zustand через контекст, стор создаётся в `SessionProvider` после чтения cookie |
| Формы                                | react-hook-form + zod                                                          |
| Тосты                                | Zustand (только клиент), `toast.success()` из `shared/ui`                      |
| Локальный UI                         | `useState`                                                                     |

Подробно о моках и переходе на реальный API — в [DATA-LAYER.md](./DATA-LAYER.md).

## Рендеринг

| Зона                      | Режим                                                                 |
| ------------------------- | --------------------------------------------------------------------- |
| `/`, `/startups/[slug]/*` | SSG (`generateStaticParams`, `dynamicParams = false`)                 |
| `/startups`               | SSG с полным списком; поиск и фильтр по тегу применяются в браузере   |
| `/auth/*`                 | SSG; шаг регистрации (`?step=`) читается на клиенте, в HTML — шаг 1   |
| `/dashboard/*`            | SSG-оболочка; сессия и данные — в браузере (React Query поверх моков) |

Весь сайт — статика: нет middleware, route handlers и серверного чтения cookie. Поэтому одна и та же сборка
работает на GitHub Pages (`output: 'export'`), Vercel или любом статическом хостинге — см. [DEPLOY.md](./DEPLOY.md).
Страницы с id (`/dashboard/project?id=`) принимают его query-параметром: у созданных пользователем записей
нет заранее сгенерированной страницы.

## Авторизация

1. Сессия хранится в cookie `sp_session` (в моках — JSON, пишется на клиенте).
2. `app/dashboard/SessionGate.tsx` читает cookie в браузере: гостя отправляет на `/auth/login?next=…`, пользователя передаёт в `SessionProvider`. До проверки показывается пустая оболочка.
3. `app/auth/RedirectIfSignedIn.tsx` уводит авторизованных с `/auth` и `/auth/login`.

Когда появится бэкенд, проверку стоит вернуть на сервер (middleware + httpOnly cookie) и отказаться от статического экспорта. 4. `/dashboard` рендерит домашний экран по роли: `MyProjectsPage`, `ProjectFeedPage`, `MyRequestsPage` или `ExpertiseRequestsPage`.
