import { Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { LoginDto } from '../dto/user.dto';
import { SignupDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { AppDataSource } from 'src/shared/config/databaseConfig';
import properties from 'src/shared/common/constants/properties';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createUser(@Body() signupDto: SignupDto) {
    if (
      !signupDto.email ||
      !signupDto.firstName ||
      !signupDto.lastName ||
      !signupDto.password
    ) {
      return {
        status: true,
        message: 'Some fields are missing in payload!',
      };
    }

    const userRepository = await AppDataSource.getRepository(User);
    const checkUser = await userRepository.findOneBy({
      email: signupDto.email
    });

    if(checkUser && checkUser.id) {
      return {
        status: false,
        message: 'Email already exist!',
      };
    }

    const user = await userRepository.create(signupDto);
    await userRepository.save(user);

    return {
      status: true,
      message: 'User account has been created successfully!'
    };
  }

  async validateUser(@Body() loginDto: LoginDto) {
    const user = await this.userService.findUserByEmailAndPassword(loginDto);
    return user;
  }

  async validateAdmin(@Body() loginDto: LoginDto) {
    if (
      loginDto.email === properties.ADMIN_EMAIL &&
      loginDto.password === properties.ADMIN_PASSWORD
    ) {
      return {
        email: loginDto.email,
        admin: true,
      };
    }
  }

  async generateToken(user: any) {
    const payload = {
      userId: user?.id,
      email: user?.email,
      admin: user?.admin
    }; // Customize payload as needed
    return {
      status: true,
      access_token: this.jwtService.sign(payload),
    };
  }
}
