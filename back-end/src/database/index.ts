import { EnvConfig } from 'src/config/variables-config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceConfig = (): DataSourceOptions => {
  return {
    type: 'mysql',
    host: EnvConfig.database.HOST_DB,
    port: EnvConfig.database.PORT_DB,
    username: EnvConfig.database.USER_DB,
    password: EnvConfig.database.PASSWORD_DB,
    database: EnvConfig.database.NAME_DB,
    synchronize: true,
    ssl: false,
    entities: [],
  };
};

const dataSource = new DataSource(dataSourceConfig());

export default dataSource;
