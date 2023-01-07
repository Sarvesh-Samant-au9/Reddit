/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common"
import { SharedModule } from "../Shared/shared.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./jwt.strategy"

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})

export class AuthModule { }