import { config } from 'dotenv';

config();

interface PropertiesInterface {
    PORT: number;
    JWT_SECRET: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    DBMS_TYPE: string|any;
    DBMS_HOST: string;
    DBMS_PORT: number;
    DBMS_USERNAME: string;
    DBMS_PASSWORD: string;
    DATABASE_NAME: string;
}


const properties:PropertiesInterface = {
    PORT: Number(process.env.PORT) || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'jwt_secret_dhsfkj3034kbfsk234mamczxylip',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'mail@abhisekh.info',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin_abhisek',
    DBMS_TYPE: process.env.DBMS_TYPE || 'postgres',
    DBMS_HOST: process.env.DBMS_HOST || 'localhost',
    DBMS_PORT: Number(process.env.DBMS_PORT) || 5432,
    DBMS_USERNAME: process.env.DBMS_USERNAME || 'postgres',
    DBMS_PASSWORD: process.env.DBMS_PASSWORD || 'root',
    DATABASE_NAME: process.env.DATABASE_NAME || 'kartstore'
}

export default properties;