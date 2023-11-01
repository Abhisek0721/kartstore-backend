interface PropertiesInterface {
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
    JWT_SECRET: 'jwt_secret_dhsfkj3034kbfsk234mamczxylip',
    ADMIN_EMAIL: 'mail@abhisekh.info',
    ADMIN_PASSWORD: 'admin_abhisek',
    DBMS_TYPE: 'postgres',
    DBMS_HOST: 'localhost',
    DBMS_PORT: 5432,
    DBMS_USERNAME: 'postgres',
    DBMS_PASSWORD: 'root',
    DATABASE_NAME: 'kartstore'
}

export default properties;