# Node-Vue App Backend

Этот проект представляет собой серверную часть приложения, написанную на Node.js с использованием Express и Sequelize для работы с базой данных PostgreSQL.


## Установка и запуск

### Предварительные требования

- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Установка

1. Клонируйте репозиторий:
   ```sh
   git clone <repository-url>
   cd backend

2. Установите зависимости:
   ```sh
   npm install

3. Создайте файл .env в корневом каталоге и добавьте свои переменные окружения, такие как строки подключения к базе данных и секреты API.

## Конфигурация
Пример содержимого файла .env:
   ```sh
   DATABASE_URL=postgres://username:password@localhost:5432/database_name
   JWT_SECRET=your_jwt_secret
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   NODE_ENV=development
   PORT=3000
   DB_NAME=your_db_name
   DB_USER=root
   DB_PASSWORD=123456
   DB_HOST=127.0.0.1
   DB_PORT=5432

## Запуск сервера
1. Запустите сервер:
   ```sh
   npm start

Сервер будет запущен на порту, указанном в переменной окружения PORT (по умолчанию 3000).

## Возможности
Аутентификация пользователей: регистрация, вход в систему, проверка электронной почты.
Управление пользователями: создание, чтение, обновление и удаление пользователей.
Управление производителями: создание, чтение, обновление и удаление производителей.
Управление модераторами: создание, чтение, обновление и удаление модераторов.
Управление клиентами: создание, чтение, обновление и удаление клиентов.
API Маршруты
/api/auth/login - Вход пользователя
/api/auth/register - Регистрация пользователя
/api/auth/verify-email/:token - Проверка электронной почты