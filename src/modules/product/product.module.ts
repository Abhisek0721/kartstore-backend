import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import properties from 'src/shared/common/constants/properties';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: properties.JWT_SECRET,
          signOptions: { expiresIn: '24h' }, // Token expiration time
        }),
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [PassportModule, JwtModule]
})
export class ProductModule {}
