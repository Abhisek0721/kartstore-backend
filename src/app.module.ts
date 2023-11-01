import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CartitemModule } from './modules/cartitem/cartitem.module';
import { AppController } from './app.controller';
import {
  JwtMiddleware,
  VerifyAdmin,
} from './shared/middlewares/jwt.middleware';

@Module({
  imports: [UserModule, ProductModule, CartitemModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('user', 'cart');

    consumer
      .apply(VerifyAdmin)
      .forRoutes({ path: 'product/add-product', method: RequestMethod.POST });
  }
}
