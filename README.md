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
   Пример содержимого файла .env:
   ```sh
   DATABASE_URL=postgres://username:password@localhost:5432/database_name
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   PORT=3000
   DB_NAME=your_db_name
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
      "userType": "string", // Тип пользователя (Производитель, Заказчик)
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