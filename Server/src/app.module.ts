/* eslint-disable prettier/prettier */
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from "./Shared/shared.module"
import { AuthModule } from "./Auth/auth.module"
import { AuthController } from "./Auth/auth.controller"
import { AuthService } from "./Auth/auth.service"
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    SharedModule,
    AuthModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule { }
