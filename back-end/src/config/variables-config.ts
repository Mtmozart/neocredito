import * as dotenv from 'dotenv';
dotenv.config();

export const EnvConfig = {
  database: {
    HOST_DB: process.env.HOST_DB,
    PORT_DB: Number(process.env.PORT_DB),
    USER_DB: process.env.MARIADB_USER,
    PASSWORD_DB: process.env.MARIADB_PASSWORD,
    ROOT_PASSWORD_DB: process.env.MARIADB_ROOT_PASSWORD,
    NAME_DB: process.env.NAME_DB,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  },
  ENV: process.env.NODE_ENV || 'development',
};
