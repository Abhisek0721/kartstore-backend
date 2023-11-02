import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './shared/config/databaseConfig';
import properties from './shared/common/constants/properties';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await AppDataSource.initialize()
    .then(() => {
      console.log('Connected to database!');
    })
    .catch((error) => console.log(error));
  await app.listen(properties.PORT);
}
bootstrap();
