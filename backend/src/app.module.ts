import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'tmp'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/models/*.entity{.js,.ts}'],
      migrations: [__dirname + '/database'],
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
