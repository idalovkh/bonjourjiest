# Deshar School — лендинг

Фронт: Vite + React. Деплой на Vercel.

## API: заявки на пробный урок

Эндпоинт `POST /api/lead` принимает заявку (имя + контакт в Telegram) и отправляет её в Telegram-группу и на почту (SMTP).

### Переменные окружения (Vercel → Project Settings → Environment Variables)

| Переменная | Описание |
|------------|----------|
| `TELEGRAM_BOT_TOKEN` | Токен бота от [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | ID чата/группы (бот должен быть в группе) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | SMTP для почты |
| `MAIL_FROM`, `MAIL_TO` | Адрес отправителя и получателя заявок |

### Локальный запуск

**Вариант 1: фронт + локальный API (тест заявок с твоим Telegram/SMTP)**

```bash
npm install
# В .env или .env.local задай TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (и при необходимости SMTP_*, MAIL_*)
npm run dev:full
```

Откроется Vite и API; запросы с формы уходят на локальный API. **Открывай тот URL, который выведет Vite в консоли** (если 8080 занят, будет 8081, 8082 и т.д.). API сам подберёт свободный порт из 3001–3010; если возьмёт не 3001 — в консоли подскажет, что прописать в `.env` для отдельного запуска фронта.

**Вариант 2: только фронт, API — прод**

```bash
npm run dev
```

Запросы к `/api/lead` проксируются на прод (или укажи `VITE_API_ORIGIN` в `.env`).

**Вариант 3: Vercel локально**

```bash
vercel dev
```

### Если деплой на Vercel падает

1. **Посмотри логи сборки** в Vercel → проект → последний деплой → Building / Logs. Ошибка будет в шаге Build или в шаге деплоя функций.
2. **Проверь `vercel.json`**: заданы `buildCommand: "npm run build"`, `outputDirectory: "dist"`, для `api/lead.ts` указан runtime `@vercel/node@3`.
3. **Node.js**: в проекте задано `"engines": { "node": ">=18" }` — в настройках проекта на Vercel лучше выставить Node.js 18.x или 20.x.
4. **Переменные для API** (Telegram, SMTP) нужны только в **runtime**, не при сборке. Если падает именно сборка — причина обычно в TypeScript/ESLint или в отсутствующих зависимостях; проверь, что в логах нет ошибок из `api/lead.ts` или из `vite build`.
