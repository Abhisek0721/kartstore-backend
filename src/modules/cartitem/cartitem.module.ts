import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import properties from 'src/shared/common/constants/properties';
import { CartItemController } from './controllers/cartitem.controller';
import { CartItemService } from './services/cartitem.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: properties.JWT_SECRET,
          signOptions: { expiresIn: '24h' }, // Token expiration time
        }),
    ],
    controllers: [CartItemController],
    providers: [CartItemService],
    exports: [PassportModule, JwtModule]
})
export class CartitemModule {}
