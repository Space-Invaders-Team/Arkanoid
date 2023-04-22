### Как запускать?

(все команды необходимо выполнять из корня приложения)
1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Запустите Docker, а затем выполните команду `docker compose -f docker-compose.dev.yml up` для запуска postgres
4. Выполните команду `yarn run dev:server`, которая запустит SSR сервер, раздающий всё приложение
5. Откройте http://localhost:9000


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Production окружение в докере
Пока что реализована возможность автодеплоя продакшен сборки в Yandex Cloud, но локально эта сборка работать не будет из-за отсутствия нужных переменных окружения.
По возможности такая фича будет добавлена позже.

Ознакомиться с продакшен сборкой можно в файле `docker-compose.prod.yml` (для деплоя есть некоторые отличия в передаче переменных окружения, но это настроено автоматически через Github Actions)

## Работа с базой данных
1. Для работы с БД, используем Sequelize.
(Подключение к БД находится здесь packages\server\database.ts)
2. запустить Docker
3. Для запуска контейнеров через docker-compose используются следующие команды:
`docker compose build` — собрать проект
`docker compose up` — запустить проект
`docker compose down` — остановить проект
`docker compose logs -f [service name]` — посмотреть логи сервиса
`docker compose ps` — вывести список контейнеров

