# Описание авторизации
[Документация FASTAPI](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)

#### Схема использования токенов:
В случае успешной авторизации сервер возвращает два токена.

`access_token` используется для последующих **защищенных** запросов к серверу.

`refresh_token` применяется для обновления `access_token` после истечения срока его действия или в случае его компрометации. 

При использовании `refresh_token` формируется новая пара `access_token` и ```refresh_token```.

Для последующих обновлений ключей доступа необходимо использовать `refresh_token` из новой пары ключей (`access_token/refresh_token`)

#### Описание API:
Регистрация. `POST` **/api/auth/signup**

| Параметры запроса (entity body) | Описание |
| ------ | ------ |
| `username` | Имя пользователя | 
| `password` | Пароль | 

| Параметры ответа | Описание |
| ------ | ------ |
| `access_token` | Авторизационный токен | 
| `refresh_token` | Токен обновления | 

Пример ответа:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
}
```
---
Вход в аккаунт. `POST` **/api/auth/login**

| Параметры запроса (entity body) | Описание |
| ------ | ------ |
| `username` | Имя пользователя | 
| `password` | Пароль | 

| Параметры ответа | Описание |
| ------ | ------ |
| `access_token` | Авторизационный токен | 
| `refresh_token` | Токен обновления | 

Пример ответа:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
}
```
---
Обновление `access_token`. `POST` **/api/auth/refresh**

| Заголовок запроса | Описание |
| ------ | ------ |
| `Authorization` | Bearer-токен - токен на предъявителя. Соответственно, кто его предъявит, тот и является авторизованным пользователем. | 

| Параметры ответа | Описание |
| ------ | ------ |
| `access_token` | Авторизационный токен | 
| `refresh_token` | Токен обновления | 

Пример запроса:
```sh
curl --location 'http://localhost:8000/api/auth/refresh' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
```

Пример ответа:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
}
```
