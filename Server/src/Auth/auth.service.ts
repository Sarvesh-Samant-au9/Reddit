/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common"
import { sign } from "jsonwebtoken"
import { UserService } from "../Shared/user.service"
@Injectable()
export class AuthService {
  constructor(private userService: UserService) { }
  
  async signPayload(payload: any) {
    const token = sign(payload, "secretKey", { expiresIn: "12h" })
    return token
  }

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload)
  }

}