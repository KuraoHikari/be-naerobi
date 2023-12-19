import '@wahyubucil/nestjs-zod-openapi/boot';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { Tokens } from '../src/auth/types';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
    await prisma.cleanDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    const dto = {
      email: 'test@gmail.com',
      password: 'super-secret-password',
      firstName: '21212',
      lastName: '2121212',
      passwordConfirm: 'super-secret-password',
    };

    let tokens: Tokens;

    it('should signup', async () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(dto)
        .expect(201)
        .expect(({ body }: { body: Tokens }) => {
          expect(body.access_token).toBeTruthy();
          expect(body.refresh_token).toBeTruthy();
        });
    });

    it('should signin', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send(dto)
        .expect(200)
        .expect(({ body }: { body: Tokens }) => {
          expect(body.access_token).toBeTruthy();
          expect(body.refresh_token).toBeTruthy();

          tokens = body;
        });
    });

    it('should refresh tokens', async () => {
      // wait for 1 second
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      return request(app.getHttpServer())
        .post('/auth/refresh')
        .auth(tokens.refresh_token, {
          type: 'bearer',
        })
        .expect(200)
        .expect(({ body }: { body: Tokens }) => {
          expect(body.access_token).toBeTruthy();
          expect(body.refresh_token).toBeTruthy();

          expect(body.refresh_token).not.toBe(tokens.access_token);
          expect(body.refresh_token).not.toBe(tokens.refresh_token);
        });
    });

    it('should logout', () => {
      return request(app.getHttpServer())
        .post('/auth/logout')
        .auth(tokens.access_token, {
          type: 'bearer',
        })
        .expect(200);
    });
  });
});
