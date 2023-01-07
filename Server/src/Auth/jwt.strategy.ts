/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"; "@nestjs/passport"
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt"
import { AuthService } from "./auth.service"
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED))
    }
    console.log(payload, "Payload")
    return done(null, user, payload.id)

  }
}