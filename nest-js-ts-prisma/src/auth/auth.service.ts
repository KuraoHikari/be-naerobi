import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { LoginUserDto, RegisterUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from './types';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: RegisterUserDto): Promise<Tokens> {
    try {
      const hash = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refresh_token);

      return tokens;
    } catch (error: any) {
      throw error;
    }
  }

  async signin(dto: LoginUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        throw new ForbiddenException('Credentials incorrect');
      }

      const pwdMatch = await argon.verify(user.hash, dto.password);

      if (!pwdMatch) {
        throw new ForbiddenException('Credentials incorrect');
      }

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refresh_token);

      return tokens;
    } catch (error: any) {
      throw error;
    }
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    try {
      const hash = await argon.hash(rt);

      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hashedRt: hash,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async logout(userId: string): Promise<boolean> {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
          hashedRt: {
            not: null,
          },
        },
        data: {
          hashedRt: null,
        },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(userId: string, rt: string): Promise<Tokens> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user || !user.hashedRt)
        throw new ForbiddenException('Access Denied');

      const rtMatches = await argon.verify(user.hashedRt, rt);
      if (!rtMatches) throw new ForbiddenException('Access Denied');

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      throw error;
    }
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: userId,
      email: email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.signToken(jwtPayload, 'ACCESS_TOKEN_PRIVATE_KEY', {
        expiresIn: `15m`,
      }),
      this.signToken(jwtPayload, 'REFRESH_TOKEN_PRIVATE_KEY', {
        expiresIn: `7d`,
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
  async signToken(
    payload: Object,
    keyName: 'ACCESS_TOKEN_PRIVATE_KEY' | 'REFRESH_TOKEN_PRIVATE_KEY',
    options: JwtSignOptions,
  ) {
    const privateKey = Buffer.from(
      String(this.config.get<string>(keyName)),
      'base64',
    ).toString('ascii');
    return this.jwt.sign(payload, {
      ...(options && options),
      algorithm: 'RS256',
      secret: privateKey,
    });
  }
}
