import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import CustomRequest from '../common/interfaces/CustomRequestInterface';
import { verify } from "jsonwebtoken";
import properties from '../common/constants/properties';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if(!req.headers.authorization) {
        return res.status(401).json({
          status: false,
          message: 'No authorization token!'
        });
      }
      const [bearer, jwtToken] = req.headers.authorization.split(" ");
      if(bearer !== 'Bearer' || !jwtToken){
        return res.status(401).json({
          status: false,
          message: 'Invalid token'
        });
      }

      const user:any = verify(jwtToken, properties.JWT_SECRET);
      if(!user || !user?.userId) {
        return res.status(403).json({
          status: false,
          message: 'Unauthorized!'
        });
      }

      req.userId = user?.userId; // Attach the user object to the request
      req.email = user?.email;
      req.admin = false;
      next();
    } catch (error) {
        return res.status(500).json({
          status: false,
          message: error?.message,
          error: error?.stack
        });
    }
  }
}


@Injectable()
export class VerifyAdmin implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      
      if(!req.headers.authorization) {
        return res.status(401).json({
          status: false,
          message: 'No authorization token!'
        });
      }

      const [bearer, jwtToken] = req.headers.authorization.split(" ");
      if(bearer !== 'Bearer' || !jwtToken){
        return res.status(401).json({
          status: false,
          message: 'Invalid token'
        });
      }

      const user:any = verify(jwtToken, properties.JWT_SECRET);
      if(!user || !user?.admin || !user?.email) {
        return res.status(401).json({
          status: false,
          message: 'Unauthorized!'
        });
      }

      req.email = user?.email;
      req.admin = user?.admin;
      next();
    } catch (error) {
        return res.status(500).json({
          status: false,
          message: error?.message,
          error: error?.stack
        });
    }
  }
}
