# Деплой bonjourjiest на VPS

Деплой аналогичен desharschool: GitHub Actions → SSH/rsync → PM2.

## Что нужно на сервере

1. Nginx vhost для `bonjourjiest.com` и `www.bonjourjiest.com`
2. PM2 процесс `bonjour-api` (:3002)
3. Telegram-секреты в GitHub Environment `production`

## GitHub Secrets

Общие (можно те же, что у desharschool):

- `PROD_SSH_PRIVATE_KEY`
- `PROD_SERVER_HOST`
- `PROD_SERVER_USER`

В environment **production**:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `TELEGRAM_PROXY_URL` (тот же прокси, что у desharschool, если Telegram API недоступен напрямую)
- `DEBUG_LEAD` (опционально)

## Nginx (пример)

См. `docs/nginx/bonjourjiest.conf.example`.

Ключевое: `/api/` проксируется на `127.0.0.1:3002`, а не на `3001` (desharschool).

## Локальная разработка

```bash
npm run dev:full   # API на :3002 + Vite
npm run dev        # только фронт, /api → bonjourjiest.com
```

## Vercel

Репозиторий не рассчитан на Vercel как основной прод. Отключите автодеплой Vercel, чтобы два бэкенда не мешали друг другу.
