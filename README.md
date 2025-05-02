## 🚀 Запуск проекта

### 🔧 Development (локальная разработка)

```bash
docker-compose -f docker-compose.dev.yaml --env-file .env.dev up
```

* Используется домен `localhost`
* Поддержка hot-reload для фронтенда
* Открыть в браузере: [http://localhost](http://localhost)

---

### 🚢 Production (продакшен)

```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```

* Используется домен из `DOMAIN` в `.env.prod` (например, `example.com`)
* Контейнеры запускаются в фоновом режиме (`-d`)

---

### 🛑 Остановка

```bash
docker-compose -f docker-compose.dev.yaml down
# или
docker-compose -f docker-compose.prod.yaml down
```
