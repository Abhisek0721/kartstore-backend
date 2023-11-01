import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { SignupDto } from '../dto/user.dto';
import { LoginDto } from '../dto/user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //API : /auth/signup
  //Method : POST
  //Access : Public
  //Description : create new user
  @Post("signup")
  async signup (@Body() signupDto: SignupDto, @Res() res: Response) {
    try {
      const newUser = await this.authService.createUser(signupDto);
      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error?.message,
        error: error?.stack,
      });
    }
  }

  //API : /auth/login
  //Method : POST
  //Access : Public
  //Description : user login
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    try {

      if(!body.email || !body.password) {
        return res.status(400).json({
          status: false,
          message: "email or password is missing!"
        })
      }

      const user: any = await this.authService.validateUser(body);
      if (!user) {
        // User not found or invalid credentials
        return res.status(403).json({
          status: false,
          message: 'Invalid credentials',
        });
      }
      // Generate JWT token and send it back to the client
      const token = await this.authService.generateToken(user);
      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error?.message,
        error: error?.stack,
      });
    }
  }

  //API : /auth/admin-login
  //Method : POST
  //Access : Public
  //Description : admin-login
  @Post('admin-login')
  async adminLogin(@Body() body: LoginDto, @Res() res: Response) {
    try {
      const user: any = await this.authService.validateAdmin(body);
      if (!user) {
        // User not found or invalid credentials
        return res.status(403).json({
          status: false,
          message: 'Invalid credentials',
        });
      }
      // Generate JWT token and send it back to the client
      const token = await this.authService.generateToken(user);
      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error?.message,
        error: error?.stack,
      });
    }
  }
}
