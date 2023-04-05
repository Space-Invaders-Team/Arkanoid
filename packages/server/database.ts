import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import * as path from 'path';
import { Forum } from './models/Forum';

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;
const IS_DEV = process.env.NODE_ENV === 'development';

export const createPostgresConnect = async (): Promise<Sequelize | null> => {
  let client;

  try {
    const sequelizeOptions: SequelizeOptions = {
      username: POSTGRES_USER,
      host: POSTGRES_HOST || 'postgres',
      port: Number(POSTGRES_PORT),
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      dialect: 'postgres',
      logging: false,
    };

    client = new Sequelize(sequelizeOptions);

    const modelsPath = path.join(__dirname, './models');
    client.addModels([modelsPath]);

    const dbInit = await client.sync({ alter: IS_DEV });

    if (dbInit) {
      // eslint-disable-next-line no-console
      console.log('  ➜ 🎸 Synchronized the POSTGRES database successfully.');

      // Добавить в БД
      await Forum.bulkCreate([{ name: 'Арканоид' }, { name: 'Другие игры' }, { name: 'Флудилка' }], {
        ignoreDuplicates: true,
      });
    }

    // await client.authenticate();

    // eslint-disable-next-line no-console
    console.log('  ➜ 🎸 Connected to the POSTGRES database successfully.');
    // client.close();

    return client;
  } catch (e) {
    console.error(e);
  }

  return null;
};
