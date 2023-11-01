import { Injectable, Body } from '@nestjs/common';
import { LoginDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { AppDataSource } from 'src/shared/config/databaseConfig';

@Injectable({})
export class UserService {

  async findUserByEmailAndPassword(@Body() loginDto:LoginDto) {
    const userRepository = await AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
      email: loginDto.email,
      password: loginDto.password
    });
    return user;
  }

  async findUserById(userId: number) {
    const userRepository = await AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'firstName', 'lastName'], // Include other fields you want to fetch
    });
    return user;
  }


}
