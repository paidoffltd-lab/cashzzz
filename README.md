# cashZ Import (static build)

Это готовая (production) сборка страницы импорта **cashZ / Zashi**.

## Структура
- `index.html` — входная точка
- `styles.css` — стили (переименовано с `index-DrOaWAHB.css`, ссылка в `index.html` обновлена)
- `favicon.jpg`, `zashi-logo-C4gYIldW.png` — статические ассеты
- `vercel.json` — правило rewrites для SPA (чтобы любые роуты открывались через `index.html`)

## Локальный запуск
Проще всего поднять любой статический сервер.

### Вариант 1: Python
```bash
python -m http.server 5173
```
Открой `http://localhost:5173`.

### Вариант 2: Node (serve)
```bash
npx serve .
```

## Деплой на Vercel (через GitHub)
1. Залей этот репозиторий на GitHub.
2. В Vercel: **New Project → Import Git Repository**.
3. Framework Preset: **Other** (или Static).
4. Build Command: **пусто**.
5. Output Directory: **пусто** (корень репо).

`vercel.json` уже добавлен — роутинг не сломается.
