import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AuthService } from '../auth.service';

import { COOKIE_ACCESS_TOKEN_NAME } from '../../utils/constant';
import { Env } from '../../utils/env';
import { RequestExtended } from '../../utils/types';
import { TokenData, tokenPayload } from './types-auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(public authService: AuthService, env: Env) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: env.jwtSecret,
    });
  }

  async validate(payload: tokenPayload) {
    return {
      id: payload.id,
      type: payload.type,
    } satisfies TokenData;
  }

  private static extractJWTFromCookie(req: RequestExtended): string | null {
    const token = req.signedCookies[COOKIE_ACCESS_TOKEN_NAME];
    if (token) return token;
    return null;
  }
}
