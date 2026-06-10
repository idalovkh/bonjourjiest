# Gitflow

## Ветки

| Ветка | Назначение | Деплой |
|-------|------------|--------|
| `main` | Продакшен | GitHub Actions → VPS `/var/www/bonjourjiest` |
| `staging` | Предпрод, проверка перед релизом | GitHub Actions → VPS `/var/www/bonjourjiest-staging` |
| `develop` | Интеграция фич | CI (build + lint + test), без деплоя |
| `feature/*` | Новая функциональность | CI на pull request в `develop` |
| `hotfix/*` | Срочный фикс в проде | PR в `main`, после мержа — деплой |

## Поток работы

### Обычная фича

1. От `develop` создать `feature/название`
2. Сделать изменения, открыть PR в `develop`
3. После ревью — merge в `develop`
4. Когда готово к проверке на сервере — merge `develop` → `staging`
5. Проверить `staging.bonjourjiest.com`
6. Merge `staging` → `main` — автодеплой в прод

### Hotfix

1. От `main` создать `hotfix/название`
2. PR в `main`
3. После деплоя — cherry-pick или merge обратно в `develop` и `staging`

## CI/CD

- **CI** — push/PR в `main`, `staging`, `develop`
- **Deploy Production** — push в `main`
- **Deploy Staging** — push в `staging`

## Изоляция от desharschool

На том же VPS, но отдельно:

| Проект | PM2 | Порт API | Путь |
|--------|-----|----------|------|
| desharschool | `deshar-api` | 3001 | `/var/www/deshar-school` |
| bonjourjiest prod | `bonjour-api` | 3002 | `/var/www/bonjourjiest` |
| bonjourjiest staging | `bonjour-api-staging` | 3003 | `/var/www/bonjourjiest-staging` |
