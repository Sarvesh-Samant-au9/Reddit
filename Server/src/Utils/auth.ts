/* eslint-disable prettier/prettier */
import { JwtService } from "@nestjs/jwt"
export default class AuthJwtValidation {
  static async assignJwtToken(
    userId: string,
    jwtService: JwtService
  ): Promise<string> {
    const payload = { id: userId }
    const token = await jwtService.sign(payload)
    return token
  }
}