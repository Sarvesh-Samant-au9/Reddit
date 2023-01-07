// /* eslint-disable prettier/prettier */
// import { Body, Controller, Get, Post } from "@nestjs/common";
// import { AuthService } from "./auth.service"
// import { LoginDTO, RegisterDTO } from "../Authentication/Dto/auth.dto"
// import { User } from "../Authentication/Schemas/user.schema"

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) { }

//   @Post("/register")
//   register(@Body() registerDTO: RegisterDTO): Promise<{ token: string }> {
//     return this.authService.signUp(registerDTO)
//   }

//   @Get("/login")
//   login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
//     return this.authService.loginUser(loginDTO)
//   }

// }
