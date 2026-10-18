# Слой данных и моки

Бэкенда пока нет. Весь доступ к данным идёт через функции в `entities/*/api`, поэтому интерфейс не знает, откуда приходят данные.

## Как устроены моки

| Модуль                     | Назначение                                                                                                            |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `shared/api/mock.ts`       | `delay()` эмулирует сеть, `mockRequest()`, `ApiError(message, status)`                                                |
| `shared/api/storage.ts`    | `createMockTable(key, seed)` — CRUD-таблица в `localStorage`; `createMockSet(key)` — множество id (избранное, заявки) |
| `entities/*/model/mock.ts` | исходные данные (seed)                                                                                                |

Изменения пользователя (новые проекты, правки, избранное, запросы, заявки на события, уведомления) сохраняются в `localStorage` под ключами `sp_*_v1`.
Чтобы вернуть исходное состояние, очистите storage сайта.

### Особенности

- Код подтверждения почты — любые 6 цифр, `000000` имитирует ошибку.
- Демо-аккаунты зашиты в `entities/session/api/authApi.ts`; новые регистрации сохраняются в `sp_mock_users`.
- `/api/demo-login?role=…` сразу ставит cookie сессии. Отключается переменной `NEXT_PUBLIC_MOCK_API=false`.
- Статистика аналитики генерируется детерминированно по дате, поэтому график стабилен между перезагрузками.

## Query-хуки

Каждая сущность экспортирует хуки и ключи:

```ts
// entities/project
projectKeys.all; // ['projects'] — инвалидация после любых мутаций проекта
useMyProjects(ownerId, filters);
useProjectFeed(filters);
useProject(id);
useToggleFavourite() / useRequestAccess() / useUpdateProject(id);
```

Мутации инвалидируют корневой ключ сущности, так что списки и карточки обновляются сами.

## Переход на реальный API

1. **Тела функций.** Замените реализацию в `entities/*/api/*.ts` на HTTP-запросы. Сигнатуры и возвращаемые типы оставьте прежними, тогда хуки и UI менять не придётся.
2. **HTTP-клиент.** Добавьте `shared/api/http.ts` (базовый URL, заголовки, разбор ошибок в `ApiError`).
3. **Авторизация.** Перенесите `login` / `completeRegistration` / `setNewPassword` в route handlers или server actions, а сессию храните в **httpOnly**-cookie. `writeSessionCookie()` на клиенте нужен только для моков.
4. **Middleware.** Проверяйте подпись токена (JWT/opaque), а не просто разбирайте JSON.
5. **Файлы.** `FileUpload` и `ImageUpload` сейчас отдают метаданные и data URL; при подключении бэкенда загружайте файлы через presigned URL.
6. **Каталог стартапов.** Оставьте SSG с `revalidate` (ISR) или `generateStaticParams` из API.
7. Удалите `app/api/demo-login`, `shared/api/storage.ts` и `entities/*/model/mock.ts`, когда они перестанут быть нужны.
