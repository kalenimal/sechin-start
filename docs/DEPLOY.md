# Деплой

Сайт полностью статический: данные — моки в браузере, сессия — cookie, которую читает клиент.
Поэтому он собирается в папку HTML-файлов и хостится где угодно без Node.js.

## GitHub Pages (основной)

Адрес: https://kalenimal.github.io/sechin-start/

Workflow `.github/workflows/pages.yml` запускается при каждом пуше в `main` (и вручную из вкладки Actions):

1. `npm ci` → `npm run check` (typecheck, lint, prettier) → `npm run build` со статическим экспортом;
2. папка `out/` пушится в ветку `gh-pages` (с нуля, без истории), GitHub Pages раздаёт эту ветку.

Переменные сборки задаются в workflow:

| Переменная              | Значение                           | Зачем                                         |
| ----------------------- | ---------------------------------- | --------------------------------------------- |
| `STATIC_EXPORT`         | `true`                             | `output: 'export'`, custom image loader       |
| `NEXT_PUBLIC_BASE_PATH` | `/<имя репозитория>`               | сайт живёт в подпапке `user.github.io/<repo>` |
| `NEXT_PUBLIC_SITE_URL`  | `https://<owner>.github.io/<repo>` | canonical, sitemap, Open Graph, JSON-LD       |

Pages включается автоматически при первом пуше ветки `gh-pages`. Если нет — **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `(root)`**.
На бесплатном тарифе GitHub Pages доступен только для публичных репозиториев.

### Свой домен

1. Settings → Pages → Custom domain, у регистратора — CNAME на `kalenimal.github.io`.
2. В workflow: `NEXT_PUBLIC_BASE_PATH: ''`, `NEXT_PUBLIC_SITE_URL: https://<домен>`.

## Локальная проверка статической сборки

```bash
STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/sechin-start NEXT_PUBLIC_SITE_URL=https://kalenimal.github.io/sechin-start npm run build
mkdir -p /tmp/pages && ln -sfn "$PWD/out" /tmp/pages/sechin-start
python3 -m http.server 3000 -d /tmp/pages   # http://localhost:3000/sechin-start/
```

## Особенности статической сборки

- `next/image` без оптимизатора: `src/shared/lib/image-loader.ts` отдаёт файлы как есть и добавляет basePath.
- Строки-пути, которые Next не обрабатывает сам (`window.location`, manifest), оборачиваются в `withBasePath()`.
- В CSS не используйте абсолютные `url('/images/…')` — кладите файл рядом с модулем и пишите `url('./file.svg')`.
- `trailingSlash: true`: каждая страница — `папка/index.html`, canonical-адреса заканчиваются на `/`.

## Когда появится бэкенд

Убрать `STATIC_EXPORT`, вернуть серверную проверку сессии (middleware + httpOnly cookie) и разместить
Next.js на сервере: Vercel, Yandex Cloud, Timeweb и т. п. (для персональных данных — хостинг в РФ, 152-ФЗ).
