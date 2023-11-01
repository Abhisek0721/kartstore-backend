import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from "./services/jwtstrategy.service";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { UserController } from "./controllers/user.controller";
import properties from "src/shared/common/constants/properties";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: properties.JWT_SECRET,
          signOptions: { expiresIn: '24h' }, // Token expiration time
        }),
    ],
    controllers: [UserController, AuthController],
    providers: [UserService, AuthService, JwtStrategy],
    exports: [PassportModule, JwtModule]
})
export class UserModule { }