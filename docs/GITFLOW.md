# Gitflow

## Ветки

| Ветка | Назначение | Деплой |
|-------|------------|--------|
| `main` | Продакшен | GitHub Actions → VPS `/var/www/bonjourjiest` |
| `develop` | Интеграция фич | CI (build + test), без деплоя |
| `feature/*` | Новая функциональность | CI на pull request в `develop` |
| `hotfix/*` | Срочный фикс в проде | PR в `main`, после мержа — деплой |

## Поток работы

### Обычная фича

1. От `develop` создать `feature/название`
2. Сделать изменения, открыть PR в `develop`
3. После ревью — merge в `develop`
4. Когда готово к релизу — merge `develop` → `main` (автодеплой в прод)

### Hotfix

1. От `main` создать `hotfix/название`
2. PR в `main`
3. После деплоя — merge обратно в `develop`

## CI/CD

- **CI** — push/PR в `main`, `develop`
- **Deploy Production** — push в `main`

## Изоляция от desharschool

На том же VPS, но отдельно:

| Проект | PM2 | Порт API | Путь |
|--------|-----|----------|------|
| desharschool | `deshar-api` | 3001 | `/var/www/deshar-school` |
| bonjourjiest | `bonjour-api` | 3002 | `/var/www/bonjourjiest` |
