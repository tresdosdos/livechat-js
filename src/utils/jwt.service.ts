import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { JsonWebTokenError, TokenExpiredError } from './errors';

@Injectable()
export class JwtService {
  constructor(private config: ConfigService) {}

  public generateToken(id: string): string {
    return jwt.sign({id}, this.config.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '2 days',
    });
  }

  public verifyAndDecodeToken(token: string): object {
    try {
      return jwt.verify(token, this.config.JWT_SECRET);
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError': {
          throw new TokenExpiredError();
        }
        case 'JsonWebTokenError': {
          throw new JsonWebTokenError();
        }
        default: {
          throw new JsonWebTokenError();
        }
      }
    }
  }
}
