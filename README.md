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

### Локальный запуск с API

```bash
npm install
vercel dev
```

### Если деплой на Vercel падает

1. **Посмотри логи сборки** в Vercel → проект → последний деплой → Building / Logs. Ошибка будет в шаге Build или в шаге деплоя функций.
2. **Проверь `vercel.json`**: заданы `buildCommand: "npm run build"`, `outputDirectory: "dist"`, для `api/lead.ts` указан runtime `@vercel/node@3`.
3. **Node.js**: в проекте задано `"engines": { "node": ">=18" }` — в настройках проекта на Vercel лучше выставить Node.js 18.x или 20.x.
4. **Переменные для API** (Telegram, SMTP) нужны только в **runtime**, не при сборке. Если падает именно сборка — причина обычно в TypeScript/ESLint или в отсутствующих зависимостях; проверь, что в логах нет ошибок из `api/lead.ts` или из `vite build`.
