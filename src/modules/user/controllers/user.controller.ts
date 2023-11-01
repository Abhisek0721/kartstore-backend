import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import CustomRequest from 'src/shared/common/interfaces/CustomRequestInterface';
import { UserService } from '../services/user.service';
import { JwtMiddleware } from 'src/shared/middlewares/jwt.middleware';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //API : /user/get-user
  //Method : GET
  //Access : Public
  //Description : fetch user's data
  @Get('get-user')
  async getUser(@Req() req: CustomRequest, @Res() res: Response) {
    try {
      if(req.admin){
        return res.status(200).json({
          status: true,
          data: {
            email: req.email,
            admin: req.admin
          }
      });
      }
        const userId = req.userId;
        const userData = await this.userService.findUserById(userId);
        return res.status(200).json({
            status: true,
            data: userData
        });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error?.message,
        error: error?.stack,
      });
    }
  }
}
