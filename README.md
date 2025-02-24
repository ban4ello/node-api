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
   git clone https://github.com/ban4ello/node-api.git backend
   cd backend

2. Установите зависимости:
   ```sh
   npm install

3. Создайте файл .env в корневом каталоге и добавьте свои переменные окружения, такие как строки подключения к базе данных и секреты API.
   Пример содержимого файла .env:
   ```sh
   DATABASE_URL=postgres://username:password@localhost:5432/database_name
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   PORT=3000
   DB_NAME=database_name
   DB_USER=postgres
   DB_PASSWORD=123456
   DB_HOST=127.0.0.1
   DB_PORT=5432

4. Выполните миграции базы данных:
   ```sh
   npm run migrate
   ```

5. Запуск сервера
   ```sh
   npm run start

Сервер будет запущен на порту, указанном в переменной окружения PORT (по умолчанию 3000).

## Тестирование

### Настройка тестовой базы данных

1. Создайте тестовую базу данных:
   ```sh
   psql -U postgres -c "CREATE DATABASE node_api_test;"

2. Создайте файл .env.test в корневом каталоге и добавьте свои переменные окружения для тестовой базы данных. Пример содержимого файла .env.test:
   ```sh
   DATABASE_URL=postgres://postgres:123456@127.0.0.1:5432/node_api_test
   JWT_SECRET=your_jwt_secret
   NODE_ENV=test
   PORT=3000
   DB_NAME=node_api_test
   DB_USER=postgres
   DB_PASSWORD=123456
   DB_HOST=127.0.0.1
   DB_PORT=5432

3. Для запуска тестов выполните следующую команду:
   ```sh
   npm run test
   ```

Тесты будут выполнены с использованием библиотеки Jest и Supertest.

## Возможности

- **Аутентификация пользователей**: регистрация, вход в систему.
- **Управление пользователями**: создание, чтение, обновление и удаление пользователей.

## API Маршруты

- `/api/auth/register` - Регистрация пользователя ✅
  - **Тело запроса**:
    ```json
    {
      "email": "string",
      "password": "string",
      "phone": "string",
      "userType": "string", // Тип пользователя (manufacturer, customer)
      "country": "string",
      "city": "string",
      "preferredLanguage": "string"
    }
    ```

- `/api/auth/login` - Вход пользователя ✅

- `/api/users` - Управление пользователями
  - `GET /api/users` - Получить список всех пользователей ✅
  - `GET /api/users/:id` - Получить информацию о пользователе по ID ✅
  - `PUT /api/users/:id` - Обновить информацию о пользователе по ID ✅
    - **Тело запроса**:
      ```json
      {
         "email": "string",
         "password": "string",
         "phone": "string",
         "userType": "string", // Тип пользователя (manufacturer, customer)
         "country": "string",
         "city": "string",
         "preferredLanguage": "string"
      }
      ```
  - `DELETE /api/users/:id` - Удалить пользователя по ID ✅