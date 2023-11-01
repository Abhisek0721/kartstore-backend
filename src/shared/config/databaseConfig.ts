import { DataSource } from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { CartItem } from "src/modules/cartitem/entities/cartitem.entity";
import properties from "../common/constants/properties";

export const AppDataSource = new DataSource({
    type: properties.DBMS_TYPE,
    host: properties.DBMS_HOST,
    port: properties.DBMS_PORT,
    username: properties.DBMS_USERNAME,
    password: properties.DBMS_PASSWORD,
    database: properties.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Product, CartItem],
    subscribers: [],
    migrations: [],
});