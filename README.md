### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


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

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`
('.env.sample' будет скопирован в '.env', поэтому если нужно сохраните данные из .env локально)

`docker compose up` - запустит сервисы:

1. prakticum-client -  client без SSR
2. prakticum-server - ваш сервер (server)
3. postgres, вашу базу данных (postgres)
4. pgadmin - для администрирования БД (в pgadmin при первом подключении нужно зарегистрировать сервер)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`
## Работа с базой данных
а)Для работы с БД, используем Sequelize.
(Подключение к БД находится здесь packages\server\database.ts)

б) запустить Docker
в) Для запуска контейнеров через docker-compose используются следующие команды:
`docker compose build` — собрать проект
`docker compose up` — запустить проект
`docker compose down` — остановить проект
`docker compose logs -f [service name]` — посмотреть логи сервиса
`docker compose ps` — вывести список контейнеров
# Для девелопмента можно работать так:
а) запустить postgres-контейнер в Докере `docker compose up postgres`
б) изменить в '.env' : `POSTGRES_HOST=localhost`
в) yarn dev
