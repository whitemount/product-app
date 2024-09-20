import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(username: string, password: string): Promise<boolean> {
    //NOT FOR PRODUCTION
    if (username === 'admin' && password === 'admin') {
      return true;
    }
    throw new UnauthorizedException();
  }
}